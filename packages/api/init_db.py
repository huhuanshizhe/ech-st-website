"""
数据库初始化脚本
运行此脚本创建数据库并导入种子数据
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.database import init_db, SessionLocal, Category, Product, AdminUser
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 产品分类数据
CATEGORIES = [
    {
        "id": "mccb",
        "name": {"en": "MCCB", "zh": "塑壳断路器"},
        "slug": "mccb",
        "description": {"en": "Molded Case Circuit Breakers", "zh": "热磁式与电子式塑壳断路器"},
        "sort_order": 1,
    },
    {
        "id": "mcb",
        "name": {"en": "MCB", "zh": "小型断路器"},
        "slug": "mcb",
        "description": {"en": "Miniature Circuit Breakers", "zh": "小型断路器及漏电保护器"},
        "sort_order": 2,
    },
    {
        "id": "circuit-protection",
        "name": {"en": "Circuit Protection Devices", "zh": "电路保护器件"},
        "slug": "circuit-protection",
        "description": {"en": "SPD, MOV and Protection Devices", "zh": "浪涌保护器、压敏电阻等"},
        "sort_order": 3,
    },
    {
        "id": "energy-storage",
        "name": {"en": "Energy Storage Solutions", "zh": "储能系统"},
        "slug": "energy-storage",
        "description": {"en": "Microgrid & ESS Solutions", "zh": "微电网与储能系统解决方案"},
        "sort_order": 4,
    },
    {
        "id": "intelligent-devices",
        "name": {"en": "Intelligent Devices", "zh": "智能设备"},
        "slug": "intelligent-devices",
        "description": {"en": "Smart Grid Devices", "zh": "智能电网设备"},
        "sort_order": 5,
    },
    {
        "id": "rs485",
        "name": {"en": "RS485 Communication Chip", "zh": "RS485通信芯片"},
        "slug": "rs485",
        "sort_order": 6,
    },
    {
        "id": "accessories",
        "name": {"en": "MCCB Accessories", "zh": "断路器附件"},
        "slug": "accessories",
        "sort_order": 7,
    },
]

# MCCB 产品
MCCB_PRODUCTS = [
    {
        "model": "ECHSTM6",
        "name": {"en": "Thermomagnetic MCCB", "zh": "热磁式塑壳断路器"},
        "slug": "echstm6-thermomagnetic",
        "description": {"en": "Standard thermomagnetic MCCB for industrial applications", "zh": "工业应用标准热磁式塑壳断路器"},
        "images": ["/images/products/mccb/echstm6.jpg"],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "ECHSTM6E",
        "name": {"en": "Electronic MCCB", "zh": "电子式塑壳断路器"},
        "slug": "echstm6e-electronic",
        "description": {"en": "Electronic MCCB with precise protection settings", "zh": "精确保护设置电子式塑壳断路器"},
        "images": ["/images/products/mccb/echstm6e.jpg"],
        "featured": True,
        "sort_order": 2,
    },
    {
        "model": "ECHSTM6ZY-250M",
        "name": {"en": "IoT Intelligent Circuit Breaker", "zh": "物联网智能断路器"},
        "slug": "echstm6zy-250m",
        "description": {"en": "IoT smart MCCB with remote monitoring & control", "zh": "远程监控智能塑壳断路器"},
        "images": ["/images/products/mccb/echstm6zy.jpg"],
        "featured": True,
        "sort_order": 3,
    },
    {
        "model": "ECHSTM7DC-630",
        "name": {"en": "New Energy DC Circuit Breaker", "zh": "新能源直流断路器"},
        "slug": "echstm7dc-630",
        "description": {"en": "DC MCCB for solar & energy storage applications", "zh": "光伏与储能应用直流断路器"},
        "images": ["/images/products/mccb/echstm7dc.jpg"],
        "featured": True,
        "sort_order": 4,
    },
]

# MCB 产品
MCB_PRODUCTS = [
    {
        "model": "ECHMCB",
        "name": {"en": "Miniature Circuit Breaker", "zh": "小型断路器"},
        "slug": "echmcb",
        "description": {"en": "Standard MCB for residential & commercial", "zh": "住宅与商用小型断路器"},
        "images": ["/images/products/mcb/mcb.jpg"],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "Type-B-RCBO",
        "name": {"en": "Type B RCBO", "zh": "B型漏电断路器"},
        "slug": "type-b-rcbo",
        "description": {"en": "Type B residual current breaker for smooth DC detection", "zh": "B型漏电断路器，可检测平滑直流"},
        "images": ["/images/products/mcb/type-b-rcbo.jpg"],
        "featured": True,
        "sort_order": 2,
    },
]

# 电路保护产品
CIRCUIT_PROTECTION_PRODUCTS = [
    {
        "model": "MOV-7D-20D",
        "name": {"en": "Metal Oxide Varistor 7D-20D", "zh": "压敏电阻 7D-20D系列"},
        "slug": "mov-7d-20d",
        "description": {"en": "MOV for voltage surge protection", "zh": "电压浪涌保护压敏电阻"},
        "images": ["/images/products/mov/mov.jpg"],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "ECHSPD",
        "name": {"en": "Surge Protective Device", "zh": "浪涌保护器"},
        "slug": "echspd",
        "description": {"en": "SPD for power system surge protection", "zh": "电力系统浪涌保护器"},
        "images": ["/images/products/spd/spd.jpg"],
        "featured": True,
        "sort_order": 2,
    },
]

# 储能系统产品
ENERGY_STORAGE_PRODUCTS = [
    {
        "model": "ECH-ESS-AIO",
        "name": {"en": "All-in-One Energy Storage System", "zh": "一体式储能系统"},
        "slug": "ech-ess-aio",
        "description": {"en": "Complete turnkey energy storage solution", "zh": "完整交钥匙储能解决方案"},
        "images": ["/images/products/energy-storage/all-in-one.jpg"],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "ECH-CNI-ESS",
        "name": {"en": "C&I Energy Storage", "zh": "工商业储能"},
        "slug": "ech-cni-ess",
        "description": {"en": "Commercial & Industrial energy storage", "zh": "工商业储能系统"},
        "images": ["/images/products/energy-storage/cni.jpg"],
        "featured": True,
        "sort_order": 2,
    },
]

# 智能设备产品
INTELLIGENT_PRODUCTS = [
    {
        "model": "Smart-Cutout",
        "name": {"en": "Intelligent Drop-Out Fuse", "zh": "智能跌落式熔断器"},
        "slug": "smart-cutout",
        "description": {"en": "Smart drop-out fuse with remote monitoring", "zh": "带远程监控的智能跌落式熔断器"},
        "images": ["/images/products/intelligent/smart-fuse.jpg"],
        "featured": True,
        "sort_order": 1,
    },
]

# RS485 产品
RS485_PRODUCTS = [
    {
        "model": "ECH485EESA",
        "name": {"en": "RS485 Communication Chip", "zh": "RS485串行通信芯片"},
        "slug": "ech485eesa",
        "description": {"en": "Half-duplex RS485 transceiver", "zh": "半双工RS485收发器"},
        "images": ["/images/products/rs485/ech485eesa.png"],
        "featured": True,
        "sort_order": 1,
    },
]

# 附件产品
ACCESSORY_PRODUCTS = [
    {
        "model": "Accessory-Series",
        "name": {"en": "MCCB Accessories", "zh": "断路器附件系列"},
        "slug": "accessory-series",
        "description": {"en": "Accessories for MCCB including shunt trip, undervoltage release", "zh": "断路器附件：分励脱扣、欠压脱扣等"},
        "images": ["/images/products/accessories/accessories.jpg"],
        "featured": False,
        "sort_order": 1,
    },
]


def seed_database():
    """初始化数据库并导入种子数据"""
    print("=" * 50)
    print("ECH-ST 网站数据库初始化")
    print("=" * 50)
    
    # 创建数据库表
    print("\n[1/4] 创建数据库表...")
    init_db()
    print("✓ 数据库表创建完成")
    
    db = SessionLocal()
    
    try:
        # 导入分类
        print("\n[2/4] 导入产品分类...")
        category_map = {}
        for cat_data in CATEGORIES:
            existing = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
            if not existing:
                category = Category(
                    id=cat_data["id"],
                    name=cat_data["name"],
                    slug=cat_data["slug"],
                    description=cat_data.get("description"),
                    sort_order=cat_data.get("sort_order", 0),
                )
                db.add(category)
                category_map[cat_data["id"]] = category.id
                print(f"  + {cat_data['name']['en']}")
            else:
                category_map[cat_data["id"]] = existing.id
                print(f"  = {cat_data['name']['en']} (已存在)")
        db.commit()
        print(f"✓ 共 {len(CATEGORIES)} 个分类")
        
        # 导入产品
        print("\n[3/4] 导入产品数据...")
        all_products = [
            ("mccb", MCCB_PRODUCTS),
            ("mcb", MCB_PRODUCTS),
            ("circuit-protection", CIRCUIT_PROTECTION_PRODUCTS),
            ("energy-storage", ENERGY_STORAGE_PRODUCTS),
            ("intelligent-devices", INTELLIGENT_PRODUCTS),
            ("rs485", RS485_PRODUCTS),
            ("accessories", ACCESSORY_PRODUCTS),
        ]
        
        total = 0
        for cat_id, products in all_products:
            for prod_data in products:
                existing = db.query(Product).filter(Product.slug == prod_data["slug"]).first()
                if not existing:
                    product = Product(
                        category_id=category_map.get(cat_id),
                        name=prod_data["name"],
                        slug=prod_data["slug"],
                        model=prod_data["model"],
                        description=prod_data.get("description"),
                        images=prod_data.get("images", []),
                        featured=prod_data.get("featured", False),
                        sort_order=prod_data.get("sort_order", 0),
                    )
                    db.add(product)
                    total += 1
                    print(f"  + {prod_data['model']}: {prod_data['name']['en']}")
        db.commit()
        print(f"✓ 共导入 {total} 个新产品")
        
        # 创建管理员
        print("\n[4/4] 创建管理员账户...")
        admin_email = "admin@ech-st.com"
        existing_admin = db.query(AdminUser).filter(AdminUser.email == admin_email).first()
        if not existing_admin:
            admin = AdminUser(
                email=admin_email,
                password_hash=pwd_context.hash("admin123"),
                name="系统管理员",
                role="admin",
                is_active=True,
            )
            db.add(admin)
            db.commit()
            print(f"✓ 管理员账户已创建")
        else:
            print("= 管理员账户已存在")
        
        print("\n" + "=" * 50)
        print("数据库初始化完成!")
        print("=" * 50)
        print("\n管理员登录信息:")
        print(f"  邮箱: {admin_email}")
        print("  密码: admin123")
        print("\n数据库文件: echst.db (SQLite)")
        print("=" * 50)
        
    except Exception as e:
        print(f"\n❌ 错误: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()