'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User, UserFormData } from '../types/user';

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => void;
  mode: 'add' | 'edit';
}

export function UserForm({ user, onSubmit, mode }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    id: user?.id || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    emailVerified: user?.emailVerified || false,
    enabled: user?.enabled || false,
    attributes: user?.attributes || {
      DateOfBirth: [''],
      addr_PostCode: [''],
      addr_District: [''],
      Telephone: [''],
      addr_Province: [''],
      addr_Address: [''],
      NationalIDCard: [''],
      Gender: [''],
      addr_SubDistrict: ['']
    },
    credentials: user?.credentials || [{ type: 'password', value: '', temporary: false }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    console.log(formData);
    
    // try {
    //   const formUser = fetch('/api/users/create', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: ''
    //   })

    // } catch (error) {
      
    // }
  };

  // Convert datetime to date format for the input field
  const getFormattedDate = (datetime: string) => datetime ? datetime.substring(0, 10) : '';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={mode === 'add' ? 'default' : 'outline'}>
          {mode === 'add' ? 'Add User' : 'Edit'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.credentials[0].value}
              onChange={(e) => setFormData({ ...formData, credentials: [{ ...formData.credentials[0], value: e.target.value }] })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailVerified">Email Verified</Label>
            <Select
              value={formData.emailVerified.toString()}
              onValueChange={(value) => setFormData({ ...formData, emailVerified: value === 'true' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select email verification status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Verified</SelectItem>
                <SelectItem value="false">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="enabled">Status</Label>
            <Select
              value={formData.enabled.toString()}
              onValueChange={(value) => setFormData({ ...formData, enabled: value === 'true' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthday">BirthDay</Label>
            <Input
              id="birthday"
              type="date"
              value={getFormattedDate(formData.attributes.DateOfBirth[0])}
              onChange={(e) => setFormData({ ...formData, attributes: { ...formData.attributes, DateOfBirth: [e.target.value] } })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {mode === 'add' ? 'Add User' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
