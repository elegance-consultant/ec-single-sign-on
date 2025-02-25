'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LogOut,
    Clock,
    CalendarDays,
    Menu,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HomeLogo from '../../public/home.png';

export interface Route {
    label: string;
    icon: LucideIcon;
    href: string;
}

const routes: Route[] = [
];

const handleDeleteCookie = async () => {
    const res = await fetch('auth/logout', {
        method: 'GET',
    });
    if (res.ok) {
        redirect('login');
    }
};

export function Sidebar() {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="md:hidden p-2 fixed top-4 right-4 z-[100] bg-sky-800 dark:bg-sky-600 hover:bg-sky-900 dark:hover:bg-sky-700 text-white rounded-full"
                onClick={toggleSidebar}
            >
                <Menu className="h-6 w-6 text-white" />
            </button>

            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-[80] w-64 shadow-md transform transition-transform dark:bg-black bg-white dark:text-white',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                    'md:translate-x-0 md:flex md:flex-col'
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="px-4 py-6">
                        <Link href="/dashboard" className="flex justify-center items-center mb-8">
                            <Image src={HomeLogo} alt={'homeLogo'} className="h-auto" />
                        </Link>
                        <div className="space-y-2">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        'group flex items-center px-4 py-2 rounded-md transition-colors duration-200 text-black',
                                        pathname === route.href ? 'bg-sky-900 dark:bg-sky-600 hover:bg-sky-800 dark:hover:bg-sky-700 font-medium text-white' : 'dark:text-gray-300',
                                    )}
                                >
                                    <route.icon className="h-5 w-5 mr-3" />
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto px-4 py-6 border-t border-gray-600/20 dark:border-gray-700/20">
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <Clock className="h-4 w-4 mr-2" />
                                {`${isClient ? new Date().toLocaleTimeString('th-TH') : ''} (GMT+7)`}
                            </div>
                            <div className="flex items-center">
                                <CalendarDays className="h-4 w-4 mr-2" />
                                {isClient ? new Date().toLocaleDateString('th-TH') : ''}
                            </div>
                        </div>
                        <button
                            className="group flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-800/20 transition-colors duration-200 text-red-500"
                            onClick={handleDeleteCookie}
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
