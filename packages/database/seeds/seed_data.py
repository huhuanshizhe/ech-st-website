"""
种子数据 - 根据客户提供的资料导入初始产品数据
Seed data for ECH-ST website based on client provided materials
"""

# 产品分类数据
CATEGORIES = [
    {
        "id": "mccb",
        "name": {"en": "MCCB", "zh": "塑壳断路器"},
        "slug": "mccb",
        "description": {"en": "Molded Case Circuit Breakers - Thermomagnetic, Electronic, Residual Current, IoT Smart", "zh": "塑壳断路器 - 热磁式、电子式、剩余电流、物联网智能型"},
        "image": "/images/products/mccb/category.jpg",
        "sort_order": 1,
    },
    {
        "id": "mcb",
        "name": {"en": "MCB", "zh": "小型断路器"},
        "slug": "mcb",
        "description": {"en": "Miniature Circuit Breakers, RCBO, RCCB", "zh": "小型断路器、漏电断路器、漏电保护器"},
        "image": "/images/products/mcb/category.jpg",
        "sort_order": 2,
    },
    {
        "id": "circuit-protection",
        "name": {"en": "Circuit Protection Devices", "zh": "电路保护器件"},
        "slug": "circuit-protection",
        "description": {"en": "Surge Protective Devices (SPD), Metal Oxide Varistor (MOV)", "zh": "浪涌保护器、压敏电阻"},
        "image": "/images/products/protection/category.jpg",
        "sort_order": 3,
    },
    {
        "id": "energy-storage",
        "name": {"en": "Energy Storage Solutions", "zh": "储能系统"},
        "slug": "energy-storage",
        "description": {"en": "Microgrid & Energy Storage System Solutions", "zh": "微电网与储能系统解决方案"},
        "image": "/images/products/energy-storage/category.jpg",
        "sort_order": 4,
    },
    {
        "id": "intelligent-devices",
        "name": {"en": "Intelligent Devices", "zh": "智能设备"},
        "slug": "intelligent-devices",
        "description": {"en": "Smart Drop-out Fuse, Pole-mounted Circuit Breaker", "zh": "智能跌落式熔断器、柱上断路器"},
        "image": "/images/products/intelligent/category.jpg",
        "sort_order": 5,
    },
    {
        "id": "rs485",
        "name": {"en": "RS485 Communication Chip", "zh": "RS485通信芯片"},
        "slug": "rs485",
        "description": {"en": "RS485 Serial Communication Chips", "zh": "RS485串行通信芯片"},
        "image": "/images/products/rs485/category.jpg",
        "sort_order": 6,
    },
    {
        "id": "accessories",
        "name": {"en": "MCCB Accessories", "zh": "断路器附件"},
        "slug": "accessories",
        "description": {"en": "Accessories for MCCB/MCB", "zh": "断路器配套附件"},
        "image": "/images/products/accessories/category.jpg",
        "sort_order": 7,
    },
]

