"""
ECH-ST API - Vercel Serverless Function Entry Point
"""

import os
import sys

# 添加项目根目录到 Python 路径
api_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(api_dir)
sys.path.insert(0, project_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from datetime import datetime

# Create FastAPI app
app = FastAPI(
    title="ECH-ST Electrics API",
    description="Backend API for ECH-ST website",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化数据库
try:
    from models.database import init_db
    init_db()
except Exception as e:
    print(f"Database init warning: {e}")

# 导入路由
from routes import products, categories, inquiries, admin, chat
from routes.admin_routes import admin_routes

app.include_router(products, prefix="/api/products", tags=["Products"])
app.include_router(categories, prefix="/api/categories", tags=["Categories"])
app.include_router(inquiries, prefix="/api/inquiries", tags=["Inquiries"])
app.include_router(admin, prefix="/api/admin", tags=["Admin"])
app.include_router(chat, prefix="/api/chat", tags=["Chat"])
app.include_router(admin_routes, prefix="/api/admin", tags=["Admin Management"])


@app.get("/")
async def root():
    return {
        "message": "ECH-ST Electrics API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
    }


# Mangum handler for Vercel
handler = Mangum(app)