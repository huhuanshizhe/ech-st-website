'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/auth';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Mail,
  Phone,
  Building,
  Globe,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

interface Inquiry {
  id: string;
  company_name: string | null;
  contact_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  products_text: string | null;
  message: string;
  status: string;
  source: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface InquiryList {
  data: Inquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const statusLabels = {
  pending: '待处理',
  processing: '处理中',
  replied: '已回复',
  closed: '已关闭',
};

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-600',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    loadInquiries();
  }, [page, statusFilter]);

  const loadInquiries = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '10');
      if (statusFilter) params.append('status', statusFilter);
      if (search) params.append('search', search);

      const data = await apiRequest(`/inquiries?${params.toString()}`);
      setInquiries(data);
    } catch (error) {
      toast.error('加载询盘列表失败');
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    setPage(1);
    loadInquiries();
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await apiRequest(`/inquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success('状态已更新');
      loadInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({
          ...selectedInquiry,
          status: newStatus,
        });
      }
    } catch (error) {
      toast.error('更新状态失败');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">询盘管理</h1>
        <p className="text-gray-500 mt-1">管理客户询盘，追踪处理进度</p>
      </div>

      {/* Filters */}
      <div className="card-admin">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="搜索公司、联系人、邮箱..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">全部状态</option>
            <option value="pending">待处理</option>
            <option value="processing">处理中</option>
            <option value="replied">已回复</option>
            <option value="closed">已关闭</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            搜索
          </button>
        </div>
      </div>

      {/* Inquiry List */}
      <div className="card-admin">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : inquiries?.data.length > 0 ? (
          <div className="space-y-3">
            {inquiries.data.map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedInquiry(inquiry)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-lg">
                      {inquiry.contact_name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {inquiry.contact_name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      {inquiry.company_name && (
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {inquiry.company_name}
                        </span>
                      )}
                      <span>{inquiry.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={clsx(
                      'px-3 py-1 rounded-full text-sm',
                      statusColors[inquiry.status as keyof typeof statusColors]
                    )}
                  >
                    {statusLabels[inquiry.status as keyof typeof statusLabels]}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(inquiry.created_at).toLocaleDateString('zh-CN')}
                  </span>
                  <Eye className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            暂无询盘数据
          </div>
        )}

        {/* Pagination */}
        {inquiries && inquiries.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              共 {inquiries.total} 条询盘
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm">
                第 {page} / {inquiries.totalPages} 页
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === inquiries.totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">询盘详情</h2>
                <p className="text-sm text-gray-500 mt-1">
                  ID: {selectedInquiry.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{selectedInquiry.company_name || '未提供'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{selectedInquiry.contact_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${selectedInquiry.email}`} className="text-primary-600 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{selectedInquiry.phone || '未提供'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span>{selectedInquiry.country || '未提供'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{new Date(selectedInquiry.created_at).toLocaleString('zh-CN')}</span>
                </div>
              </div>

              {/* Products */}
              {selectedInquiry.products_text && (
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="text-sm text-primary-600 font-medium mb-1">感兴趣的产品</div>
                  <div className="text-gray-700">{selectedInquiry.products_text}</div>
                </div>
              )}

              {/* Message */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 font-medium mb-1">留言内容</div>
                <div className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</div>
              </div>

              {/* Notes */}
              {selectedInquiry.notes && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-600 font-medium mb-1">备注</div>
                  <div className="text-gray-700">{selectedInquiry.notes}</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-100 flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus(selectedInquiry.id, 'processing')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                标记处理中
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry.id, 'replied')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                标记已回复
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry.id, 'closed')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                关闭询盘
              </button>
              <a
                href={`mailto:${selectedInquiry.email}?subject=回复您的询盘 - ECH-ST Electrics`}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                发送邮件
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}