# MCCB产品数据（基于客户提供的PDF文件名）
MCCB_PRODUCTS = [
    {
        "model": "ECHSTM6",
        "name": {"en": "Thermomagnetic Molded Case Circuit Breaker", "zh": "热磁式塑壳断路器"},
        "slug": "echstm6-thermomagnetic",
        "description": {
            "en": "Standard thermomagnetic MCCB for industrial and commercial applications. Reliable overcurrent and short-circuit protection.",
            "zh": "工业和商业应用标准热磁式塑壳断路器，提供可靠的过载和短路保护。"
        },
        "specifications": {
            "frame_size": {"en": "125A-1250A", "zh": "框架：125A-1250A"},
            "breaking_capacity": {"en": "25kA-85kA", "zh": "分断能力：25kA-85kA"},
            " poles": {"en": "3P, 4P", "zh": "极数：3P, 4P"},
        },
        "images": ["images/products/mccb/echstm6.jpg"],
        "pdf_urls": [{"name": "ECHSTM6 Product Manual", "url": "/pdfs/ECHSTM6-Thermomagnetic Molded Case Circuit Breaker.pdf"}],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "ECHSTM6E",
        "name": {"en": "Electronic Molded Case Circuit Breaker", "zh": "电子式塑壳断路器"},
        "slug": "echstm6e-electronic",
        "description": {
            "en": "Electronic MCCB with precise protection settings and LCD display for real-time monitoring.",
            "zh": "电子式塑壳断路器，精确保护设置，LCD显示屏实时监控。"
        },
        "images": ["images/products/mccb/echstm6e.jpg"],
        "pdf_urls": [{"name": "ECHSTM6E Product Manual", "url": "/pdfs/ECHSTM6E-Electronic Molded Case Circuit Breaker.pdf"}],
        "featured": True,
        "sort_order": 2,
    },
    {
        "model": "ECHSTM6LE-250",
        "name": {"en": "Residual Current Operated Circuit Breaker", "zh": "剩余电流动作断路器"},
        "slug": "echstm6le-250",
        "description": {
            "en": "MCCB with earth leakage protection, combined overcurrent and residual current protection.",
            "zh": "带漏电保护的塑壳断路器，结合过载和剩余电流保护。"
        },
        "images": ["images/products/mccb/echstm6le.jpg"],
        "pdf_urls": [{"name": "ECHSTM6LE Product Manual", "url": "/pdfs/ECHSTM6LE-250 Residual Current Operated Circuit Breaker.pdf"}],
        "featured": False,
        "sort_order": 3,
    },
    {
        "model": "ECHSTM6LY-250M",
        "name": {"en": "Thermomagnetic Adjustable Residual Current Circuit Breaker", "zh": "热磁式可调剩余电流断路器"},
        "slug": "echstm6ly-250m",
        "images": ["images/products/mccb/echstm6ly.jpg"],
        "pdf_urls": [{"name": "ECHSTM6LY Product Manual", "url": "/pdfs/ECHSTM6LY-250M R Thermomagnetic Adjustable Residual Current Circuit Breaker.pdf"}],
        "featured": False,
        "sort_order": 4,
    },
    {
        "model": "ECHSTM6ZY-250M",
        "name": {"en": "IoT Intelligent Circuit Breaker", "zh": "物联网智能断路器"},
        "slug": "echstm6zy-250m",
        "description": {
            "en": "IoT smart MCCB with remote monitoring, control via 4G/WiFi, and cloud platform integration.",
            "zh": "物联网智能塑壳断路器，远程监控，4G/WiFi通信，云平台管理。"
        },
        "images": ["images/products/mccb/echstm6zy.jpg"],
        "pdf_urls": [
            {"name": "IoT Intelligent Circuit Breaker 250M", "url": "/pdfs/ECHSTM6ZY-250M-IoT Intelligent Circuit Breaker.pdf"},
            {"name": "IoT Circuit Breaker 400MP", "url": "/pdfs/ECHSTM6ZY-400MP-IoT circuit breaker.pdf"},
        ],
        "featured": True,
        "sort_order": 5,
    },
    {
        "model": "ECHSTM6EY-LC",
        "name": {"en": "Intelligent Measurement Circuit Breaker (State Grid)", "zh": "智能测量断路器（国网专用）"},
        "slug": "echstm6ey-lc",
        "description": {
            "en": "State Grid dedicated intelligent measurement circuit breaker with built-in metering function.",
            "zh": "国网专用智能测量断路器，内置计量功能。"
        },
        "images": ["images/products/mccb/echstm6ey-lc.jpg"],
        "pdf_urls": [{"name": "ECHSTM6EY-LC Product Manual", "url": "/pdfs/ECHSTM6EY-LC-Intelligent Measurement Circuit Breaker.pdf"}],
        "featured": False,
        "sort_order": 6,
    },
    {
        "model": "ECHSTM6LE-160 GZ",
        "name": {"en": "IoT Reclosing Circuit Breaker", "zh": "物联网重合闸断路器"},
        "slug": "echstm6le-160-gz",
        "images": ["images/products/mccb/echstm6le-gz.jpg"],
        "pdf_urls": [{"name": "IoT Reclosing Circuit Breaker", "url": "/pdfs/ECHSTM6LE-160 GZ IoT Reclosing Circuit Breaker.pdf"}],
        "featured": False,
        "sort_order": 7,
    },
    {
        "model": "ECHSTM7-320",
        "name": {"en": "New Energy High Voltage Circuit Breaker", "zh": "新能源高压断路器"},
        "slug": "echstm7-320",
        "description": {
            "en": "High voltage circuit breaker for new energy applications.",
            "zh": "新能源应用高压断路器。"
        },
        "images": ["images/products/mccb/echstm7.jpg"],
        "pdf_urls": [{"name": "New Energy HV Circuit Breaker", "url": "/pdfs/ECHSTM7-320-New Energy Height Voltage Circuit Breaker.pdf"}],
        "featured": False,
        "sort_order": 8,
    },
    {
        "model": "ECHSTM7DC-630",
        "name": {"en": "New Energy DC Circuit Breaker", "zh": "新能源直流断路器"},
        "slug": "echstm7dc-630",
        "description": {
            "en": "DC circuit breaker designed for solar PV and energy storage systems. Rated voltage DC 1000V.",
            "zh": "专为光伏和储能系统设计的直流断路器，额定电压DC 1000V。"
        },
        "images": ["images/products/mccb/echstm7dc.jpg"],
        "pdf_urls": [{"name": "New Energy DC Circuit Breaker", "url": "/pdfs/ECHSTM7DC-630-New Energy DC Circuit Breaker.pdf"}],
        "featured": True,
        "sort_order": 9,
    },
    {
        "model": "ECB-250P",
        "name": {"en": "ECB-250P Cost Control MCCB", "zh": "ECB-250P成本控制塑壳断路器"},
        "slug": "ecb-250p",
        "images": ["images/products/mccb/ecb-250p.png"],
        "pdf_urls": [{"name": "ECB-250P Product Manual", "url": "/pdfs/ECB-250 Cost control Molded Case Circuit Breaker.pdf"}],
        "featured": False,
        "sort_order": 10,
    },
]

