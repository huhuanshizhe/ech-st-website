'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import {
  LayoutDashboard,
  Package,
  Tags,
  Mail,
  Users,
  Settings,
  LogOut,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  { label: '仪表盘', icon: LayoutDashboard, href: '/dashboard' },
  { label: '产品管理', icon: Package, href: '/dashboard/products' },
  { label: '分类管理', icon: Tags, href: '/dashboard/categories' },
  { label: '询盘管理', icon: Mail, href: '/dashboard/inquiries' },
  { label: '文章管理', icon: FileText, href: '/dashboard/articles' },
  { label: '聊天记录', icon: MessageSquare, href: '/dashboard/chats' },
  { label: '用户管理', icon: Users, href: '/dashboard/users' },
  { label: '系统设置', icon: Settings, href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img
          src="/images/logo.png"
          alt="ECH-ST"
          className="w-10 h-10"
        />
        <h1 className="text-lg font-semibold text-gray-900 mt-2">管理后台</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'sidebar-item',
                isActive && 'sidebar-item-active'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-medium">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{user?.name || '管理员'}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-item w-full text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>
      </div>
    </aside>
  );
}