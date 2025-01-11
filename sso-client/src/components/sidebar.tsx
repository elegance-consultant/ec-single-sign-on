'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  LogOut,
  Clock,
  CalendarDays
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import HomeLogo from '../../public/home.png';

interface Route {
  label: string;
  icon: LucideIcon;
  href: string;
}

const routes: Route[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'User',
    icon: Users,
    href: '/users',
  },
];

const handleDeleteCookie = async () => {
  const res = await fetch('/auth/logout', {
      method: 'GET',
  });
  if (res.ok) {
    redirect('/login')
  }
};

export function Sidebar() {
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="hidden h-full rounded-md md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
      <div className="flex flex-col h-full text-gray-800 shadow-md w-64">
        <div className="px-4 py-6">
          <Link href="/dashboard" className="flex justify-center items-center mb-8">
            <Image src={HomeLogo} alt={'homeLogo'} className="h-8 w-auto" />
          </Link>
          <div className="space-y-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'group flex items-center px-4 py-2 rounded-md hover:bg-sky-950 transition-colors duration-200',
                  pathname === route.href ? 'bg-sky-900 font-medium' : 'text-gray-600',
                )}
              >
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto px-4 py-6 border-t border-gray-200">
          <div className='mb-4'>
            <div className='flex items-center text-gray-600 mb-2'>
              <Clock className='h-4 w-4 mr-2' />
              {`${isClient ? '' : ''} (GMT+7)`}
            </div>
            <div className='flex items-center text-gray-600'>
              <CalendarDays className='h-4 w-4 mr-2' />
              {
                new Date().toLocaleDateString('th-TH')
              }
            </div>
          </div>
          <button
            className="group flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 text-red-500"
            onClick={handleDeleteCookie}
          >
            <LogOut className="h-5 w-5 mr-3" onClick={() => handleDeleteCookie} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}