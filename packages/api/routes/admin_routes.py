"""
Admin management routes for products, categories, and inquiries
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
import uuid

from models.database import get_db, Product, Category, Inquiry, AdminUser
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

admin_routes = APIRouter()

# ==================== Models ====================

class ProductCreate(BaseModel):
    category_id: str
    name: dict  # {"en": "...", "zh": "..."}
    model: str
    slug: str
    description: Optional[dict] = None
    specifications: Optional[dict] = None
    features: Optional[dict] = None
    applications: Optional[dict] = None
    images: Optional[list] = []
    pdf_url: Optional[str] = None
    pdf_urls: Optional[dict] = None
    featured: bool = False
    sort_order: int = 0

class ProductUpdate(BaseModel):
    category_id: Optional[str] = None
    name: Optional[dict] = None
    model: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[dict] = None
    specifications: Optional[dict] = None
    featured: Optional[bool] = None
    images: Optional[list] = None
    sort_order: Optional[int] = None

class CategoryCreate(BaseModel):
    name: dict  # {"en": "...", "zh": "..."}
    slug: str
    parent_id: Optional[str] = None
    description: Optional[dict] = None
    image: Optional[str] = None
    sort_order: int = 0

class CategoryUpdate(BaseModel):
    name: Optional[dict] = None
    slug: Optional[str] = None
    description: Optional[dict] = None
    image: Optional[str] = None
    sort_order: Optional[int] = None

class InquiryUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


# ==================== Products Management ====================

@admin_routes.get("/products", tags=["Admin Products"])
def get_admin_products(
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    category_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all products with pagination"""
    query = db.query(Product)
    
    if category_id:
        query = query.filter(Product.category_id == category_id)
    
    if search:
        term = f"%{search}%"
        query = query.filter(
            (Product.model.ilike(term)) |
            (Product.name['en'].astext.ilike(term)) |
            (Product.name['zh'].astext.ilike(term))
        )
    
    total = query.count()
    products_list = query.order_by(Product.sort_order).offset((page-1)*limit).limit(limit).all()
    
    data = []
    for p in products_list:
        cat = db.query(Category).filter(Category.id == p.category_id).first()
        data.append({
            "id": str(p.id),
            "category_id": str(p.category_id),
            "name": p.name,
            "slug": p.slug,
            "model": p.model,
            "description": p.description,
            "specifications": p.specifications,
            "featured": p.featured,
            "images": p.images or [],
            "sort_order": p.sort_order,
            "category": {
                "id": str(cat.id),
                "name": cat.name,
                "slug": cat.slug
            } if cat else None
        })
    
    return {
        "data": data,
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": (total + limit - 1) // limit
    }


