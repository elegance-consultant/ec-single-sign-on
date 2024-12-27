'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

interface UserFormProps {
  user: User;
}

export function UserForm({ user }: UserFormProps) {
  const [formData, setFormData] = useState(user);

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
  };

  const handleGoToUsers = () => {
    redirect('/users');
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View User</h1>
      <button onClick={handleGoToUsers}>Go to Users</button>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
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
                      value={formData.attributes[attrKey]?.join(', ') || ''} // Added nullish coalescing
                      onChange={handleAttributesChange}
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
                      value={formData[key as keyof User]?.toString() || ''}
                      onChange={handleChange}
                      disabled={key === 'id'}
                      className="w-full"
                    />
                  </div>
                );
            }
          })}
        </div>
        <button type="submit" className="mt-4 btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