# MCB产品数据
MCB_PRODUCTS = [
    {
        "model": "ECHMCB",
        "name": {"en": "Miniature Circuit Breaker", "zh": "小型断路器"},
        "slug": "echmcb",
        "description": {
            "en": "Standard miniature circuit breakers for residential and commercial applications.",
            "zh": "住宅和商业应用标准小型断路器。"
        },
        "images": ["images/products/mcb/mcb.jpg"],
        "pdf_urls": [{"name": "MCB Product Catalog", "url": "/pdfs/MCB Product Catalog.pdf"}],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "Type-B-RCBO",
        "name": {"en": "Type B RCBO", "zh": "B型漏电断路器"},
        "slug": "type-b-rcbo",
        "description": {
            "en": "Type B residual current breaker with overload protection. Detects AC, pulsating DC, and smooth DC residual currents.",
            "zh": "B型漏电断路器，带过载保护，可检测交流、脉冲直流和平滑直流剩余电流。"
        },
        "images": ["images/products/mcb/type-b-rcbo.jpg"],
        "pdf_urls": [{"name": "Type B RCBO Manual", "url": "/pdfs/Type-B-RCBO.pdf"}],
        "featured": True,
        "sort_order": 2,
    },
    {
        "model": "100B-RCCB",
        "name": {"en": "100B RCCB", "zh": "100B型漏电保护器"},
        "slug": "100b-rccb",
        "images": ["images/products/mcb/100b-rccb.jpg"],
        "pdf_urls": [{"name": "100B RCCB Manual", "url": "/pdfs/100B-RCCB.pdf"}, {"name": "RCCB B Type", "url": "/pdfs/RCCB B type.pdf"}],
        "featured": False,
        "sort_order": 3,
    },
    {
        "model": "RCCB",
        "name": {"en": "RCCB Residual Current Circuit Breaker", "zh": "漏电保护器"},
        "slug": "rccb",
        "images": ["images/products/mcb/rccb.jpg"],
        "pdf_urls": [{"name": "RCCB Manual", "url": "/pdfs/RCCB.pdf"}],
        "featured": False,
        "sort_order": 4,
    },
]

