'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Facebook } from 'lucide-react';

const quickLinks = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'solutions', href: '/solutions' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

const productLinks = [
  { key: 'mccb', href: '/products/mccb', labelEn: 'MCCB', labelZh: '塑壳断路器' },
  { key: 'mcb', href: '/products/mcb', labelEn: 'MCB', labelZh: '小型断路器' },
  { key: 'spd', href: '/products/circuit-protection', labelEn: 'SPD', labelZh: '浪涌保护器' },
  { key: 'mov', href: '/products/circuit-protection', labelEn: 'MOV', labelZh: '压敏电阻' },
  { key: 'energy', href: '/products/energy-storage', labelEn: 'Energy Storage', labelZh: '储能系统' },
];

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('common');
  const currentLocale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo-white.png"
                alt="ECH-ST Electrics"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">ECH-ST</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              {locale === 'zh'
                ? '专业电路保护与储能解决方案提供商，服务全球50+国家和地区'
                : 'Professional circuit protection & energy storage solutions provider, serving 50+ countries worldwide'}
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t(`navigation.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {locale === 'zh' ? link.labelZh : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:sales@ech-st.com" className="hover:text-white transition-colors">
                  sales@ech-st.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+8613851615796" className="hover:text-white transition-colors">
                  +86 13851615796
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  {locale === 'zh'
                    ? '温州：研发中心、制造工厂 | 南京：供应链管理'
                    : 'Wenzhou: R&D & Factory | Nanjing: Supply Chain'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              {locale === 'zh' ? '隐私政策' : 'Privacy Policy'}
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              {locale === 'zh' ? '使用条款' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}