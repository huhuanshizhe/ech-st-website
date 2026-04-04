"""
ECH-ST Electrics API Server
FastAPI backend for the ECH-ST website
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
import uvicorn

from routes import products, categories, inquiries, admin, chat
from routes.admin_routes import admin_routes
from models.database import init_db

# Create FastAPI app
app = FastAPI(
    title="ECH-ST Electrics API",
    description="Backend API for ECH-ST website - circuit protection & energy storage solutions",
    version="1.0.0",
)

# CORS middleware - 允许所有来源（生产环境应该限制）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8080",
        "https://ech-st.com",
        "https://www.ech-st.com",
        "https://admin.ech-st.com",
        "https://ech-st-website.vercel.app",
        "https://ech-st-admin.vercel.app",
        # 允许所有 Vercel 预览部署
        *[f"https://{os.getenv('VERCEL_URL')}" for _ in [1] if os.getenv('VERCEL_URL')],
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(products, prefix="/api/products", tags=["Products"])
app.include_router(categories, prefix="/api/categories", tags=["Categories"])
app.include_router(inquiries, prefix="/api/inquiries", tags=["Inquiries"])
app.include_router(admin, prefix="/api/admin", tags=["Admin"])
app.include_router(chat, prefix="/api/chat", tags=["Chat"])
app.include_router(admin_routes, prefix="/api/admin", tags=["Admin Management"])


@app.on_event("startup")
async def startup_event():
    """Startup: Initialize database"""
    init_db()
    print("[OK] Database initialized")


# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "ECH-ST Electrics API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "products": "/api/products",
            "categories": "/api/categories",
            "inquiries": "/api/inquiries",
            "admin": "/api/admin",
            "chat": "/api/chat",
        }
    }


# Health check
@app.get("/api/health")
async def health_check():
    db_type = os.getenv("DATABASE_TYPE", "sqlite")
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": db_type
    }


if __name__ == "__main__":
    # Render 会动态分配端口
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)