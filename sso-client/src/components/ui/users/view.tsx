'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setIsEditMode(false);
  };

  const handleGoToUsers = () => {
    router.push('/users');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm" onClick={handleGoToUsers}>Go to Users Table</button>
      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
      >
        {isEditMode ? 'View' : 'Edit'}
      </button>
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
                      value={formData.attributes[attrKey]?.join(', ') || ''}
                      onChange={handleAttributesChange}
                      className="w-full"
                      disabled={!isEditMode}
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
        {isEditMode && (
          <div className="flex justify-end space-x-4 mt-4">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm" onClick={handleGoToUsers}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm">Save</button>
          </div>
        )}
      </form>
    </div>
  );
}
