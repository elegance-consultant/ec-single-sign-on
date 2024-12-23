import { cookies } from 'next/headers';
import { ModeToggle } from './mode-toggle';
import { decode } from 'jsonwebtoken';

const Header = async () => {
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
        <header className='pt-4'>
            <div className="container mx-auto flex justify-end items-center py-3 px-6">
                <div className="hidden md:flex items-center space-x-4">
                    <span>{given_name}</span> {/* Display the username */}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
