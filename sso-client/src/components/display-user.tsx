import { cookies } from 'next/headers';
import { ModeToggle } from './mode-toggle';
import { jwtDecode } from "jwt-decode";
import { Profile } from '@/app/profile';

const DisplayUser = async () => {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('session');
  const jwtCookie_str = jwtCookie?.value;

  let given_name = 'Guest';

  if (jwtCookie_str) {
    try {
      const decodedToken: any = jwtDecode(jwtCookie_str);
      given_name = decodedToken.given_name || 'Guest';
    } catch (error) {
      console.error('Failed to decode JWT:', error);
    }
  }

  return (
    <div className='hidden md:flex'>
      <Profile />
      <div className='py-2 px-5'>
        {given_name}
      </div>
      <div className='py-2 justify-self-end'>
        <ModeToggle />
      </div>
    </div>
  );
};

export default DisplayUser;
