'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/auth';
import { Plus, Edit, Trash2, Package, ArrowUp, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: { en: string; zh: string };
  slug: string;
  description: { en: string; zh: string } | null;
  product_count: number;
  sort_order: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await apiRequest('/categories');
      setCategories(data);
    } catch (error) {
      toast.error('加载分类列表失败');
    }
    setIsLoading(false);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('确定要删除此分类吗？删除后该分类下的产品将失去分类。')) return;
    try {
      await apiRequest(`/admin/categories/${id}`, { method: 'DELETE' });
      toast.success('分类已删除');
      loadCategories();
    } catch (error) {
      toast.error('删除失败');
    }
  };

  const updateSortOrder = async (id: string, newOrder: number) => {
    try {
      await apiRequest(`/admin/categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ sort_order: newOrder }),
      });
      toast.success('排序已更新');
      loadCategories();
    } catch (error) {
      toast.error('更新失败');
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">分类管理</h1>
          <p className="text-gray-500 mt-1">管理产品分类和目录结构</p>
        </div>
        <Link
          href="/dashboard/categories/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加分类
        </Link>
      </div>

      {/* Categories Table */}
      <div className="card-admin overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">排序</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">产品数量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateSortOrder(category.id, category.sort_order - 1)}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-600 w-8 text-center">{index + 1}</span>
                      <button
                        onClick={() => updateSortOrder(category.id, category.sort_order + 1)}
                        disabled={index === categories.length - 1}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{category.name.zh}</div>
                      <div className="text-sm text-gray-500">{category.name.en}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{category.product_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/categories/${category.id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