# 电路保护器件
CIRCUIT_PROTECTION_PRODUCTS = [
    {
        "model": "MOV-7D-20D",
        "name": {"en": "Metal Oxide Varistor 7D-20D Series", "zh": "压敏电阻 7D-20D系列"},
        "slug": "mov-7d-20d",
        "description": {
            "en": "Metal oxide varistor for voltage surge protection. Diameter 7mm-20mm.",
            "zh": "电压浪涌保护压敏电阻，直径7mm-20mm。"
        },
        "images": ["images/products/mov/mov.jpg"],
        "pdf_urls": [
            {"name": "MOV 7D-20D Datasheet", "url": "/pdfs/Metal Oxide Varistor(MOV) -7D 10D 14D 20DSeries.pdf"},
            {"name": "MOV Datasheet", "url": "/pdfs/Metal Oxide Varistor (MOV) Datasheet.pdf"},
        ],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "MOV-25D-60D",
        "name": {"en": "Metal Oxide Varistor 25D-60D Series", "zh": "压敏电阻 25D-60D系列"},
        "slug": "mov-25d-60d",
        "description": {
            "en": "High energy metal oxide varistor for industrial applications.",
            "zh": "工业应用高能量压敏电阻。"
        },
        "images": ["images/products/mov/mov-large.jpg"],
        "pdf_urls": [{"name": "MOV 25D-60D Datasheet", "url": "/pdfs/Metal Oxide Varistor(MOV) -25D 34S 40S 40D 48R 54R 60D Series.pdf"}],
        "featured": False,
        "sort_order": 2,
    },
    {
        "model": "ECHSPD",
        "name": {"en": "Surge Protective Device (SPD)", "zh": "浪涌保护器"},
        "slug": "echspd",
        "description": {
            "en": "Surge protective device for power system protection. Class I/II/III available.",
            "zh": "电力系统浪涌保护器，I/II/III级可选。"
        },
        "images": ["images/products/spd/spd.jpg"],
        "pdf_urls": [{"name": "SPD Selection Guide", "url": "/pdfs/Surge Protective Device and Backup Protector Selection Guide.pdf"}],
        "featured": True,
        "sort_order": 3,
    },
]

# 储能系统产品
ENERGY_STORAGE_PRODUCTS = [
    {
        "model": "ECH-ESS-AIO",
        "name": {"en": "All-in-One Energy Storage System", "zh": "一体式储能系统"},
        "slug": "ech-ess-aio",
        "description": {
            "en": "Complete turnkey energy storage solution with grid-forming PCS, BMU, and EMS.",
            "zh": "完整交钥匙储能解决方案，含网构型PCS、BMU、EMS。"
        },
        "features": {
            "en": ["Turnkey solutions", "Grid-forming PCS", "Battery Management Unit (BMU)", "Energy Management System (EMS)", "Container enclosure"],
            "zh": ["交钥匙解决方案", "网构型PCS", "电池管理单元(BMU)", "能源管理系统(EMS)", "集装箱外壳"],
        },
        "images": ["images/products/energy-storage/all-in-one.jpg"],
        "pdf_urls": [{"name": "ESS All-in-One", "url": "/pdfs/ESS_All-in-one.pdf"}],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "ECH-SOLAR-ESS",
        "name": {"en": "Solar Energy Storage System", "zh": "太阳能储能系统"},
        "slug": "ech-solar-ess",
        "images": ["images/products/energy-storage/solar.jpg"],
        "pdf_urls": [{"name": "Solar Energy Storage System", "url": "/pdfs/SOLAR ENERGY STORAGE SYSTEM.pdf"}],
        "featured": False,
        "sort_order": 2,
    },
    {
        "model": "ECH-CNI-ESS",
        "name": {"en": "C&I Energy Storage", "zh": "工商业储能"},
        "slug": "ech-cni-ess",
        "description": {
            "en": "Commercial & Industrial energy storage system, 100kWh-1MWh scalable.",
            "zh": "工商业储能系统，100kWh-1MWh可扩展。"
        },
        "images": ["images/products/energy-storage/cni.jpg"],
        "pdf_urls": [{"name": "C&I Energy Storage", "url": "/pdfs/C&I Energy Storage.pdf"}],
        "featured": True,
        "sort_order": 3,
    },
]

