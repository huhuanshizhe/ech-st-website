'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Play, Video } from 'lucide-react';
import { useState } from 'react';

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

export default function FactorySection({ locale }: { locale: string }) {
  const t = useTranslations('about.facilities');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const currentLocale = useLocale();

  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="card group cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
              style={{ animationDelay: `${index * 100}ms` }}
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

        {/* Factory Image */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/factory/factory-main.jpg"
            alt={locale === 'zh' ? 'ECH-ST工厂全景' : 'ECH-ST Factory Overview'}
            className="w-full h-auto"
          />
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
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}