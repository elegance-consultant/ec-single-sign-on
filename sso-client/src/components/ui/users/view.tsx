'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { Switch } from "../switch";
import Swal from 'sweetalert2';

interface UserFormProps {
  user: User;
}

export function UserForm({ user }: UserFormProps) {
  const [formData, setFormData] = useState(user);
  const [isEditMode, setIsEditMode] = useState(false);
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
          <Switch id="edit-mode-switch" checked={isEditMode} onCheckedChange={setIsEditMode} />
        </div>
      </div>
      <div className="p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  break;
                // case 'enabled':
                //   break;
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
                case 'credentials':
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
            <button type="button" className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md shadow-sm" onClick={handleBack}>Back</button>
            {isEditMode && (
              <button type="submit" className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md shadow-sm">Save</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
