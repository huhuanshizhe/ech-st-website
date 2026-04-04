'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/auth';
import {
  Package,
  Mail,
  Tags,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DashboardStats {
  total_products: number;
  total_categories: number;
  pending_inquiries: number;
  total_inquiries: number;
  recent_inquiries: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await apiRequest('/admin/dashboard');
      setStats(data);
    } catch (error) {
      toast.error('加载统计数据失败');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-gray-500 mt-1">欢迎回来，查看网站运营概况</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="card-admin">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">产品总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.total_products || 0}
              </p>
            </div>
            <Package className="w-12 h-12 text-primary-200" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-primary-600">
            <a href="/dashboard/products" className="flex items-center gap-1 hover:underline">
              管理产品 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Total Categories */}
        <div className="card-admin">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">产品分类</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.total_categories || 0}
              </p>
            </div>
            <Tags className="w-12 h-12 text-green-200" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-green-600">
            <a href="/dashboard/categories" className="flex items-center gap-1 hover:underline">
              管理分类 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">待处理询盘</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats?.pending_inquiries || 0}
              </p>
            </div>
            <AlertCircle className="w-12 h-12 text-white/40" />
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center text-sm text-white/80">
            <a href="/dashboard/inquiries?status=pending" className="flex items-center gap-1 hover:text-white">
              立即处理 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="card-admin">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">询盘总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.total_inquiries || 0}
              </p>
            </div>
            <Mail className="w-12 h-12 text-amber-200" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-amber-600">
            <a href="/dashboard/inquiries" className="flex items-center gap-1 hover:underline">
              查看全部 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="card-admin">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">最新询盘</h2>
          <a
            href="/dashboard/inquiries"
            className="text-sm text-primary-600 hover:underline flex items-center gap-1"
          >
            查看全部 <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {stats?.recent_inquiries && stats.recent_inquiries.length > 0 ? (
          <div className="space-y-3">
            {stats.recent_inquiries.map((inquiry: any) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {inquiry.contact_name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {inquiry.contact_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {inquiry.company_name || inquiry.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      inquiry.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : inquiry.status === 'processing'
                        ? 'bg-blue-100 text-blue-700'
                        : inquiry.status === 'replied'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {inquiry.status === 'pending' ? '待处理' : 
                     inquiry.status === 'processing' ? '处理中' :
                     inquiry.status === 'replied' ? '已回复' : '已关闭'}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(inquiry.created_at).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            暂无询盘数据
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/dashboard/products/new"
          className="card-admin hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <Package className="w-8 h-8 text-primary-600" />
          <div>
            <div className="font-medium text-gray-900">添加新产品</div>
            <div className="text-sm text-gray-500">发布新的产品信息</div>
          </div>
        </a>
        <a
          href="/dashboard/inquiries?status=pending"
          className="card-admin hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <div className="font-medium text-gray-900">处理询盘</div>
            <div className="text-sm text-gray-500">回复客户询盘</div>
          </div>
        </a>
        <a
          href="/dashboard/settings"
          className="card-admin hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <Settings className="w-8 h-8 text-gray-600" />
          <div>
            <div className="font-medium text-gray-900">系统设置</div>
            <div className="text-sm text-gray-500">管理网站配置</div>
          </div>
        </a>
      </div>
    </div>
  );
}