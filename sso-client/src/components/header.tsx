import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';
import { ModeToggle } from './mode-toggle';

const Header = async () => {

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    let decodedJwt = null;
    if (jwtCookie) {
        decodedJwt = decode(jwtCookie.value);
    }
    
    return (
        <header className='pt-4'>
            <div className="container mx-auto flex justify-end items-center py-3 px-6">
                <div className="hidden md:flex items-center space-x-4">
                    <span>{decodedJwt.name}</span> {/* Display the username */}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;