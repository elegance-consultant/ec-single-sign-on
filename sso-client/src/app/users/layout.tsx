import DisplayUser from '@/components/display-user';
import { Sidebar } from '@/components/sidebar';
import { SidebarAdmin } from '@/components/sidebarAdmin';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { cookies } from 'next/headers';
import { Profile } from '../profile';

export default async function CreateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('session');
  const jwtCookie_str = jwtCookie?.value;

  if (jwtCookie_str) {
    try {
      const decodedToken: JwtPayload = jwtDecode(jwtCookie_str);

      if (decodedToken.aud?.[0] === 'realm-management') {
        return (
          <div className="h-full relative">
            <SidebarAdmin />
            <div className="md:pl-72 px-5">
              <div className="justify-self-end py-2 flex">
                <Profile />
                <DisplayUser />
              </div>
              {children}
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error('Failed to decode JWT:', error);
    }
  }
  return (
    <div className="h-full relative">
      <Sidebar />
      <div className="md:pl-72 px-5">
        <div className="justify-self-end py-2">
          <DisplayUser />
        </div>
        {children}
      </div>
    </div>
  );
}