// 产品分类类型
export interface Category {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  slug: string;
  parentId?: string;
  description?: {
    en: string;
    zh: string;
  };
  image?: string;
  sortOrder: number;
  children?: Category[];
}

// 产品类型
export interface Product {
  id: string;
  categoryId: string;
  category?: Category;
  name: {
    en: string;
    zh: string;
  };
  slug: string;
  model: string;
  description?: {
    en: string;
    zh: string;
  };
  specifications?: Record<string, { en: string; zh: string }>;
  features?: {
    en: string[];
    zh: string[];
  };
  applications?: {
    en: string[];
    zh: string[];
  };
  images: string[];
  pdfUrl?: string;
  pdfUrls?: { name: string; url: string }[];
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 询盘类型
export interface Inquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  country?: string;
  productIds?: string[];
  products?: Product[];
  message: string;
  status: 'pending' | 'processing' | 'replied' | 'closed';
  source: 'website' | 'chat' | 'email';
  createdAt: string;
  updatedAt: string;
}

// 新闻/文章类型
export interface Article {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  slug: string;
  summary?: {
    en: string;
    zh: string;
  };
  content: {
    en: string;
    zh: string;
  };
  coverImage?: string;
  category: 'news' | 'blog' | 'technical';
  tags?: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// 公司信息类型
export interface CompanyInfo {
  name: {
    en: string;
    zh: string;
  };
  slogan?: {
    en: string;
    zh: string;
  };
  description?: {
    en: string;
    zh: string;
  };
  logo: string;
  email: string;
  phone: string;
  website: string;
  addresses: {
    type: 'headquarters' | 'factory' | 'office';
    address: {
      en: string;
      zh: string;
    };
  }[];
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    wechat?: string;
    youtube?: string;
  };
}

// 用户类型（后台管理）
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

// AI聊天消息类型
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  products?: Product[];
}

// 产品筛选参数
export interface ProductFilters {
  categoryId?: string;
  search?: string;
  featured?: boolean;
  sortBy?: 'name' | 'createdAt' | 'sortOrder';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// 分页响应
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// SEO元数据
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// 导航项
export interface NavItem {
  label: {
    en: string;
    zh: string;
  };
  href: string;
  children?: NavItem[];
}