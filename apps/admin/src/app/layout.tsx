import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ECH-ST 管理后台',
  description: 'ECH-ST Electrics 网站管理后台系统',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}