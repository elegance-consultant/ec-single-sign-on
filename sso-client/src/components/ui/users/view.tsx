'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { Switch } from "../switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from 'sweetalert2';
import { Button } from "../button";

interface UserFormProps {
  user: User;
}

export function UserForm({ user }: UserFormProps) {
  const [formData, setFormData] = useState(user);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === 'Active') {
        return { ...prev, [name]: value === 'true' };
      } else {
        return { ...prev, [name]: value };
      }
    });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createUser = await fetch(`/api/user/update`, {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    if (createUser.ok) {
      Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
    }

    setIsEditMode(false);
  };

  const handleBack = () => {
    router.push('/users');
  };

  return (
    <div>
      <div className="py-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="edit-mode-switch" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {isEditMode ? 'View Mode' : 'Edit Mode'}
          </label>
          <Switch id="edit-mode-switch" checked={isEditMode} onCheckedChange={setIsEditMode} className="" />
        </div>
      </div>
      <div className="p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.keys(user).map((key) => {
              switch (key) {
                case 'attributes':
                  return Object.keys(user.attributes).map((attrKey) => (
                    <div className="grid gap-2" key={attrKey}>
                      <Label htmlFor={attrKey}>{attrKey}</Label>
                      <Input
                        id={attrKey}
                        name={attrKey}
                        type="text"
                        placeholder={attrKey}
                        required
                        value={formData.attributes[attrKey]?.join(', ') || ''}
                        onChange={handleAttributesChange}
                        className="w-full"
                        disabled={!isEditMode}
                      />
                    </div>
                  ));
                case 'createdTimestamp':
                  return (
                    <div className="grid gap-2" key={key}>
                      <Label htmlFor={key}>วันเวลาที่สร้างบัญชี</Label>
                      <Input
                        id={key}
                        name={key}
                        type="text"
                        placeholder={key}
                        value={new Date(Number(formData[key as keyof User]?.toString())).toLocaleString() || ''}
                        onChange={handleChange}
                        disabled={!isEditMode || key === 'createdTimestamp'}
                        className="w-full"
                      />
                    </div>
                  );
                case 'enabled':
                  return (
                    <div className="grid gap-2" key={key}>
                      <Label htmlFor={key}>Active User</Label>
                      <Select
                        disabled={!isEditMode}
                        value={formData[key as keyof User]?.toString()}
                        onValueChange={(value) => setFormData({ ...formData, [key]: value === "true" })}
                        defaultValue={formData[key as keyof User]?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent id={key}>
                          <SelectGroup>
                            <SelectItem value="true">isActive</SelectItem>
                            <SelectItem value="false">inActive</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                case 'emailVerified':
                  return (
                    <div className="grid gap-2" key={key}>
                      <Label htmlFor={key}>EmailVerified</Label>
                      <Select
                        disabled={!isEditMode}
                        value={formData[key as keyof User]?.toString()}
                        onValueChange={(value) => setFormData({ ...formData, [key]: value === 'true' })}
                        defaultValue={formData[key as keyof User]?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent id={key}>
                          <SelectGroup>
                            <SelectItem value="true">Verified</SelectItem>
                            <SelectItem value="false">UnVerified</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                case 'username':
                  return (
                    <div className="grid gap-2" key={key}>
                      <Label htmlFor={key}>{key}</Label>
                      <Input
                        id={key}
                        name={key}
                        type="text"
                        placeholder={key}
                        value={formData[key as keyof User]?.toString() || ''}
                        onChange={handleChange}
                        disabled={!isEditMode || key === 'username'}
                        className="w-full"
                      />
                    </div>
                  );
                case 'totp':
                  break;
                case 'access':
                  break;
                case 'disableableCredentialTypes':
                  break;
                case 'requiredActions':
                  break;
                case 'notBefore':
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
                        value={formData[key as keyof User]?.toString() || ''}
                        onChange={handleChange}
                        disabled={!isEditMode || key === 'id'}
                        className="w-full"
                      />
                    </div>
                  );
              }
            })}
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <Button type="button" variant="outline" className="bg-white text-sky-900 border border-sky-900" onClick={handleBack}>Back</Button>
            {isEditMode && (
              <Button type="submit" className="bg-sky-900 hover:bg-sky-800 dark:text-white">Save</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
