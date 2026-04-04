-- ECH-ST Website Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table (产品分类)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) NOT NULL,
    name_zh VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description_en TEXT,
    description_zh TEXT,
    icon VARCHAR(50),
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table (产品)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name_en VARCHAR(200) NOT NULL,
    name_zh VARCHAR(200) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    series VARCHAR(50), -- 产品系列如 ECHSTM6
    model_number VARCHAR(100), -- 型号
    description_en TEXT,
    description_zh TEXT,
    features_en TEXT[],
    features_zh TEXT[],
    specifications JSONB, -- 技术规格 JSON格式
    image_url TEXT,
    images TEXT[], -- 多张图片
    pdf_url TEXT, -- 产品PDF文档链接
    pdf_urls TEXT[], -- 多个PDF文档
    price_range VARCHAR(50), -- 价格范围
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries table (询盘)
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    company VARCHAR(200),
    phone VARCHAR(50),
    country VARCHAR(50),
    product_interest TEXT[], -- 感兴趣的产品
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new', -- new, processing, replied, closed
    replied_at TIMESTAMP WITH TIME ZONE,
    reply_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table (文章/新闻)
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(200) NOT NULL,
    title_zh VARCHAR(200) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    content_en TEXT,
    content_zh TEXT,
    excerpt_en TEXT,
    excerpt_zh TEXT,
    image_url TEXT,
    article_type VARCHAR(20) DEFAULT 'news', -- news, blog, case_study
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    author VARCHAR(100),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Messages table (AI聊天记录)
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL,
    user_message TEXT NOT NULL,
    ai_response TEXT,
    message_type VARCHAR(20) DEFAULT 'text',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge Documents table (知识库文档)
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    content TEXT,
    document_type VARCHAR(50), -- product_spec, faq, company_info
    source_url TEXT,
    keywords TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Config table (网站配置)
CREATE TABLE IF NOT EXISTS site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(50) UNIQUE NOT NULL,
    config_value TEXT,
    config_type VARCHAR(20) DEFAULT 'text', -- text, json, number, boolean
    description VARCHAR(200),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users table (管理员)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'admin', -- admin, super_admin
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_articles_type ON articles(article_type);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id);

-- Insert initial categories (初始分类数据)
INSERT INTO categories (name_en, name_zh, slug, description_en, description_zh, icon, sort_order) VALUES
('MCCB', '塑壳断路器', 'mccb', 'Molded Case Circuit Breakers - Thermomagnetic and Electronic types', '塑壳断路器 - 热磁式和电子式', '⚡', 1),
('MCB', '小型断路器', 'mcb', 'Miniature Circuit Breakers, RCBO, RCCB for residential applications', '小型断路器、RCBO、RCCB 适用于住宅应用', '🔌', 2),
('Circuit Protection', '电路保护', 'circuit-protection', 'SPD and MOV surge protection devices', 'SPD浪涌保护器和MOV压敏电阻', '🛡️', 3),
('Energy Storage', '能源储存', 'energy-storage', 'Complete energy storage system solutions', '完整的能源储存系统解决方案', '🔋', 4),
('IoT Smart Devices', 'IoT智能设备', 'iot-smart', 'Intelligent circuit breakers and monitoring devices', '智能断路器和监测设备', '📱', 5),
('RS485 Chip', 'RS485芯片', 'rs485', 'RS485 serial communication chips', 'RS485串行通信芯片', '📡', 6),
('Capacitors', '电容', 'capacitors', 'Various capacitor specifications', '各种规格电容', '⚛️', 7),
('Accessories', '配件', 'accessories', 'Circuit breaker accessories and parts', '断路器配件和部件', '🔧', 8);

-- Insert sample products (示例产品数据)
INSERT INTO products (category_id, name_en, name_zh, slug, series, model_number, description_en, description_zh, features_en, is_featured) VALUES
((SELECT id FROM categories WHERE slug = 'mccb'), 
 'ECHSTM6 Series MCCB', 'ECHSTM6系列塑壳断路器', 'echstm6-mccb', 'ECHSTM6', 'ECHSTM6-125~1250A',
 'Thermomagnetic and Electronic MCCB with frame sizes 125A-1250A, breaking capacity up to 85kA',
 '热磁式和电子式塑壳断路器，框架规格125A-1250A，分断能力高达85kA',
 ARRAY['Frame size: 125A-1250A', 'Breaking capacity: up to 85kA', 'IoT smart models available', 'IEC/GB certified'], true),

((SELECT id FROM categories WHERE slug = 'mcb'),
 'ECHMCB Series MCB', 'ECHMCB系列小型断路器', 'echmcb-mcb', 'ECHMCB', 'ECHMCB-1P~4P',
 'Miniature Circuit Breakers for residential and commercial applications, includes RCBO and RCCB',
 '住宅和商业应用小型断路器，包含RCBO和RCCB',
 ARRAY['1P-4P configurations', 'Type B RCBO for DC detection', 'RCCB available', 'Compact design'], true),

((SELECT id FROM categories WHERE slug = 'energy-storage'),
 'ECH-ESS Energy Storage System', 'ECH-ESS能源储存系统', 'ech-ess', 'ECH-ESS', 'ECH-ESS-100~500kW',
 'Complete turnkey energy storage solutions including grid-forming PCS, BMU, EMS',
 '完整的交钥匙能源储存解决方案，包含组网型PCS、BMU、EMS',
 ARRAY['Grid-forming PCS', 'Battery Management Unit (BMU)', 'Energy Management System (EMS)', 'Containerized solutions available'], true);

-- Insert site config (网站配置)
INSERT INTO site_config (config_key, config_value, config_type, description) VALUES
('site_name_en', 'ECH-ST Electrics', 'text', 'Website name in English'),
('site_name_zh', 'ECH-ST电气', 'text', 'Website name in Chinese'),
('contact_email', 'sales@ech-st.com', 'text', 'Contact email'),
('contact_phone', '+86 13851615796', 'text', 'Contact phone'),
('contact_wechat', '13851615796', 'text', 'WeChat number'),
('address_wenzhou', 'No. 888, Industrial Zone, Wenzhou, Zhejiang, China', 'text', 'Wenzhou factory address'),
('address_nanjing', 'Nanjing, Jiangsu, China', 'text', 'Nanjing supply chain center'),
('years_experience', '20', 'number', 'Years of experience'),
('export_countries', '50', 'number', 'Number of export countries'),
('product_models', '1000', 'number', 'Number of product models');

-- Create update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_updated_at BEFORE UPDATE ON knowledge_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();