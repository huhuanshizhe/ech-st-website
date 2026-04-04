# ECH-ST 网站部署指南

本文档将指导您完成 ECH-ST 网站的完整部署流程。

---

## 📋 部署概览

| 组件 | 平台 | 预计地址 |
|------|------|---------|
| 前台网站 | Vercel | https://ech-st-website.vercel.app |
| 后端 API | Render | https://ech-st-api.onrender.com |
| 管理后台 | Vercel | https://ech-st-admin.vercel.app |
| 数据库 | Supabase | 已创建 |

---

## 第一部分：部署后端 API 到 Render

### 步骤 1：注册 Render 账号

1. 访问 https://render.com
2. 点击 "Get Started" 注册账号
3. 建议使用 GitHub 登录（方便后续连接仓库）

### 步骤 2：创建 PostgreSQL 数据库

1. 登录 Render 后，点击 "New +" 按钮
2. 选择 "PostgreSQL"
3. 填写信息：
   - **Name**: `ech-st-db`
   - **Region**: Singapore (离中国最近)
   - **Plan**: Free
4. 点击 "Create Database"
5. 创建完成后，复制 **Internal Database URL**（稍后使用）

### 步骤 3：部署后端服务

1. 点击 "New +" 按钮
2. 选择 "Web Service"
3. 连接 GitHub 仓库：
   - 点击 "Connect account" 授权 GitHub
   - 选择 `huhuanshizhe/ech-st-website` 仓库
4. 配置服务：
   - **Name**: `ech-st-api`
   - **Region**: Singapore
   - **Branch**: master
   - **Root Directory**: `packages/api`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`
   - **Plan**: Free
5. 添加环境变量（Advanced → Add Environment Variable）：
   - `DATABASE_TYPE` = `postgres`
   - `DATABASE_URL` = （粘贴之前复制的数据库 URL）
   - `JWT_SECRET` = `ech-st-2024-super-secret-key-change-me`
6. 点击 "Deploy Web Service"
7. 等待部署完成（约 5-10 分钟）

### 步骤 4：验证后端部署

部署完成后，访问：
- `https://ech-st-api.onrender.com` - 应显示 API 信息
- `https://ech-st-api.onrender.com/docs` - API 文档

---

## 第二部分：部署管理后台到 Vercel

### 步骤 1：安装 Vercel CLI（如未安装）

```bash
npm install -g vercel
```

### 步骤 2：登录 Vercel

```bash
vercel login
```

### 步骤 3：部署管理后台

```bash
cd ech-st-website/apps/admin
vercel --prod
```

按提示操作：
1. 选择 "Link to existing project" 或创建新项目
2. Project name: `ech-st-admin`
3. 确认设置

### 步骤 4：配置环境变量

在 Vercel Dashboard 中：
1. 进入 `ech-st-admin` 项目
2. Settings → Environment Variables
3. 添加：
   - `NEXT_PUBLIC_API_URL` = `https://ech-st-api.onrender.com/api`
4. 重新部署

---

## 第三部分：更新前台 API 地址

如果需要前台连接生产环境 API：

1. 在 Vercel Dashboard 进入 `ech-st-website` 项目
2. Settings → Environment Variables
3. 添加/更新：
   - `NEXT_PUBLIC_API_URL` = `https://ech-st-api.onrender.com/api`
4. 重新部署

---

## 第四部分：配置自定义域名（可选）

### 前台网站域名

1. 在 Vercel Dashboard 进入 `ech-st-website` 项目
2. Settings → Domains
3. 添加域名：`ech-st.com`
4. 按提示在域名服务商处配置 DNS：
   - A 记录：`76.76.21.21`
   - 或 CNAME：`cname.vercel-dns.com`
5. 等待 DNS 生效

### 管理后台域名

1. 在 Vercel Dashboard 进入 `ech-st-admin` 项目
2. Settings → Domains
3. 添加域名：`admin.ech-st.com`
4. 配置 DNS 同上

### 后端 API 域名

Render 免费计划不支持自定义域名，使用默认域名即可。

---

## 🔐 创建管理员账号

后端部署成功后，需要在数据库中创建管理员账号。

### 方法 1：通过 Supabase Dashboard

1. 登录 Supabase Dashboard
2. 进入 SQL Editor
3. 执行：

```sql
INSERT INTO admin_users (id, email, password_hash, name, role, is_active)
VALUES (
  gen_random_uuid(),
  'admin@ech-st.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4wqmCqOI.JK8h0aS',
  '系统管理员',
  'admin',
  true
);
```

默认密码：`admin123`

### 方法 2：通过 Render Shell

1. 进入 Render Dashboard
2. 选择 `ech-st-api` 服务
3. 点击 "Shell" 标签
4. 执行 Python 脚本创建管理员

---

## ✅ 部署检查清单

- [ ] 后端 API 已部署到 Render
- [ ] 后端 API 可以访问 `/docs`
- [ ] 管理后台已部署到 Vercel
- [ ] 管理后台可以登录
- [ ] 前台网站正常运行
- [ ] 自定义域名已配置（可选）

---

## 🆘 常见问题

### Q: 后端部署失败？
A: 检查 Build Log，通常是依赖问题。确保 `requirements.txt` 完整。

### Q: 数据库连接失败？
A: 检查 `DATABASE_URL` 环境变量是否正确。注意使用 Render 的 Internal Database URL。

### Q: 管理后台登录失败？
A: 确认 `NEXT_PUBLIC_API_URL` 配置正确，且后端 API 已启动。

### Q: 免费计划有限制吗？
A: 
- Render 免费计划：750 小时/月，服务会在 15 分钟无请求后休眠
- Vercel 免费计划：100GB 带宽/月，足够中小网站使用
- Supabase 免费计划：500MB 数据库，5GB 带宽

---

## 📞 获取帮助

如遇到问题，请提供：
1. 错误信息截图
2. 相关服务的日志
3. 执行的具体步骤

祝部署顺利！🎉