import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import ProductListPage from './ProductListPage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === 'zh';
  return {
    title: isZh ? '产品中心' : 'Products',
    description: isZh
      ? '浏览ECH-ST全系列电气产品：塑壳断路器、小型断路器、浪涌保护器、储能系统等'
      : 'Explore ECH-ST comprehensive range of electrical products: MCCB, MCB, SPD, MOV, Energy Storage Systems and more.',
  };
}

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ProductListPage locale={locale} />;
}