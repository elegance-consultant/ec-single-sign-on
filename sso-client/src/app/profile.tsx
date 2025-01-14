import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ImgProfile from '../../public/icon.png';
import Image from "next/image";

export function Profile() {
    return (
        <Avatar className="hidden md:flex">
            <AvatarFallback>
                <Image src={ImgProfile} alt={"profile"} width={100} height={100} />
            </AvatarFallback>
        </Avatar>
    );
}