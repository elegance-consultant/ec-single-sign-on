"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Profile() {
    return (
        <Avatar className="hidden md:flex">
            <AvatarImage src="./favicon.ico" alt="profile" />
            <AvatarFallback>A</AvatarFallback>
        </Avatar>
    );
}