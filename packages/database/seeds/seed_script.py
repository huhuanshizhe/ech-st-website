"""
数据库种子脚本 - 初始化数据库数据
Database seeding script for ECH-ST website
"""

import asyncio
import uuid
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import select

from models.database import Base, Category, Product, AdminUser
from seed_data import (
    CATEGORIES, MCCB_PRODUCTS, MCB_PRODUCTS, CIRCUIT_PROTECTION_PRODUCTS,
    ENERGY_STORAGE_PRODUCTS, INTELLIGENT_PRODUCTS, RS485_PRODUCTS, ACCESSORY_PRODUCTS
)
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5432/echst_db"


async def seed_database():
    """运行数据库种子脚本"""
    engine = create_async_engine(DATABASE_URL, echo=True)
    async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with engine.begin() as conn:
        # 创建所有表
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_maker() as session:
        # 1. 创建分类
        print("创建产品分类...")
        category_map = {}
        for cat_data in CATEGORIES:
            category = Category(
                id=uuid.uuid4(),
                name=cat_data["name"],
                slug=cat_data["slug"],
                description=cat_data.get("description"),
                image=cat_data.get("image"),
                sort_order=cat_data.get("sort_order", 0),
            )
            session.add(category)
            category_map[cat_data["id"]] = category.id
        await session.commit()
        print(f"已创建 {len(CATEGORIES)} 个分类")

        # 2. 创建产品
        print("创建产品...")
        all_products = [
            ("mccb", MCCB_PRODUCTS),
            ("mcb", MCB_PRODUCTS),
            ("circuit-protection", CIRCUIT_PROTECTION_PRODUCTS),
            ("energy-storage", ENERGY_STORAGE_PRODUCTS),
            ("intelligent-devices", INTELLIGENT_PRODUCTS),
            ("rs485", RS485_PRODUCTS),
            ("accessories", ACCESSORY_PRODUCTS),
        ]

        total_products = 0
        for cat_id, products in all_products:
            for prod_data in products:
                product = Product(
                    id=uuid.uuid4(),
                    category_id=category_map.get(cat_id),
                    name=prod_data["name"],
                    slug=prod_data["slug"],
                    model=prod_data["model"],
                    description=prod_data.get("description"),
                    specifications=prod_data.get("specifications"),
                    features=prod_data.get("features"),
                    images=prod_data.get("images", []),
                    pdf_urls=prod_data.get("pdf_urls"),
                    featured=prod_data.get("featured", False),
                    sort_order=prod_data.get("sort_order", 0),
                )
                session.add(product)
                total_products += 1
        await session.commit()
        print(f"已创建 {total_products} 个产品")

        # 3. 创建默认管理员
        print("创建默认管理员账户...")
        existing_admin = await session.execute(
            select(AdminUser).where(AdminUser.email == "admin@ech-st.com")
        )
        if not existing_admin.scalar_one_or_none():
            admin = AdminUser(
                id=uuid.uuid4(),
                email="admin@ech-st.com",
                password_hash=pwd_context.hash("admin123"),  # 默认密码
                name="系统管理员",
                role="admin",
                is_active=True,
            )
            session.add(admin)
            await session.commit()
            print("已创建管理员: admin@ech-st.com (密码: admin123)")
        else:
            print("管理员账户已存在")

        print("\n数据库初始化完成！")
        print("================================")
        print("管理员登录信息:")
        print("  邮箱: admin@ech-st.com")
        print("  密码: admin123")
        print("================================")


if __name__ == "__main__":
    asyncio.run(seed_database())