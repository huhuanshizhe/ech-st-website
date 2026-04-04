"""
ECH-ST Electrics API Server
FastAPI backend for the ECH-ST website
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

from routes import products, categories, inquiries, admin, chat
from models.database import init_db

# Create FastAPI app
app = FastAPI(
    title="ECH-ST Electrics API",
    description="Backend API for ECH-ST website - circuit protection & energy storage solutions",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8080",
        "https://ech-st.com",
        "https://www.ech-st.com",
        "https://admin.ech-st.com",
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
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "sqlite"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)