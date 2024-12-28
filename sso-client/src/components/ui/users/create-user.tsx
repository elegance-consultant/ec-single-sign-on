'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { User } from "@/types/user";

const initialUser: User = {
    "username": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "emailVerified": true,
    "attributes": {
        "DateOfBirth": [],
        "addr_PostCode": [],
        "addr_District": [],
        "Telephone": [],
        "addr_Province": [],
        "addr_Address": [],
        "NationalIDCard": [],
        "Gender": [],
        "addr_SubDistrict": [],
    },
    "enabled": true,
    "credentials": [
        {
            "type": "password",
            "value": "",
            "temporary": false
        }
    ],
    "access": {
        "manageGroupMembership": true,
        "view": true,
        "mapRoles": true,
        "impersonate": true,
        "manage": true
    }
};

export function CreateUserForm() {
    const [formData, setFormData] = useState(initialUser);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAttributesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                [name]: [value]
            }
        }));
    };

    const handleCredentialChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newCredentials = [...prev.credentials];
            newCredentials[index] = { ...newCredentials[index], [name]: value };
            return { ...prev, credentials: newCredentials };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        // Add your form submission logic here, such as an API call.
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New User</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(initialUser).map((key) => {
                        switch (key) {
                            case 'attributes':
                                return Object.keys(initialUser.attributes).map((attrKey) => (
                                    <div className="grid gap-2" key={attrKey}>
                                        <Label htmlFor={attrKey}>{attrKey}</Label>
                                        <Input
                                            id={attrKey}
                                            name={attrKey}
                                            type="text"
                                            placeholder={attrKey}
                                            value={formData.attributes[attrKey]?.join(', ') || ''}
                                            onChange={handleAttributesChange}
                                            className="w-full"
                                        />
                                    </div>
                                ));
                            case 'credentials':
                                return formData.credentials.map((credential, index) => (
                                    <div className="grid gap-2" key={index}>
                                        <Label htmlFor={`type-${index}`}>Credential Type</Label>
                                        <Input
                                            id={`type-${index}`}
                                            name="type"
                                            type="text"
                                            placeholder="type"
                                            value={credential.type.toString()}
                                            onChange={(e) => handleCredentialChange(index, e)}
                                            className="w-full"
                                        />
                                        <Label htmlFor={`value-${index}`}>Credential Value</Label>
                                        <Input
                                            id={`value-${index}`}
                                            name="value"
                                            type="text"
                                            placeholder="value"
                                            value={credential.value.toString()}
                                            onChange={(e) => handleCredentialChange(index, e)}
                                            className="w-full"
                                        />
                                    </div>
                                ));
                            case 'access':
                                break;
                            default:
                                return (
                                    <div className="grid gap-2" key={key}>
                                        <Label htmlFor={key}>{key}</Label>
                                        <Input
                                            id={key}
                                            name={key}
                                            type="text"
                                            placeholder={key}
                                            value={formData[key as keyof typeof initialUser]?.toString() || ''}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                    </div>
                                );
                        }
                    })}
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm" onClick={() => redirect('/users')}>Cancel</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm">Create Account</button>
                </div>
            </form>
        </div>
    );
}
