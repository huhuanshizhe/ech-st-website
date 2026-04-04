import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import SolutionsPageContent from './SolutionsPageContent';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === 'zh';
  return {
    title: isZh ? '解决方案' : 'Solutions',
    description: isZh
      ? 'ECH-ST 电气提供全面的电路保护与储能解决方案，服务于新能源、工业控制、智能建筑等多个领域'
      : 'ECH-ST Electrics provides comprehensive circuit protection and energy storage solutions for new energy, industrial control, smart buildings and more.',
  };
}

export default async function SolutionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <SolutionsPageContent locale={locale} />;
}
