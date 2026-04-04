'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Award, Target, Eye, Heart, Video, Play, BadgeCheck, LucideIcon } from 'lucide-react';
import { useState } from 'react';

type ColorKey = 'primary' | 'accent' | 'green' | 'purple';

const values: { key: string; icon: LucideIcon; color: ColorKey }[] = [
  { key: 'quality', icon: Award, color: 'primary' },
  { key: 'innovation', icon: Target, color: 'accent' },
  { key: 'integrity', icon: Heart, color: 'green' },
  { key: 'customer', icon: Eye, color: 'purple' },
];

const colorClasses: Record<ColorKey, string> = {
  primary: 'bg-primary-100 text-primary-600',
  accent: 'bg-amber-100 text-amber-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
};

const videos = [
  {
    id: 'mccb-workshop',
    title: { en: 'MCCB Manufacturing Workshop', zh: '塑壳断路器制造车间' },
    src: '/videos/mccb-workshop.mp4',
    poster: '/images/factory/mccb-workshop.jpg',
  },
  {
    id: 'mechanism',
    title: { en: 'Circuit Breaker Mechanism Production', zh: '断路器机构零件生产车间' },
    src: '/videos/mechanism-workshop.mp4',
    poster: '/images/factory/mechanism.jpg',
  },
  {
    id: 'injection',
    title: { en: 'Injection Molding Workshop', zh: '注塑制造车间' },
    src: '/videos/injection-workshop.mp4',
    poster: '/images/factory/injection.jpg',
  },
  {
    id: 'testing',
    title: { en: 'Testing Center', zh: '检测中心' },
    src: '/videos/testing-center.mp4',
    poster: '/images/factory/testing.jpg',
  },
];

const certifications = [
  { name: 'ISO 9001', desc: { en: 'Quality Management System', zh: '质量管理体系' } },
  { name: 'ISO 14001', desc: { en: 'Environmental Management', zh: '环境管理体系' } },
  { name: 'IEC Standards', desc: { en: 'International Electrotechnical', zh: '国际电工标准' } },
  { name: 'CE Certification', desc: { en: 'European Conformity', zh: '欧洲符合性认证' } },
  { name: 'UL Listed', desc: { en: 'Underwriters Laboratories', zh: '美国UL认证' } },
  { name: 'CCC', desc: { en: 'China Compulsory Certification', zh: '中国强制性认证' } },
];

export default function AboutPageContent({ locale }: { locale: string }) {
  const t = useTranslations('about');
  const currentLocale = useLocale();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-200">{t('subtitle')}</p>
        </div>
      </div>

      {/* Company Story */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('ourStory.title')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('ourStory.content')}
            </p>
            
            {/* Factory Image */}
            <img
              src="/images/factory/factory-main.jpg"
              alt={currentLocale === 'zh' ? 'ECH-ST工厂' : 'ECH-ST Factory'}
              className="rounded-xl shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            {/* Mission */}
            <div className="bg-primary-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-8 h-8 text-primary-600" />
                <h3 className="text-xl font-semibold text-primary-700">{t('mission.title')}</h3>
              </div>
              <p className="text-gray-600">{t('mission.content')}</p>
            </div>
            
            {/* Vision */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-8 h-8 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">{t('vision.title')}</h3>
              </div>
              <p className="text-gray-600">{t('vision.content')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{t('values.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.key} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className={`w-16 h-16 rounded-xl ${colorClasses[value.color]} flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(`values.${value.key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Factory Videos */}
      <div className="container-custom py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('facilities.title')}</h2>
          <p className="text-gray-600">{t('facilities.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="card group cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img
                  src={video.poster}
                  alt={currentLocale === 'zh' ? video.title.zh : video.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary-600 ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary-600" />
                  {currentLocale === 'zh' ? video.title.zh : video.title.en}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="max-w-4xl w-full bg-black rounded-xl overflow-hidden">
              <video
                src={videos.find(v => v.id === selectedVideo)?.src}
                poster={videos.find(v => v.id === selectedVideo)?.poster}
                controls
                autoPlay
                className="w-full"
              />
            </div>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('certifications.title')}</h2>
            <p className="text-gray-600">{t('certifications.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <BadgeCheck className="w-10 h-10 text-primary-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                <div className="text-gray-500 text-xs mt-1">
                  {currentLocale === 'zh' ? cert.desc.zh : cert.desc.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo & Smart Distribution */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-primary-50 rounded-xl p-8 text-center">
            <img
              src="/images/logo.png"
              alt="ECH-ST Logo"
              className="w-48 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-primary-700 mb-2">
              {currentLocale === 'zh' ? 'ECH-ST 电气' : 'ECH-ST Electrics'}
            </h3>
            <p className="text-gray-600">
              {currentLocale === 'zh' 
                ? '专业电路保护与储能解决方案提供商' 
                : 'Professional Circuit Protection & Energy Storage Solutions Provider'}
            </p>
          </div>
          
          <div>
            <img
              src="/images/factory/smart-distribution.jpg"
              alt={currentLocale === 'zh' ? '智能配电系统解决方案' : 'Smart Distribution System Solution'}
              className="rounded-xl shadow-lg w-full"
            />
            <p className="text-center text-gray-600 mt-4">
              {currentLocale === 'zh' ? '智能配电系统解决方案' : 'Smart Distribution System Solution'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}