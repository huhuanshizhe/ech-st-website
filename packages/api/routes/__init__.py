"""
Routes package initialization
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
import uuid

from models.database import get_db, Product, Category, Inquiry, AdminUser
from passlib.context import CryptContext
from jose import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = "ech-st-secret-key-change-in-production"

# ==================== Models ====================

class ProductResponse(BaseModel):
    id: str
    category_id: str
    name: dict
    slug: str
    model: str
    description: Optional[dict] = None
    images: List[str] = []
    featured: bool = False
    category: Optional[dict] = None

class ProductListResponse(BaseModel):
    data: List[ProductResponse]
    total: int
    page: int
    limit: int

class CategoryResponse(BaseModel):
    id: str
    name: dict
    slug: str
    description: Optional[dict] = None
    product_count: int = 0

class InquiryCreate(BaseModel):
    company_name: Optional[str] = None
    contact_name: str
    email: EmailStr
    phone: Optional[str] = None
    country: Optional[str] = None
    products: Optional[str] = None
    message: str

class InquiryResponse(BaseModel):
    id: str
    company_name: Optional[str] = None
    contact_name: str
    email: str
    message: str
    status: str
    created_at: datetime

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


# ==================== Products Router ====================

products = APIRouter()

@products.get("/", response_model=ProductListResponse)
def get_products(
    category_id: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if search:
        term = f"%{search}%"
        query = query.filter(Product.model.ilike(term))
    
    total = query.count()
    products_list = query.order_by(Product.sort_order).offset((page-1)*limit).limit(limit).all()
    
    data = []
    for p in products_list:
        cat = db.query(Category).filter(Category.id == p.category_id).first()
        data.append(ProductResponse(
            id=str(p.id), category_id=str(p.category_id), name=p.name,
            slug=p.slug, model=p.model, description=p.description,
            images=p.images or [], featured=p.featured,
            category={"id": str(cat.id), "name": cat.name, "slug": cat.slug} if cat else None
        ))
    return {"data": data, "total": total, "page": page, "limit": limit}

@products.get("/featured", response_model=List[ProductResponse])
def get_featured(limit: int = 6, db: Session = Depends(get_db)):
    products_list = db.query(Product).filter(Product.featured == True).limit(limit).all()
    return [ProductResponse(
        id=str(p.id), category_id=str(p.category_id), name=p.name,
        slug=p.slug, model=p.model, description=p.description,
        images=p.images or [], featured=p.featured
    ) for p in products_list]

@products.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        from fastapi import HTTPException
        raise HTTPException(404, "Product not found")
    cat = db.query(Category).filter(Category.id == product.category_id).first()
    return ProductResponse(
        id=str(product.id), category_id=str(product.category_id), name=product.name,
        slug=product.slug, model=product.model, description=product.description,
        images=product.images or [], featured=product.featured,
        category={"id": str(cat.id), "name": cat.name, "slug": cat.slug} if cat else None
    )


# ==================== Categories Router ====================

categories = APIRouter()

@categories.get("/", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories_list = db.query(Category).order_by(Category.sort_order).all()
    data = []
    for c in categories_list:
        count = db.query(Product).filter(Product.category_id == c.id).count()
        data.append(CategoryResponse(
            id=str(c.id), name=c.name, slug=c.slug,
            description=c.description, product_count=count
        ))
    return data

@categories.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: str, db: Session = Depends(get_db)):
    cat = db.query(Category).filter(Category.id == category_id).first()
    if not cat:
        from fastapi import HTTPException
        raise HTTPException(404, "Category not found")
    count = db.query(Product).filter(Product.category_id == cat.id).count()
    return CategoryResponse(
        id=str(cat.id), name=cat.name, slug=cat.slug,
        description=cat.description, product_count=count
    )


# ==================== Inquiries Router ====================

inquiries = APIRouter()

@inquiries.post("/", response_model=InquiryResponse)
def create_inquiry(data: InquiryCreate, db: Session = Depends(get_db)):
    inquiry = Inquiry(
        company_name=data.company_name,
        contact_name=data.contact_name,
        email=data.email,
        phone=data.phone,
        country=data.country,
        products_text=data.products,
        message=data.message,
        status="pending",
        source="website",
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return InquiryResponse(
        id=str(inquiry.id), company_name=inquiry.company_name,
        contact_name=inquiry.contact_name, email=inquiry.email,
        message=inquiry.message, status=inquiry.status,
        created_at=inquiry.created_at
    )

@inquiries.get("/")
def get_inquiries(page: int = 1, limit: int = 20, status: str = None, db: Session = Depends(get_db)):
    query = db.query(Inquiry)
    if status:
        query = query.filter(Inquiry.status == status)
    total = query.count()
    inquiries_list = query.order_by(Inquiry.created_at.desc()).offset((page-1)*limit).limit(limit).all()
    return {
        "data": [{
            "id": str(i.id), "company_name": i.company_name, "contact_name": i.contact_name,
            "email": i.email, "status": i.status, "created_at": i.created_at.isoformat()
        } for i in inquiries_list],
        "total": total, "page": page, "limit": limit
    }


# ==================== Admin Router ====================

admin = APIRouter()

def create_token(user_id: str):
    from datetime import timedelta
    expire = datetime.utcnow() + timedelta(hours=24)
    return jwt.encode({"sub": user_id, "exp": expire}, JWT_SECRET)

@admin.post("/login", response_model=AdminToken)
def login(data: AdminLogin, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(AdminUser.email == data.email).first()
    if not user or not pwd_context.verify(data.password, user.password_hash):
        from fastapi import HTTPException
        raise HTTPException(401, "Invalid credentials")
    user.last_login_at = datetime.utcnow()
    db.commit()
    return AdminToken(
        access_token=create_token(str(user.id)),
        user={"id": str(user.id), "email": user.email, "name": user.name, "role": user.role}
    )

@admin.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return {
        "total_products": db.query(Product).count(),
        "total_categories": db.query(Category).count(),
        "pending_inquiries": db.query(Inquiry).filter(Inquiry.status == "pending").count(),
        "total_inquiries": db.query(Inquiry).count(),
    }


# ==================== Chat Router ====================

chat = APIRouter()

KNOWLEDGE = {
    "products": "We offer MCCB, MCB, SPD, MOV, Energy Storage Systems, and IoT Smart Circuit Breakers.",
    "contact": "Contact us at sales@ech-st.com or call +86 13851615796",
    "quote": "Please fill out the inquiry form on our Contact page for a quote.",
}

@chat.post("/message")
def chat_message(session_id: str, message: str, locale: str = "en", db: Session = Depends(get_db)):
    msg_lower = message.lower()
    response = KNOWLEDGE.get("contact")  # default
    for key, val in KNOWLEDGE.items():
        if key in msg_lower:
            response = val
            break
    return {"session_id": session_id, "content": response, "role": "assistant"}