@admin_routes.post("/products", tags=["Admin Products"])
def create_product(product_data: ProductCreate, db: Session = Depends(get_db)):
    """Create a new product"""
    # Verify category exists
    category = db.query(Category).filter(Category.id == product_data.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    product = Product(
        category_id=product_data.category_id,
        name=product_data.name,
        slug=product_data.slug,
        model=product_data.model,
        description=product_data.description,
        specifications=product_data.specifications,
        features=product_data.features,
        applications=product_data.applications,
        images=product_data.images,
        pdf_url=product_data.pdf_url,
        pdf_urls=product_data.pdf_urls,
        featured=product_data.featured,
        sort_order=product_data.sort_order,
    )
    
    db.add(product)
    db.commit()
    db.refresh(product)
    
    return {
        "id": str(product.id),
        "message": "Product created successfully"
    }


@admin_routes.get("/products/{product_id}", tags=["Admin Products"])
def get_product(product_id: str, db: Session = Depends(get_db)):
    """Get a single product by ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    cat = db.query(Category).filter(Category.id == product.category_id).first()
    return {
        "id": str(product.id),
        "category_id": str(product.category_id),
        "name": product.name,
        "slug": product.slug,
        "model": product.model,
        "description": product.description,
        "specifications": product.specifications,
        "featured": product.featured,
        "images": product.images or [],
        "pdf_url": product.pdf_url,
        "sort_order": product.sort_order,
        "category": {
            "id": str(cat.id),
            "name": cat.name,
            "slug": cat.slug
        } if cat else None
    }


@admin_routes.patch("/products/{product_id}", tags=["Admin Products"])
def update_product(product_id: str, product_data: ProductUpdate, db: Session = Depends(get_db)):
    """Update a product"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_data.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(product, field, value)
    
    product.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(product)
    
    return {"message": "Product updated successfully"}


@admin_routes.delete("/products/{product_id}", tags=["Admin Products"])
def delete_product(product_id: str, db: Session = Depends(get_db)):
    """Delete a product"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    
    return {"message": "Product deleted successfully"}


# ==================== Categories Management ====================

@admin_routes.get("/categories", tags=["Admin Categories"])
def get_admin_categories(db: Session = Depends(get_db)):
    """Get all categories with product count"""
    categories_list = db.query(Category).order_by(Category.sort_order).all()
    
    data = []
    for c in categories_list:
        count = db.query(Product).filter(Product.category_id == c.id).count()
        data.append({
            "id": str(c.id),
            "name": c.name,
            "slug": c.slug,
            "description": c.description,
            "image": c.image,
            "product_count": count,
            "sort_order": c.sort_order
        })
    
    return data


@admin_routes.post("/categories", tags=["Admin Categories"])
def create_category(category_data: CategoryCreate, db: Session = Depends(get_db)):
    """Create a new category"""
    # Check if slug already exists
    existing = db.query(Category).filter(Category.slug == category_data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    category = Category(
        name=category_data.name,
        slug=category_data.slug,
        parent_id=category_data.parent_id,
        description=category_data.description,
        image=category_data.image,
        sort_order=category_data.sort_order,
    )
    
    db.add(category)
    db.commit()
    db.refresh(category)
    
    return {
        "id": str(category.id),
        "message": "Category created successfully"
    }


@admin_routes.get("/categories/{category_id}", tags=["Admin Categories"])
def get_category(category_id: str, db: Session = Depends(get_db)):
    """Get a single category"""
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    count = db.query(Product).filter(Product.category_id == category.id).count()
    
    return {
        "id": str(category.id),
        "name": category.name,
        "slug": category.slug,
        "description": category.description,
        "image": category.image,
        "product_count": count,
        "sort_order": category.sort_order
    }


@admin_routes.patch("/categories/{category_id}", tags=["Admin Categories"])
def update_category(category_id: str, category_data: CategoryUpdate, db: Session = Depends(get_db)):
    """Update a category"""
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    update_data = category_data.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(category, field, value)
    
    category.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(category)
    
    return {"message": "Category updated successfully"}


@admin_routes.delete("/categories/{category_id}", tags=["Admin Categories"])
def delete_category(category_id: str, db: Session = Depends(get_db)):
    """Delete a category"""
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if category has products
    product_count = db.query(Product).filter(Product.category_id == category_id).count()
    if product_count > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete category with {product_count} products. Please move or delete products first."
        )
    
    db.delete(category)
    db.commit()
    
    return {"message": "Category deleted successfully"}


# ==================== Inquiries Management ====================

@admin_routes.get("/inquiries", tags=["Admin Inquiries"])
def get_admin_inquiries(
    page: int = 1,
    limit: int = 20,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all inquiries with pagination"""
    query = db.query(Inquiry)
    
    if status:
        query = query.filter(Inquiry.status == status)
    
    if search:
        term = f"%{search}%"
        query = query.filter(
            (Inquiry.contact_name.ilike(term)) |
            (Inquiry.company_name.ilike(term)) |
            (Inquiry.email.ilike(term))
        )
    
    total = query.count()
    inquiries_list = query.order_by(Inquiry.created_at.desc()).offset((page-1)*limit).limit(limit).all()
    
    return {
        "data": [{
            "id": str(i.id),
            "company_name": i.company_name,
            "contact_name": i.contact_name,
            "email": i.email,
            "phone": i.phone,
            "country": i.country,
            "products_text": i.products_text,
            "message": i.message,
            "status": i.status,
            "notes": i.notes,
            "source": i.source,
            "created_at": i.created_at.isoformat(),
            "updated_at": i.updated_at.isoformat()
        } for i in inquiries_list],
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": (total + limit - 1) // limit
    }


@admin_routes.get("/inquiries/{inquiry_id}", tags=["Admin Inquiries"])
def get_inquiry(inquiry_id: str, db: Session = Depends(get_db)):
    """Get a single inquiry"""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    return {
        "id": str(inquiry.id),
        "company_name": inquiry.company_name,
        "contact_name": inquiry.contact_name,
        "email": inquiry.email,
        "phone": inquiry.phone,
        "country": inquiry.country,
        "products_text": inquiry.products_text,
        "message": inquiry.message,
        "status": inquiry.status,
        "notes": inquiry.notes,
        "source": inquiry.source,
        "created_at": inquiry.created_at.isoformat(),
        "updated_at": inquiry.updated_at.isoformat()
    }


@admin_routes.patch("/inquiries/{inquiry_id}", tags=["Admin Inquiries"])
def update_inquiry(inquiry_id: str, inquiry_data: InquiryUpdate, db: Session = Depends(get_db)):
    """Update an inquiry status or notes"""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    update_data = inquiry_data.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(inquiry, field, value)
    
    inquiry.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(inquiry)
    
    return {"message": "Inquiry updated successfully"}
