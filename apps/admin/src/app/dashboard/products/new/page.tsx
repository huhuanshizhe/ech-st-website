'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/auth';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: { en: string; zh: string };
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    category_id: '',
    name_en: '',
    name_zh: '',
    model: '',
    slug: '',
    description_en: '',
    description_zh: '',
    specifications_en: '',
    specifications_zh: '',
    featured: false,
    images: '',
    pdf_url: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await apiRequest('/categories');
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    } catch (error) {
      toast.error('加载分类失败');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        category_id: formData.category_id,
        name: {
          en: formData.name_en,
          zh: formData.name_zh,
        },
        model: formData.model,
        slug: formData.slug || formData.model.toLowerCase().replace(/\s+/g, '-'),
        description: {
          en: formData.description_en,
          zh: formData.description_zh,
        },
        specifications: {
          en: formData.specifications_en,
          zh: formData.specifications_zh,
        },
        featured: formData.featured,
        images: formData.images.split('\n').filter(url => url.trim()),
        pdf_url: formData.pdf_url,
      };

      await apiRequest('/admin/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });

      toast.success('产品创建成功！');
      router.push('/dashboard/products');
    } catch (error) {
      toast.error('创建失败：' + (error as any).message);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">添加新产品</h1>
          <p className="text-gray-500 mt-1">填写产品信息以添加到网站</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card-admin">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                所属分类 *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name.zh} - {cat.name.en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                产品型号 *
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="如：ECHSTM6"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                英文名称 *
              </label>
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                中文名称 *
              </label>
              <input
                type="text"
                value={formData.name_zh}
                onChange={(e) => setFormData(prev => ({ ...prev, name_zh: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug (URL 友好)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="如：molded-case-circuit-breaker"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="card-admin">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">描述信息</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                英文描述
              </label>
              <textarea
                value={formData.description_en}
                onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                中文描述
              </label>
              <textarea
                value={formData.description_zh}
                onChange={(e) => setFormData(prev => ({ ...prev, description_zh: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                英文规格
              </label>
              <textarea
                value={formData.specifications_en}
                onChange={(e) => setFormData(prev => ({ ...prev, specifications_en: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="如：Frame: 125A-1250A, Breaking Capacity: 25-85kA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                中文规格
              </label>
              <textarea
                value={formData.specifications_zh}
                onChange={(e) => setFormData(prev => ({ ...prev, specifications_zh: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="如：框架：125A-1250A，分断能力：25-85kA"
              />
            </div>
          </div>
        </div>

        {/* Media & Settings */}
        <div className="card-admin">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">媒体与设置</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                图片 URL 列表 (每行一个)
              </label>
              <textarea
                value={formData.images}
                onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={4}
                placeholder="/images/products/mccb/product1.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PDF 数据表 URL
              </label>
              <input
                type="text"
                value={formData.pdf_url}
                onChange={(e) => setFormData(prev => ({ ...prev, pdf_url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="/documents/products/xxx.pdf"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                设为推荐产品 (显示在首页)
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isLoading ? '保存中...' : '保存产品'}
          </button>
        </div>
      </form>
    </div>
  );
}
