# ECH-ST Electrics 外贸智能体网站

专业电路保护与储能解决方案提供商网站系统

## 项目结构

```
ech-st-website/
├── apps/
│   ├── web/              # 前端网站 (Next.js 14)
│   │   - 多语言支持 (中文/英文)
│   │   - 产品展示、公司介绍、询盘系统
│   │   - AI智能客服集成
│   │
│   └── admin/            # 管理后台 (Next.js 14)
│   │   - 中文界面
│   │   - 产品管理、询盘管理、用户管理
│   │
├── packages/
│   ├── api/              # 后端API (FastAPI)
│   │   - 产品、分类、询盘、聊天等API
│   │   - JWT认证
│   │   - 邮件通知服务
│   │
│   ├── database/         # 数据库模型
│   │   - PostgreSQL + SQLAlchemy
│   │   - 种子数据脚本
│   │
│   └── shared/           # 共享代码
│
└── README.md
```

## 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl (中/英双语)
- **状态管理**: Zustand

### 后端
- **框架**: FastAPI (Python)
- **数据库**: PostgreSQL + SQLAlchemy
- **认证**: JWT
- **邮件**: SMTP

### AI客服
- RAG架构 (检索增强生成)
- 预定义知识库
- 多语言对话支持

## 快速开始

### 1. 安装依赖

```bash
# 前端依赖
cd apps/web
npm install

# 后端依赖
cd packages/api
pip install -r requirements.txt
```

### 2. 配置数据库

创建 PostgreSQL 数据库:
```sql
CREATE DATABASE echst_db;
```

运行种子脚本初始化数据:
```bash
cd packages/database/seeds
python seed_script.py
```

### 3. 启动服务

```bash
# 启动前端 (端口 3000)
cd apps/web
npm run dev

# 启动管理后台 (端口 3001)
cd apps/admin
npm run dev

# 启动API服务 (端口 8000)
cd packages/api
python -m uvicorn main:app --reload
```

### 4. 访问系统

- **前端网站**: http://localhost:3000
- **管理后台**: http://localhost:3001
- **API文档**: http://localhost:8000/docs

## 管理后台登录

默认管理员账户:
- 邶箱: `admin@ech-st.com`
- 密码: `admin123`

## 产品分类

基于客户提供的资料，系统包含以下产品分类:

1. **塑壳断路器 (MCCB)** - 热磁式、电子式、物联网智能型、新能源专用
2. **小型断路器 (MCB)** - 标准MCB、漏电断路器RCBO、漏电保护器RCCB
3. **电路保护器件** - 浪涌保护器SPD、压敏电阻MOV
4. **储能系统** - 一体式储能、工商业储能、太阳能储能
5. **智能设备** - 智能跌落式熔断器、柱上断路器
6. **RS485通信芯片**
7. **断路器附件**

## 客户资料映射

客户提供的所有资料已导入系统:

| 资料类型 | 文件位置 | 系统映射 |
|---------|---------|---------|
| 公司介绍 | ECH-ST.pdf, LOGO.png, factory.jpg | 关于我们页面 |
| 产品PDF | Main Products/各分类/*.pdf | 产品详情页下载 |
| 产品图片 | *.png, *.jpg | 产品展示图片 |
| 工厂视频 | *.mp4 | 关于我们-工厂展示 |
| 联系方式 | Contact Information/* | 联系我们页面 |

## 环境变量配置

### 前端 (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 后端 (.env)
```
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/echst_db
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
ADMIN_EMAIL=sales@ech-st.com
```

## 部署建议

### Vercel (前端)
```bash
npm run build
vercel deploy
```

### Railway/Fly.io (后端)
```bash
railway deploy
```

### 数据库
推荐使用 Supabase 或自建 PostgreSQL

---

ECH-ST Electrics - 专业电路保护与储能解决方案提供商
sales@ech-st.com | +86 13851615796