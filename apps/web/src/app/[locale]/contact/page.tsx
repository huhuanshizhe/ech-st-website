import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === 'zh';
  return {
    title: isZh ? '联系我们' : 'Contact Us',
    description: isZh
      ? '联系ECH-ST电气团队，获取产品询盘和技术支持'
      : 'Contact ECH-ST Electrics team for product inquiries and technical support.',
  };
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ContactPageContent locale={locale} />;
}