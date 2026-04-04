"""
Database configuration and models for ECH-ST API
支持 SQLite (开发) 和 PostgreSQL (生产)
"""

from sqlalchemy import create_engine, Column, String, Boolean, Integer, Text, DateTime, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import uuid
import os

# 数据库配置
# 开发环境使用 SQLite，生产环境使用 PostgreSQL
DATABASE_TYPE = os.getenv("DATABASE_TYPE", "sqlite")  # sqlite 或 postgres

if DATABASE_TYPE == "sqlite":
    DATABASE_URL = "sqlite:///./echst.db"
    engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})
else:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/echst_db")
    engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# 获取数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 初始化数据库
def init_db():
    Base.metadata.create_all(bind=engine)


# ==================== Models ====================

class Category(Base):
    """产品分类模型"""
    __tablename__ = "categories"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(JSON, nullable=False)  # {"en": "...", "zh": "..."}
    slug = Column(String(255), unique=True, nullable=False)
    parent_id = Column(String(36), ForeignKey("categories.id"), nullable=True)
    description = Column(JSON, nullable=True)
    image = Column(String(500), nullable=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    children = relationship("Category", backref="parent", remote_side=[id])
    products = relationship("Product", back_populates="category")


class Product(Base):
    """产品模型"""
    __tablename__ = "products"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    category_id = Column(String(36), ForeignKey("categories.id"), nullable=False)
    name = Column(JSON, nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    model = Column(String(100), nullable=False)
    description = Column(JSON, nullable=True)
    specifications = Column(JSON, nullable=True)
    features = Column(JSON, nullable=True)
    applications = Column(JSON, nullable=True)
    images = Column(JSON, default=[])  # 使用 JSON 存储数组
    pdf_url = Column(String(500), nullable=True)
    pdf_urls = Column(JSON, nullable=True)
    featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    category = relationship("Category", back_populates="products")


class Inquiry(Base):
    """询盘模型"""
    __tablename__ = "inquiries"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    company_name = Column(String(255), nullable=True)
    contact_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    country = Column(String(100), nullable=True)
    product_ids = Column(JSON, nullable=True)
    products_text = Column(Text, nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="pending")
    source = Column(String(50), default="website")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Article(Base):
    """文章/新闻模型"""
    __tablename__ = "articles"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(JSON, nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    summary = Column(JSON, nullable=True)
    content = Column(JSON, nullable=False)
    cover_image = Column(String(500), nullable=True)
    category = Column(String(50), default="news")
    tags = Column(JSON, default=[])
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class AdminUser(Base):
    """后台管理员模型"""
    __tablename__ = "admin_users"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(String(50), default="admin")
    avatar = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    last_login_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ChatMessage(Base):
    """AI聊天记录模型"""
    __tablename__ = "chat_messages"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(100), nullable=False)
    role = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    product_references = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class KnowledgeDocument(Base):
    """AI知识库文档模型"""
    __tablename__ = "knowledge_docs"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    doc_type = Column(String(50), default="product")
    embedding = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class SiteConfig(Base):
    """网站配置模型"""
    __tablename__ = "site_config"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    key = Column(String(100), unique=True, nullable=False)
    value = Column(JSON, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class SEOMeta(Base):
    """SEO元数据模型"""
    __tablename__ = "seo_meta"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    page_type = Column(String(50), nullable=False)  # home, product, category, article, etc.
    page_id = Column(String(36), nullable=True)  # 关联的产品/分类/文章ID
    title = Column(JSON, nullable=True)  # {"en": "...", "zh": "..."}
    description = Column(JSON, nullable=True)
    keywords = Column(JSON, nullable=True)
    og_image = Column(String(500), nullable=True)
    canonical_url = Column(String(500), nullable=True)
    structured_data = Column(JSON, nullable=True)  # Schema.org 结构化数据
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ProductSEO(Base):
    """产品SEO信息"""
    __tablename__ = "product_seo"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = Column(String(36), ForeignKey("products.id"), nullable=False, unique=True)
    meta_title = Column(JSON, nullable=True)
    meta_description = Column(JSON, nullable=True)
    keywords = Column(JSON, nullable=True)
    og_image = Column(String(500), nullable=True)
    structured_data = Column(JSON, nullable=True)  # Product Schema
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    product = relationship("Product", backref="seo_info")