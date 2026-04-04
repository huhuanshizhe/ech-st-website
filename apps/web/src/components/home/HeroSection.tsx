'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, Zap, Shield, Battery } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: '/images/hero/hero-1.jpg',
    icon: Shield,
    color: 'primary',
  },
  {
    image: '/images/hero/hero-2.jpg',
    icon: Zap,
    color: 'accent',
  },
  {
    image: '/images/hero/hero-3.jpg',
    icon: Battery,
    color: 'green',
  },
];

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('home.hero');

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="absolute inset-0 h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900"
              style={{
                background: 'linear-gradient(135deg, rgba(30,58,138,0.7) 0%, rgba(15,23,42,0.6) 100%)',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-white font-medium mb-8 max-w-2xl drop-shadow-md">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn-primary group"
              >
                {t('cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">20+</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '年行业经验' : 'Years Experience'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '出口国家' : 'Export Countries'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '产品型号' : 'Product Models'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">ISO</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '国际认证' : 'Certified'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}