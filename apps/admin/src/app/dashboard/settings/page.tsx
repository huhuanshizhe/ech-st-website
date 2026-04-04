'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/auth';
import { Save, Globe, Mail, Phone, MapPin, FileText, Image } from 'lucide-react';
import toast from 'react-hot-toast';

interface SiteSettings {
  site_name: { en: string; zh: string };
  site_description: { en: string; zh: string };
  contact_email: string;
  contact_phone: string;
  contact_address: { en: string; zh: string };
  social_links: {
    linkedin: string;
    facebook: string;
    wechat: string;
  };
  seo: {
    default_title: { en: string; zh: string };
    default_description: { en: string; zh: string };
    default_keywords: { en: string; zh: string };
    og_image: string;
  };
  geo: {
    latitude: string;
    longitude: string;
    region: string;
    city: string;
    country: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: { en: 'ECH-ST Electrics', zh: 'ECH-ST电气' },
    site_description: {
      en: 'Professional Circuit Protection & Smart Energy Solutions',
      zh: '专业电路保护与智能能源解决方案'
    },
    contact_email: 'sales@ech-st.com',
    contact_phone: '+86 13851615796',
    contact_address: {
      en: 'Wenzhou: R&D & Factory | Nanjing: Supply Chain',
      zh: '温州：研发中心、制造工厂 | 南京：供应链管理'
    },
    social_links: {
      linkedin: '',
      facebook: '',
      wechat: '',
    },
    seo: {
      default_title: {
        en: 'ECH-ST Electrics | Professional Circuit Protection & Energy Storage Solutions',
        zh: 'ECH-ST电气 | 专业电路保护与储能解决方案'
      },
      default_description: {
        en: 'ECH-ST Electrics is a leading manufacturer of circuit breakers, protection devices, and energy storage systems. Quality electrical solutions for global markets.',
        zh: 'ECH-ST电气是断路器、保护器件及储能系统的领先制造商，为全球市场提供优质电气解决方案。'
      },
      default_keywords: {
        en: 'circuit breaker, MCCB, MCB, SPD, energy storage, electrical protection',
        zh: '断路器, 塑壳断路器, 小型断路器, 浪涌保护器, 储能系统, 电气保护'
      },
      og_image: '/images/og-image.jpg',
    },
    geo: {
      latitude: '27.9944',
      longitude: '120.6994',
      region: 'Zhejiang',
      city: 'Wenzhou',
      country: 'CN',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await apiRequest('/admin/settings');
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      // 使用默认设置
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await apiRequest('/admin/settings', {
        method: 'POST',
        body: JSON.stringify(settings),
      });
      toast.success('设置已保存！');
    } catch (error) {
      toast.error('保存失败：' + (error as any).message);
    }
    setIsLoading(false);
  };

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let obj: any = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i] as keyof typeof obj];
      }
      obj[keys[keys.length - 1] as keyof typeof obj] = value;
      return newSettings;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">网站设置</h1>
          <p className="text-gray-500 mt-1">管理网站的基本信息、SEO和地理信息</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isLoading ? '保存中...' : '保存设置'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {[
            { id: 'basic', label: '基本信息', icon: Globe },
            { id: 'contact', label: '联系方式', icon: Mail },
            { id: 'seo', label: 'SEO设置', icon: FileText },
            { id: 'geo', label: '地理信息', icon: MapPin },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="card-admin">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">网站基本信息</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站名称（中文）
                </label>
                <input
                  type="text"
                  value={settings.site_name.zh}
                  onChange={(e) => updateSetting('site_name.zh', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站名称（英文）
                </label>
                <input
                  type="text"
                  value={settings.site_name.en}
                  onChange={(e) => updateSetting('site_name.en', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站描述（中文）
                </label>
                <textarea
                  value={settings.site_description.zh}
                  onChange={(e) => updateSetting('site_description.zh', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站描述（英文）
                </label>
                <textarea
                  value={settings.site_description.en}
                  onChange={(e) => updateSetting('site_description.en', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">联系方式</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-2" />
                  联系邮箱
                </label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => updateSetting('contact_email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-2" />
                  联系电话
                </label>
                <input
                  type="text"
                  value={settings.contact_phone}
                  onChange={(e) => updateSetting('contact_phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  地址（中文）
                </label>
                <textarea
                  value={settings.contact_address.zh}
                  onChange={(e) => updateSetting('contact_address.zh', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  地址（英文）
                </label>
                <textarea
                  value={settings.contact_address.en}
                  onChange={(e) => updateSetting('contact_address.en', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn 链接
                </label>
                <input
                  type="text"
                  value={settings.social_links.linkedin}
                  onChange={(e) => updateSetting('social_links.linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  微信号
                </label>
                <input
                  type="text"
                  value={settings.social_links.wechat}
                  onChange={(e) => updateSetting('social_links.wechat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">SEO 设置</h3>
            <p className="text-sm text-gray-500">配置网站的搜索引擎优化信息</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  默认标题（中文）
                </label>
                <input
                  type="text"
                  value={settings.seo.default_title.zh}
                  onChange={(e) => updateSetting('seo.default_title.zh', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-400 mt-1">建议长度：20-30个中文字符</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  默认标题（英文）
                </label>
                <input
                  type="text"
                  value={settings.seo.default_title.en}
                  onChange={(e) => updateSetting('seo.default_title.en', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-400 mt-1">建议长度：50-60个英文字符</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  默认描述（中文）
                </label>
                <textarea
                  value={settings.seo.default_description.zh}
                  onChange={(e) => updateSetting('seo.default_description.zh', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-400 mt-1">建议长度：70-100个中文字符</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  默认描述（英文）
                </label>
                <textarea
                  value={settings.seo.default_description.en}
                  onChange={(e) => updateSetting('seo.default_description.en', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-400 mt-1">建议长度：150-160个英文字符</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  关键词（中文，逗号分隔）
                </label>
                <input
                  type="text"
                  value={settings.seo.default_keywords.zh}
                  onChange={(e) => updateSetting('seo.default_keywords.zh', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  关键词（英文，逗号分隔）
                </label>
                <input
                  type="text"
                  value={settings.seo.default_keywords.en}
                  onChange={(e) => updateSetting('seo.default_keywords.en', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Image className="w-4 h-4 inline mr-2" />
                  默认分享图片 (OG Image)
                </label>
                <input
                  type="text"
                  value={settings.seo.og_image}
                  onChange={(e) => updateSetting('seo.og_image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="/images/og-image.jpg"
                />
                <p className="text-xs text-gray-400 mt-1">建议尺寸：1200x630px</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'geo' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">地理信息 (GEO)</h3>
            <p className="text-sm text-gray-500">配置网站的地理位置信息，用于本地SEO</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  纬度 (Latitude)
                </label>
                <input
                  type="text"
                  value={settings.geo.latitude}
                  onChange={(e) => updateSetting('geo.latitude', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="27.9944"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  经度 (Longitude)
                </label>
                <input
                  type="text"
                  value={settings.geo.longitude}
                  onChange={(e) => updateSetting('geo.longitude', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="120.6994"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  省/州/地区
                </label>
                <input
                  type="text"
                  value={settings.geo.region}
                  onChange={(e) => updateSetting('geo.region', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Zhejiang"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  城市
                </label>
                <input
                  type="text"
                  value={settings.geo.city}
                  onChange={(e) => updateSetting('geo.city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Wenzhou"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  国家代码
                </label>
                <input
                  type="text"
                  value={settings.geo.country}
                  onChange={(e) => updateSetting('geo.country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="CN"
                />
                <p className="text-xs text-gray-400 mt-1">ISO 3166-1 alpha-2 国家代码</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 提示</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 地理信息将用于 Schema.org 的 Organization 和 LocalBusiness 标记</li>
                <li>• 准确的地理信息有助于本地搜索排名</li>
                <li>• 可以在 Google Maps 上查找您的经纬度坐标</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}