"use client";

import { redirect } from 'next/navigation';
import { useState, FormEvent } from 'react';

interface UserCreate {
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

const CreateUser = () => {
    const [user, setUser] = useState<UserCreate>({
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
                temporary: true,
            },
        ],
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // console.log(user);
        const create = await fetch('/api/user/create', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        if (create.ok) {
            redirect('/users')
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            credentials: [
                {
                    ...prevUser.credentials[0],
                    [name]: type === 'checkbox' ? checked : value,
                },
            ],
        }));
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                    <input type="text" id="username" name="username" value={user.username} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="credentialsValue" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input type="password" id="credentialsValue" name="value" value={user.credentials[0].value} onChange={handleCredentialsChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div className="flex items-center">
                    <input type="hidden" id="emailVerified" name="emailVerified" checked={user.emailVerified} onChange={handleChange} readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    {/* <label htmlFor="emailVerified" className="ml-2 block text-sm text-gray-900">Email Verified</label> */}
                </div>
                <div className="flex items-center">
                    <input type="hidden" id="enabled" name="enabled" checked={user.enabled} onChange={handleChange} readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    {/* <label htmlFor="enabled" className="ml-2 block text-sm text-gray-900">Enabled</label> */}
                </div>
                <div>
                    {/* <label htmlFor="credentialsType" className="block text-sm font-medium text-gray-700">Credentials Type:</label> */}
                    <input type="hidden" id="credentialsType" name="type" value={user.credentials[0].type} onChange={handleCredentialsChange} required readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div className="flex items-center">
                    <input type="hidden" id="credentialsTemporary" name="temporary" checked={user.credentials[0].temporary} onChange={handleCredentialsChange} readOnly className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    {/* <label htmlFor="credentialsTemporary" className="ml-2 block text-sm text-gray-900">Credentials Temporary</label> */}
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Create User</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
