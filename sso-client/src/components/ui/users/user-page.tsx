// Client Component
'use client';
import { User } from '@/types/user';
import { useState, useEffect } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

interface UserPageProps {
    data: User[];
}

export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Animation Icon */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-50"></div>
            {/* Loading Text */}
            <p className="text-center text-gray-500 mt-4">
                กำลังโหลดข้อมูล...
            </p>
        </div>
    );
}

export function UserPage({ data }: UserPageProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="space-y-0">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                <p className="text-muted-foreground">
                    Here's an overview of your business
                </p>
            </div>
            <div className="container mx-auto">
                {
                    isClient ? <DataTable columns={columns} data={data} /> : Loading()
                }
            </div>
        </div>
    );
}
