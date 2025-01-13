'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Swal from 'sweetalert2';
import { Button } from "../button";

interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    credentials: [
        {
            type: string;
            value: string;
            temporary: boolean;
        }
    ];
}

export default function CreateUserForm() {
    const [formData, setFormData] = useState<User>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        emailVerified: true,
        enabled: true,
        credentials: [
            {
                type: 'password',
                value: '',
                temporary: false,
            },
        ],
    });

    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            credentials: [
                {
                    ...prev.credentials[0],
                    [name]: value,
                },
            ],
        }));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.credentials[0].value !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "รหัสผ่านไม่ตรงกัน",
                showConfirmButton: false,
                timer: 1000
            });
            return;
        }

        const create = await fetch('/api/user/create', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (create.ok) {
            handleCreate();
        }
    };

    const router = useRouter();
    const handleBack = () => {
        router.push('/users');
    };

    const handleCreate = () => {
        Swal.fire({
            icon: "success",
            title: "สร้างบัญชีสำเร็จ",
            showConfirmButton: false,
            timer: 1000
        }).then(() => {
            router.push('/users');
        });
    };

    return (
        <div className="p-8 rounded-lg shadow-lg mx-auto mt-10">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="firstName">ชื่อ</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName">นามสกุล</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="value"
                            type="password"
                            value={formData.credentials[0].value || ""}
                            required
                            onChange={handleCredentialsChange}
                            className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            required
                            onChange={handleConfirmPasswordChange}
                            className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-8 space-x-4">
                    <Button type="button" variant="outline" className="bg-white text-sky-900 border border-sky-900" onClick={handleBack}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-sky-900 hover:bg-sky-800 dark:text-white">
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
}