# 智能设备产品
INTELLIGENT_PRODUCTS = [
    {
        "model": "Smart-Cutout",
        "name": {"en": "Intelligent Drop-Out Fuse", "zh": "智能跌落式熔断器"},
        "slug": "smart-cutout",
        "description": {
            "en": "Smart drop-out fuse with remote monitoring and status detection.",
            "zh": "带远程监控和状态检测的智能跌落式熔断器。"
        },
        "images": ["images/products/intelligent/smart-fuse.jpg"],
        "pdf_urls": [{"name": "Smart Cutout Manual", "url": "/pdfs/Product Manual for Smart Cutout.pdf"}],
        "featured": True,
        "sort_order": 1,
    },
    {
        "model": "ZW32-12",
        "name": {"en": "Primary-Secondary Integrated Pole-Mounted Circuit Breaker", "zh": "一二次融合柱上断路器"},
        "slug": "zw32-12",
        "description": {
            "en": "12kV primary-secondary integrated pole-mounted vacuum circuit breaker.",
            "zh": "12kV一二次融合柱上真空断路器。"
        },
        "images": ["images/products/intelligent/zw32-12.jpg"],
        "pdf_urls": [{"name": "ZW32-12 Manual (EN)", "url": "/pdfs/ZW32-12_Product_Manual_EN.pdf"}],
        "featured": False,
        "sort_order": 2,
    },
]

# RS485芯片
RS485_PRODUCTS = [
    {
        "model": "ECH485EESA",
        "name": {"en": "RS485 Serial Communication Chip", "zh": "RS485串行通信芯片"},
        "slug": "ech485eesa",
        "description": {
            "en": "Half-duplex RS485 transceiver with low power consumption and ESD protection.",
            "zh": "低功耗半双工RS485收发器，带ESD保护。"
        },
        "images": ["images/products/rs485/ech485eesa.png"],
        "pdf_urls": [{"name": "RS485 Specification", "url": "/pdfs/RS485(ECH485EESA、ECH485NEESA)-Specification sheet.pdf"}],
        "featured": True,
        "sort_order": 1,
    },
]

# 附件产品
ACCESSORY_PRODUCTS = [
    {
        "model": "Accessory-Series",
        "name": {"en": "MCCB Accessories Series", "zh": "断路器附件系列"},
        "slug": "accessory-series",
        "description": {
            "en": "Accessories for MCCB including shunt trip, undervoltage release, auxiliary contacts, motor operator.",
            "zh": "断路器附件：分励脱扣、欠压脱扣、辅助触点、电动操作机构。"
        },
        "images": ["images/products/accessories/accessories.jpg"],
        "pdf_urls": [{"name": "Accessory Series", "url": "/pdfs/Accessory series.pdf"}],
        "featured": False,
        "sort_order": 1,
    },
]

# 公司信息
COMPANY_INFO = {
    "name": {"en": "ECH-ST Electrics", "zh": "ECH-ST电气"},
    "slogan": {"en": "Professional Circuit Protection & Energy Storage Solutions", "zh": "专业电路保护与储能解决方案"},
    "logo": "/images/logo.png",
    "email": "sales@ech-st.com",
    "phone": "+86 13851615796",
    "website": "https://www.ech-st.com",
    "addresses": [
        {
            "type": "factory",
            "address": {"en": "Wenzhou, Zhejiang - R&D center, manufacturing and OEM factory", "zh": "温州，浙江 - 研发中心、制造工厂、OEM工厂"},
        },
        {
            "type": "office",
            "address": {"en": "Nanjing, Jiangsu - Supply chain management", "zh": "南京，江苏 - 供应链管理"},
        },
    ],
    "contact_person": "Ms. Huang",
    "wechat": "+86 13851615796",
}

# 工厂视频信息
FACTORY_VIDEOS = [
    {
        "id": "mccb-workshop",
        "title": {"en": "MCCB Manufacturing Workshop", "zh": "塑壳断路器制造车间"},
        "src": "/videos/MCCB Manufacturing workshop.mp4",
        "poster": "/images/factory/mccb-workshop.jpg",
    },
    {
        "id": "mechanism",
        "title": {"en": "Circuit Breaker Mechanism Production", "zh": "断路器机构零件生产车间"},
        "src": "/videos/Circuit breaker mechanism parts production workshop.mp4",
        "poster": "/images/factory/mechanism.jpg",
    },
    {
        "id": "injection",
        "title": {"en": "Injection Molding Workshop", "zh": "注塑制造车间"},
        "src": "/videos/Injection molding manufacturing workshop.mp4",
        "poster": "/images/factory/injection.jpg",
    },
    {
        "id": "testing",
        "title": {"en": "Testing Center", "zh": "检测中心"},
        "src": "/videos/testing center.mp4",
        "poster": "/images/factory/testing.jpg",
    },
]