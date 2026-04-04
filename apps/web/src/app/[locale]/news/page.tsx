import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import NewsPageContent from './NewsPageContent';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === 'zh';
  return {
    title: isZh ? '新闻中心' : 'News Center',
    description: isZh
      ? '了解 ECH-ST 电气的最新动态、产品信息和行业资讯'
      : 'Stay updated with ECH-ST Electrics latest news, product information and industry insights.',
  };
}

export default async function NewsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <NewsPageContent locale={locale} />;
}
