import { cookies } from 'next/headers';
import { ModeToggle } from './mode-toggle';
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <Avatar>
        <AvatarImage src="./icon.svg" alt="profile" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
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
