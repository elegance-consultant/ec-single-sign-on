'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User } from "@/types/user";

interface UserFormProps {
  user?: User;
}

export function UserForm({ user }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    id: user?.id || '',
    username: user?.username || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    emailVerified: user?.emailVerified || false,
    attributes: user?.attributes || {
      DateOfBirth: [''],
      Telephone: [''],
      addr_Province: [''],
      addr_Address: [''],
      Gender: [''],
      addr_PostCode: [''],
      addr_District: [''],
      NationalIDCard: [''],
      addr_SubDistrict: ['']
    },
    createdTimestamp: user?.createdTimestamp || Date.now(),
    enabled: user?.enabled || false,
    totp: user?.totp || false,
    disableableCredentialTypes: user?.disableableCredentialTypes || [],
    requiredActions: user?.requiredActions || [],
    notBefore: user?.notBefore || 0,
    access: user?.access || {
      manageGroupMembership: false,
      view: false,
      mapRoles: false,
      impersonate: false,
      manage: false
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View User</h1>
      <div className="py-10 columns-2xl">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 grid-auto-rows-min">
            <div className="grid gap-2">
              <Label htmlFor="id">Id</Label>
              <Input
                id="id"
                name="id"
                type="text"
                placeholder="id"
                value={formData.id}
                onChange={handleChange}
                disabled
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                disabled
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                disabled
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                disabled
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.attributes?.addr_Address?.[0] || ''}
                onChange={handleChange}
                disabled
                className="w-full"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
