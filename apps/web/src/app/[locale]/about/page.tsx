import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === 'zh';
  return {
    title: isZh ? '关于我们' : 'About Us',
    description: isZh
      ? '了解ECH-ST电气：专业电路保护与储能解决方案提供商，20+年行业经验，服务全球50+国家'
      : 'Learn about ECH-ST Electrics: Professional circuit protection & energy storage solutions provider with 20+ years experience serving 50+ countries.',
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <AboutPageContent locale={locale} />;
}