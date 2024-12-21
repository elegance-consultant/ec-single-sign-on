'use client';

import { MobileSidebar } from './mobile-sidebar';

export function Navbar() {
  return (
    <div className="flex items-center p-4 border-b md:hidden">
      <MobileSidebar />
      <div className="flex justify-center flex-1">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
}