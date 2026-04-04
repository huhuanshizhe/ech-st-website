# ECH-ST 管理后台

ECH-ST 网站的管理后台系统，用于管理产品、分类、询盘等。

## 功能模块

### 1. 仪表板 (`/dashboard`)
- 显示网站统计数据
- 产品总数、分类总数
- 待处理询盘、询盘总数
- 最新询盘列表
- 快速操作入口

### 2. 产品管理 (`/dashboard/products`)
- 查看所有产品信息
- 添加新产品
- 编辑产品信息
- 删除产品
- 设置推荐产品
- 搜索和筛选

### 3. 分类管理 (`/dashboard/categories`)
- 查看产品分类
- 添加新分类
- 编辑分类信息
- 删除分类
- 调整分类排序

### 4. 询盘管理 (`/dashboard/inquiries`)
- 查看所有询盘
- 按状态筛选（待处理、处理中、已回复、已关闭）
- 更新询盘状态
- 添加备注
- 查看询盘详情

## 快速开始

### 开发环境

1. **启动后端 API**
```bash
cd ech-st-website/packages/api
python main.py
# 运行在 http://localhost:8000
```

2. **启动管理后台**
```bash
cd ech-st-website/apps/admin
npm run dev
# 运行在 http://localhost:3001
```

3. **访问后台**
- 打开浏览器访问：http://localhost:3001
- 使用管理员账号登录

### 管理员账号

**默认管理员账号：**
- 邮箱：`admin@ech-st.com`
- 密码：`admin123`

⚠️ **重要提示**：首次登录后请立即修改密码！

## API 文档

后端 API 使用 FastAPI 构建，完整文档请访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 主要 API 端点

#### 认证
- `POST /api/admin/login` - 管理员登录

#### 产品管理
- `GET /api/admin/products` - 获取产品列表
- `POST /api/admin/products` - 创建产品
- `GET /api/admin/products/{id}` - 获取产品详情
- `PATCH /api/admin/products/{id}` - 更新产品
- `DELETE /api/admin/products/{id}` - 删除产品

#### 分类管理
- `GET /api/admin/categories` - 获取分类列表
- `POST /api/admin/categories` - 创建分类
- `GET /api/admin/categories/{id}` - 获取分类详情
- `PATCH /api/admin/categories/{id}` - 更新分类
- `DELETE /api/admin/categories/{id}` - 删除分类

#### 询盘管理
- `GET /api/admin/inquiries` - 获取询盘列表
- `GET /api/admin/inquiries/{id}` - 获取询盘详情
- `PATCH /api/admin/inquiries/{id}` - 更新询盘

## 环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

生产环境配置：

```env
NEXT_PUBLIC_API_URL=https://api.ech-st.com/api
```

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **状态管理**: Zustand
- **UI 组件**: Tailwind CSS + Lucide Icons
- **表单处理**: React Hook Form
- **通知**: React Hot Toast
- **后端**: FastAPI (Python)
- **数据库**: SQLite (开发) / PostgreSQL (生产)

## 项目结构

```
apps/admin/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # 仪表板
│   │   │   ├── products/
│   │   │   │   ├── page.tsx      # 产品列表
│   │   │   │   └── new/
│   │   │   │       └── page.tsx  # 添加产品
│   │   │   ├── categories/
│   │   │   │   └── page.tsx      # 分类管理
│   │   │   └── inquiries/
│   │   │       └── page.tsx      # 询盘管理
│   │   ├── layout.tsx
│   │   └── page.tsx              # 登录页面
│   ├── lib/
│   │   └── auth.ts               # 认证工具
│   └── components/
│       └── Sidebar.tsx           # 侧边栏
├── .env.local
├── next.config.js
├── package.json
└── tailwind.config.ts
```

## 部署

### 1. 部署后端 API

后端需要部署到支持 Python 的平台：

**选项 A: Railway**
```bash
# 安装 Railway CLI
npm i -g @railway/cli

# 登录并创建项目
railway login
railway init

# 部署
railway up
```

**选项 B: Render**
```bash
# 在 Render 创建 Web Service
# 连接 GitHub 仓库
# 设置 Build Command: pip install -r requirements.txt
# 设置 Start Command: python main.py
```

**选项 C: Vercel Serverless**
需要修改为 Serverless Functions 结构

### 2. 部署管理后台

管理后台可以部署到 Vercel：

```bash
cd apps/admin
vercel --prod
```

### 3. 配置生产环境

在 Vercel 中设置环境变量：
- `NEXT_PUBLIC_API_URL`: 后端 API 的生产地址

## 安全建议

1. **修改默认密码**: 首次登录后立即修改
2. **使用 HTTPS**: 生产环境必须使用 HTTPS
3. **强化 JWT_SECRET**: 修改为强随机字符串
4. **限制访问 IP**: 如果可能，限制后台访问 IP
5. **启用日志**: 记录所有管理操作

## 开发规范

1. **代码风格**: 遵循 ESLint + Prettier 配置
2. **提交信息**: 使用语义化提交
3. **测试**: 重要功能需添加测试
4. **文档**: 更新代码时同步更新文档

## 常见问题

### Q: 忘记密码怎么办？
A: 直接修改数据库中的密码哈希值，或运行重置脚本

### Q: 如何添加新的管理员？
A: 在数据库中 `admin_users` 表插入新记录

### Q: 图片上传功能？
A: 当前版本使用图片 URL，后续版本将添加文件上传功能

## 更新日志

### v1.0.0 (2024-04-04)
- ✅ 初始版本发布
- ✅ 产品管理功能
- ✅ 分类管理功能
- ✅ 询盘管理功能
- ✅ 用户认证系统

## 联系方式

技术支持：sales@ech-st.com
