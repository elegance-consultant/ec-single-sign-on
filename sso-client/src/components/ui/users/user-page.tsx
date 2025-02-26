'use client';

import { User } from '@/types/user';
import { useState, useEffect } from 'react';
import { DataTable } from './data-table';
import { getColumns } from './columns';
import { Spinner } from '@/components/spinner';

interface UserPageProps {
    data: User[];
    totalUsers: number;
    totalPages: number;
    page: number;
    pageSize: number;
    search: string;
    nationalIDCard: string;
    searchType: string;
    phone: string;
}

export function Loading() {
    return (
        <div className="items-center gap-3 grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <Spinner size="big" className="text-sky-600" />
        </div>
    );
}

export function UserPage({ data, totalUsers, totalPages, page, pageSize, search, nationalIDCard, searchType, phone }: UserPageProps) {
    const [isClient, setIsClient] = useState(() => typeof window !== undefined);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // if (!data.length) {
    //     return (
    //         <div className="text-center py-10">
    //             <p className="text-lg text-muted-foreground">No users found.</p>
    //         </div>
    //     );
    // }

    // const dynamicFields = Object.keys(data[0]);

    const dynamicFields = Object.keys(data[0] || '');

    return isClient ? <DataTable columns={getColumns(dynamicFields)} data={data} totalUsers={totalUsers} totalPages={totalPages} page={page} pageSize={pageSize} search={search} nationalIDCard={nationalIDCard} searchType={searchType} phone={phone} /> : <Loading />
}
