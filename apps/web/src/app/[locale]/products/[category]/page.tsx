import { Metadata } from 'next';
import CategoryPage from './CategoryPage';

export async function generateMetadata({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}): Promise<Metadata> {
  const categoryNames: Record<string, { en: string; zh: string }> = {
    'mccb': { en: 'MCCB - Molded Case Circuit Breakers', zh: '塑壳断路器' },
    'mcb': { en: 'MCB - Miniature Circuit Breakers', zh: '小型断路器' },
    'circuit-protection': { en: 'Circuit Protection Devices', zh: '电路保护器件' },
    'energy-storage': { en: 'Energy Storage Solutions', zh: '储能系统' },
    'intelligent-devices': { en: 'Intelligent Devices', zh: '智能设备' },
    'rs485': { en: 'RS485 Communication Chip', zh: 'RS485通信芯片' },
    'accessories': { en: 'MCCB Accessories', zh: '断路器附件' },
  };
  
  const name = categoryNames[category] || { en: category, zh: category };
  const isZh = locale === 'zh';
  
  return {
    title: isZh ? name.zh : name.en,
    description: isZh
      ? `浏览ECH-ST ${name.zh}产品系列，了解技术规格与应用场景`
      : `Explore ECH-ST ${name.en} product series, learn about specifications and applications.`,
  };
}

export default function ProductCategoryPage({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}) {
  return <CategoryPage locale={locale} categorySlug={category} />;
}