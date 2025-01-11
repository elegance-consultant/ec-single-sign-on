// Client Component
'use client';
import { User } from '@/types/user';
import { useState, useEffect } from 'react';
import { DataTable } from './data-table';
import { getColumns } from './columns';
import { Spinner } from '@/components/spinner';

interface UserPageProps {
    data: User[];
}

export function Loading() {
    return (
        <div className="items-center gap-3 grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <Spinner size={"big"} className='text-sky-600'>Loading...</Spinner>
        </div>
    );
}

export function UserPage({ data }: UserPageProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const dynamicFields = Object.keys(data[0]);

    return (
        isClient ? <DataTable columns={getColumns(dynamicFields)} data={data} /> : Loading()
    );
}
