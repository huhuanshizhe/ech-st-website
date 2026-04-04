'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, AlertCircle, Building, User, Globe, MessageSquare, FileText } from 'lucide-react';
import { clsx } from 'clsx';

const countries = [
  'China', 'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'South Korea', 
  'India', 'Australia', 'Brazil', 'Canada', 'Italy', 'Spain', 'Netherlands', 'Russia',
  'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Indonesia', 'Philippines', 'Other'
];

export default function ContactPageContent({ locale }: { locale: string }) {
  const t = useTranslations('contact');
  const currentLocale = useLocale();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    products: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 实际项目中会调用API
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          country: '',
          message: '',
          products: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-200">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {currentLocale === 'zh' ? '提交询盘' : 'Submit Inquiry'}
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  {t('form.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  {t('form.error')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Building className="w-4 h-4 text-gray-400" />
                    {t('form.companyName')}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={currentLocale === 'zh' ? '请输入公司名称' : 'Enter company name'}
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 text-gray-400" />
                    {t('form.contactName')}
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={currentLocale === 'zh' ? '请输入联系人姓名' : 'Enter contact name'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={currentLocale === 'zh' ? '请输入电子邮箱' : 'Enter email address'}
                  />
                </div>

                {/* Phone & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder={currentLocale === 'zh' ? '请输入电话号码' : 'Enter phone number'}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <Globe className="w-4 h-4 text-gray-400" />
                      {t('form.country')}
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">
                        {currentLocale === 'zh' ? '选择国家/地区' : 'Select country'}
                      </option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Products of Interest */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    {t('form.products')}
                  </label>
                  <input
                    type="text"
                    name="products"
                    value={formData.products}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={currentLocale === 'zh' ? '请输入感兴趣的产品型号（如：MCCB、MCB）' : 'Enter interested products (e.g., MCCB, MCB)'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    {t('form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder={currentLocale === 'zh' ? '请描述您的需求、数量、规格等信息...' : 'Describe your requirements, quantity, specifications...'}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={clsx(
                    'w-full btn-primary flex items-center justify-center gap-2',
                    isSubmitting && 'opacity-70 cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {currentLocale === 'zh' ? '提交中...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('info.title')}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">{t('info.email')}</div>
                    <a href="mailto:sales@ech-st.com" className="text-gray-600 hover:text-primary-600">
                      sales@ech-st.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">{t('info.phone')}</div>
                    <a href="tel:+8613851615796" className="text-gray-600 hover:text-primary-600">
                      +86 13851615796 (Ms. Huang)
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">{t('info.wechat')}</div>
                    <span className="text-gray-600">+86 13851615796</span>
                  </div>
                </div>
              </div>
              
              {/* WeChat QR Code */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <img
                    src="/images/contact/wechat-qr.png"
                    alt="WeChat QR Code"
                    className="w-24 h-24 mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    {currentLocale === 'zh' ? '扫码添加微信' : 'Scan to add WeChat'}
                  </p>
                </div>
              </div>
            </div>

            {/* Office Addresses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('offices.title')}</h2>
              
              <div className="space-y-4">
                {/* Wenzhou */}
                <div className="p-4 bg-primary-50 rounded-lg">
                  <div className="font-medium text-primary-700 mb-1">
                    {t('offices.rdCenter')}
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary-600" />
                    <span>
                      {currentLocale === 'zh'
                        ? '温州，浙江：研发中心、制造工厂、OEM工厂'
                        : 'Wenzhou, Zhejiang: R&D center, manufacturing and OEM factory'}
                    </span>
                  </div>
                </div>
                
                {/* Nanjing */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">
                    {t('offices.supplyChain')}
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                    <span>
                      {currentLocale === 'zh'
                        ? '南京，江苏：供应链管理'
                        : 'Nanjing, Jiangsu: Supply chain management'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Address Image */}
              <div className="mt-4">
                <img
                  src="/images/contact/address.png"
                  alt="Company Address"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}