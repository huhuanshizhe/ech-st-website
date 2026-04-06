# ECH-ST 网站 Vercel 部署指南

## 项目结构

这是一个 Monorepo 项目，包含三个独立的应用：

```
ech-st-website/
├── apps/
│   ├── web/          # 主站 (ech-st.com)
│   └── admin/        # 管理后台 (admin.ech-st.com)
├── packages/
│   └── api/          # 后端 API (api.ech-st.com)
└── vercel.json       # Vercel 部署配置
```

## 在 Vercel 上配置自动部署

### 步骤 1：确认 GitHub 仓库

确保您的代码已经推送到 GitHub：
- 仓库地址：https://github.com/huhuanshizhe/ech-st-website

### 步骤 2：推送代码到 GitHub

```bash
git add .
git commit -m "chore: 添加 Vercel 部署配置"
git push origin master
```

### 步骤 3：在 Vercel 导入项目

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **"Add New Project"**
3. 选择 **"Import Git Repository"**
4. 找到并选择 `huhuanshizhe/ech-st-website` 仓库
5. 点击 **"Import"**

### 步骤 4：配置三个项目

Vercel 会自动识别 Monorepo 结构。您需要创建**三个独立的项目**：

#### 项目 1：主站 (ech-st-website)
- **Name**: `ech-st-website`
- **Framework Preset**: Next.js
- **Root Directory**: 保持默认（根目录）
- **Build Command**: `npm run build --workspace=apps/web`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `npm install`
- **Environment Variables**:
  ```
  NEXT_PUBLIC_API_URL=https://api.ech-st.com/api
  NEXT_PUBLIC_SITE_URL=https://ech-st.com
  ```

#### 项目 2：管理后台 (ech-st-admin)
- **Name**: `ech-st-admin`
- **Framework Preset**: Next.js
- **Root Directory**: 保持默认（根目录）
- **Build Command**: `npm run build --workspace=apps/admin`
- **Output Directory**: `apps/admin/.next`
- **Install Command**: `npm install`
- **Environment Variables**:
  ```
  NEXT_PUBLIC_API_URL=https://api.ech-st.com/api
  NEXT_PUBLIC_ADMIN_URL=https://admin.ech-st.com
  ```

#### 项目 3：后端 API (ech-st-api)
- **Name**: `ech-st-api`
- **Framework Preset**: Other
- **Root Directory**: `packages/api`
- **Build Command**: `echo "No build needed"`
- **Output Directory**: 留空
- **Install Command**: `pip install -r requirements.txt`
- **Environment Variables**:
  ```
  DATABASE_URL=your_supabase_database_url
  SUPABASE_URL=your_supabase_project_url
  SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

### 步骤 5：配置自定义域名

在每个项目的 **Settings > Domains** 中配置：

#### 主站项目：
- `ech-st.com`
- `www.ech-st.com`

#### API 项目：
- `api.ech-st.com`

#### 管理后台项目：
- `admin.ech-st.com`

### 步骤 6：配置 DNS 记录

在您的域名注册商（阿里云万网）添加以下 DNS 记录：

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |
| CNAME | api | cname.vercel-dns.com |
| CNAME | admin | cname.vercel-dns.com |

### 步骤 7：删除旧项目（可选）

确认新部署成功后，可以在 Vercel Dashboard 删除之前创建的三个独立项目（api、admin 和没有连接 Git 的项目）。

## 自动部署流程

配置完成后：
1. 每次推送代码到 GitHub，Vercel 会自动构建和部署
2. 在主分支的更改会部署到**生产环境**
3. 在其他分支的更改会生成**预览部署**

## 环境变量说明

### 主站和管理后台需要：
- `NEXT_PUBLIC_API_URL` - API 地址
- `NEXT_PUBLIC_SITE_URL` - 主站 URL
- `DATABASE_URL` - Supabase 数据库连接

### API 需要：
- `DATABASE_URL` - Supabase PostgreSQL 连接字符串
- `SUPABASE_URL` - Supabase 项目 URL
- `SUPABASE_ANON_KEY` - Supabase 匿名密钥

## 测试部署

部署完成后，访问：
- 主站：https://ech-st.com
- 管理后台：https://admin.ech-st.com
- API 文档：https://api.ech-st.com/docs

## 故障排查

### 构建失败
检查 Vercel 的部署日志，常见问题：
- Node.js 版本不匹配
- 依赖安装失败
- 环境变量缺失

### API 500 错误
- 检查 Supabase 连接字符串
- 确认数据库表已创建
- 查看 API 日志

### 域名不生效
- DNS 记录可能需要几分钟到几小时传播
- 使用 `nslookup` 或 [DNS Checker](https://dnschecker.org/) 检查

## 联系支持

如有问题，请访问：
- [Vercel 文档](https://vercel.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
