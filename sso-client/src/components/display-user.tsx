import { cookies } from 'next/headers';
import { ModeToggle } from './mode-toggle';
import { decode } from 'jsonwebtoken';

const DisplayUser = async () => {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    const jwtCookie_str = jwtCookie?.value;

    let given_name = 'Guest'; // Default name if JWT is not present

    if (jwtCookie_str) {
        try {
            const decodedToken: any = decode(jwtCookie_str);
            given_name = decodedToken?.given_name || 'Guest';
        } catch (error) {
            console.error('Failed to decode JWT:', error);
        }
    }
    return (
        <div className='grid grid-cols-2'>
            <div>
                <p>{given_name}</p>
            </div>
            <div className='justify-self-end'>
                <ModeToggle />
            </div>
        </div>
    );
};

export default DisplayUser;
