import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import Header from '@/components/header';

export default async function CreateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <Header />
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <div className="md:pl-72">
        <Navbar />
        <div className="p-8">
          {children}
          
        </div>
      </div>
    </div>
  );
}