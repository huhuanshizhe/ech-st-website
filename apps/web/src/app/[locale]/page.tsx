import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProductsSection from '@/components/home/ProductsSection';
import SolutionsSection from '@/components/home/SolutionsSection';
import FactorySection from '@/components/home/FactorySection';
import CTASection from '@/components/home/CTASection';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === 'zh';
  return {
    title: isZh ? 'ECH-ST电气 | 专业电路保护与储能解决方案' : 'ECH-ST Electrics | Professional Circuit Protection & Energy Storage Solutions',
    description: isZh
      ? 'ECH-ST电气是断路器、保护器件及储能系统的领先制造商，为全球市场提供优质电气解决方案。'
      : 'ECH-ST Electrics is a leading manufacturer of circuit breakers, protection devices, and energy storage systems. Quality electrical solutions for global markets.',
  };
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection locale={locale} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Products */}
      <ProductsSection locale={locale} />

      {/* Solutions Section */}
      <SolutionsSection locale={locale} />

      {/* Factory/Videos Section */}
      <FactorySection locale={locale} />

      {/* CTA Section */}
      <CTASection locale={locale} />
    </div>
  );
}