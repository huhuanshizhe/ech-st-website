'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, ChevronDown, Globe, Phone, Mail } from 'lucide-react';
import { clsx } from 'clsx';
import { localeNames, localeFlags } from '@/config/i18n';

const navigation = [
  { key: 'home', href: '/' },
  {
    key: 'products',
    href: '/products',
    children: [
      { key: 'mccb', href: '/products/mccb', labelEn: 'MCCB', labelZh: '塑壳断路器' },
      { key: 'mcb', href: '/products/mcb', labelEn: 'MCB', labelZh: '小型断路器' },
      { key: 'circuit-protection', href: '/products/circuit-protection', labelEn: 'Circuit Protection', labelZh: '电路保护器件' },
      { key: 'energy-storage', href: '/products/energy-storage', labelEn: 'Energy Storage', labelZh: '储能系统' },
      { key: 'intelligent-devices', href: '/products/intelligent-devices', labelEn: 'Intelligent Devices', labelZh: '智能设备' },
    ],
  },
  { key: 'solutions', href: '/solutions' },
  { key: 'about', href: '/about' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
];

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('common.navigation');
  const tCommon = useTranslations('common');
  const currentLocale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/95 backdrop-blur-sm py-4'
      )}
    >
      {/* Top bar */}
      <div className={clsx(
        'hidden lg:block border-b border-gray-100 transition-all duration-300',
        isScrolled ? 'h-0 overflow-hidden' : 'py-2'
      )}>
        <div className="container-custom flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <a href="tel:+8613851615796" className="flex items-center gap-1 hover:text-primary-600">
              <Phone className="w-4 h-4" />
              <span>+86 13851615796</span>
            </a>
            <a href="mailto:sales@ech-st.com" className="flex items-center gap-1 hover:text-primary-600">
              <Mail className="w-4 h-4" />
              <span>sales@ech-st.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-primary-600">
              {locale === 'zh' ? '获取报价' : 'Get Quote'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="ECH-ST Electrics"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary-700 hidden sm:block">
              ECH-ST
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors',
                    'rounded-lg hover:bg-primary-50'
                  )}
                >
                  {t(item.key)}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.key && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-slide-down">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className="block px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        {locale === 'zh' ? child.labelZh : child.labelEn}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium">
                  {localeFlags[currentLocale as keyof typeof localeFlags]} {localeNames[currentLocale as keyof typeof localeNames]}
                </span>
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-slide-down">
                  {(['en', 'zh'] as const).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={clsx(
                        'w-full px-4 py-2 text-left hover:bg-primary-50 transition-colors',
                        currentLocale === loc ? 'text-primary-600 font-medium' : 'text-gray-600'
                      )}
                    >
                      {localeFlags[loc]} {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-slide-down">
            {navigation.map((item) => (
              <div key={item.key}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
                {item.children && (
                  <div className="ml-4 bg-gray-50 rounded-lg py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className="block px-4 py-2 text-gray-600 hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {locale === 'zh' ? child.labelZh : child.labelEn}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}