'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Swal from 'sweetalert2';

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
                            onChange={handleCredentialsChange}
                            className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-8 space-x-4">
                    <button type="button" className="border border-gray-400 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleBack}>
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
