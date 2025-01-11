import { Sidebar } from '@/components/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <Sidebar />
      <div className="md:pl-72">
        {children}
      </div>
    </div>
  );
}