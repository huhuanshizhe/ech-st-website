'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/auth';
import {
  Search, Plus, Edit, Trash2, Image, Star, Package,
  ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

interface Product {
  id: string;
  category_id: string;
  name: { en: string; zh: string };
  model: string;
  description: { en: string; zh: string } | null;
  featured: boolean;
  images: string[];
  category: { name: { en: string; zh: string } } | null;
}

interface ProductList {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '12');
      if (search) params.append('search', search);

      const data = await apiRequest(`/products?${params.toString()}`);
      setProducts(data);
    } catch (error) {
      toast.error('加载产品列表失败');
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    setPage(1);
    loadProducts();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await apiRequest(`/admin/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ featured }),
      });
      toast.success(featured ? '已设为推荐' : '已取消推荐');
      loadProducts();
    } catch (error) {
      toast.error('操作失败');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('确定要删除此产品吗？')) return;
    try {
      await apiRequest(`/admin/products/${id}`, { method: 'DELETE' });
      toast.success('产品已删除');
      loadProducts();
    } catch (error) {
      toast.error('删除失败');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
          <p className="text-gray-500 mt-1">管理网站所有产品信息</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加产品
        </Link>
      </div>

      {/* Search */}
      <div className="card-admin">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="搜索产品型号或名称..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            搜索
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products?.data.map((product) => (
            <div key={product.id} className="card-admin overflow-hidden">
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 relative -mx-6 -mt-6 mb-4">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name.zh || product.name.en}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    推荐
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="text-sm text-primary-600 font-medium">{product.model}</div>
                <h3 className="font-medium text-gray-900">{product.name.zh || product.name.en}</h3>
                <div className="text-sm text-gray-500">
                  分类: {product.category?.name?.zh || product.category?.name?.en || '未分类'}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/dashboard/products/edit/${product.id}`}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => toggleFeatured(product.id, !product.featured)}
                  className={clsx(
                    'p-2 rounded-lg',
                    product.featured
                      ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  <Star className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {products?.data.length === 0 && (
        <div className="card-admin text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无产品数据</p>
          <Link
            href="/dashboard/products/new"
            className="inline-block mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            添加第一个产品
          </Link>
        </div>
      )}

      {/* Pagination */}
      {products && products.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">共 {products.total} 个产品</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm">第 {page} / {products.totalPages} 页</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === products.totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}