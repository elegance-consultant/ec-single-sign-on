import { cookies } from 'next/headers';
import { ModeToggle } from './mode-toggle';
import { decode } from 'jsonwebtoken';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DisplayUser = async () => {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    const jwtCookie_str = jwtCookie?.value;

    let given_name = 'Guest';

    if (jwtCookie_str) {
        try {
            const decodedToken: any = decode(jwtCookie_str);
            given_name = decodedToken?.given_name || 'Guest';
        } catch (error) {
            console.error('Failed to decode JWT:', error);
        }
    }
    return (
        <div className='grid grid-cols-3'>
            <div className='px-5'>
                <Avatar>
                    <AvatarImage src="./icon.svg" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='py-2'>
                {given_name}
            </div>
            <div className='py-2 justify-self-end'>
                <ModeToggle />
            </div>
        </div>
    );
};

export default DisplayUser;
