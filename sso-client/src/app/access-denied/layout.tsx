import DisplayUser from '@/components/display-user';
import { Sidebar } from '@/components/sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar />
      </div>
      <div className="md:pl-72 px-5">
        <div className="justify-self-end py-6">
          <DisplayUser />
        </div>
        {children}
      </div>
    </div>
  );
}