import { Sidebar } from '@/components/sidebar';
import { Toaster } from '@/components/ui/toaster';

export default async function CreateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <Sidebar />
      <div className="md:pl-72">
        {children}
        <Toaster />
      </div>
    </div>
  );
}