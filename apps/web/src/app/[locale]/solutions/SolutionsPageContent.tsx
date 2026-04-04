'use client';

import { useTranslations } from 'next-intl';
import { Zap, Building2, Home, Sun, Wind, Battery, Factory, Shield } from 'lucide-react';

const solutions = [
  {
    icon: Sun,
    titleEn: 'New Energy',
    titleZh: '新能源',
    descriptionEn: 'Complete circuit protection solutions for photovoltaic, energy storage, and charging stations.',
    descriptionZh: '为光伏、储能、充电桩提供完整的电路保护解决方案。',
    features: [
      { en: 'DC Circuit Breakers', zh: '直流断路器' },
      { en: 'SPD Protection', zh: '浪涌保护器' },
      { en: 'Energy Storage Systems', zh: '储能系统' },
    ],
  },
  {
    icon: Factory,
    titleEn: 'Industrial Control',
    titleZh: '工业控制',
    descriptionEn: 'Reliable electrical protection for automation equipment and industrial systems.',
    descriptionZh: '为自动化设备和工业系统提供可靠的电气保护。',
    features: [
      { en: 'MCCB/MCB Series', zh: '塑壳/微型断路器' },
      { en: 'Motor Protection', zh: '电机保护' },
      { en: 'Control Systems', zh: '控制系统' },
    ],
  },
  {
    icon: Building2,
    titleEn: 'Smart Buildings',
    titleZh: '智能建筑',
    descriptionEn: 'Intelligent electrical solutions for commercial and residential buildings.',
    descriptionZh: '为商业和住宅建筑提供智能电气解决方案。',
    features: [
      { en: 'Smart Breakers', zh: '智能断路器' },
      { en: 'Energy Management', zh: '能源管理' },
      { en: 'Safety Protection', zh: '安全防护' },
    ],
  },
  {
    icon: Zap,
    titleEn: 'Power Distribution',
    titleZh: '电力配电',
    descriptionEn: 'Complete low-voltage distribution system protection solutions.',
    descriptionZh: '完整的低压配电系统保护解决方案。',
    features: [
      { en: 'Distribution Protection', zh: '配电保护' },
      { en: 'Surge Protection', zh: '浪涌防护' },
      { en: 'Monitoring Systems', zh: '监测系统' },
    ],
  },
  {
    icon: Wind,
    titleEn: 'Wind Power',
    titleZh: '风力发电',
    descriptionEn: 'Specialized electrical components for wind power generation systems.',
    descriptionZh: '为风力发电系统提供专用电气元件。',
    features: [
      { en: 'High Voltage Protection', zh: '高压保护' },
      { en: 'Converter Protection', zh: '变流器保护' },
      { en: 'Grid Connection', zh: '并网系统' },
    ],
  },
  {
    icon: Battery,
    titleEn: 'Energy Storage',
    titleZh: '储能系统',
    descriptionEn: 'Complete battery management and protection solutions for energy storage.',
    descriptionZh: '为储能提供完整的电池管理和保护解决方案。',
    features: [
      { en: 'BMS Protection', zh: '电池管理系统' },
      { en: 'DC Disconnectors', zh: '直流隔离开关' },
      { en: 'Thermal Management', zh: '热管理' },
    ],
  },
];

export default function SolutionsPageContent({ locale }: { locale: string }) {
  const t = useTranslations('solutions');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'zh' ? '解决方案' : 'Solutions'}
            </h1>
            <p className="text-xl text-gray-200">
              {locale === 'zh'
                ? 'ECH-ST 电气为各行业提供专业的电路保护与储能解决方案'
                : 'ECH-ST Electrics provides professional circuit protection and energy storage solutions for various industries.'}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <solution.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {locale === 'zh' ? solution.titleZh : solution.titleEn}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'zh' ? solution.descriptionZh : solution.descriptionEn}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <Shield className="w-4 h-4 text-primary-600" />
                      <span>{locale === 'zh' ? feature.zh : feature.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'zh' ? '需要定制解决方案？' : 'Need a Custom Solution?'}
            </h2>
            <p className="text-lg mb-8 text-gray-100">
              {locale === 'zh'
                ? '我们的专家团队将根据您的需求提供专业的技术支持和定制方案'
                : 'Our expert team will provide professional technical support and customized solutions based on your needs.'}
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {locale === 'zh' ? '联系我们' : 'Contact Us'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
