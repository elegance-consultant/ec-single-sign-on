'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  LogOut,
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  // {
  //   label: 'Analytics',
  //   icon: BarChart3,
  //   href: '/dashboard/analytics',
  //   color: 'text-violet-500',
  // },
  {
    label: 'Users',
    icon: Users,
    href: '/users',
    color: 'text-pink-700',
  },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/dashboard/settings',
  //   color: 'text-gray-500',
  // },
];

const handleDeleteCookie = async () => {
  const response = await fetch('/api/logout', {
    method: 'DELETE',
  });

  if (response.ok) {
    const data = await response.json();
    // console.log(data.message); // Cookie deleted
    redirect("/login");
  } else {
    console.error('Failed to delete cookie');
  }
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card text-card-foreground">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">SSO</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition',
                pathname === route.href ? 'bg-primary/10' : 'transparent',
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition" onClick={handleDeleteCookie}>
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-red-500" />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}