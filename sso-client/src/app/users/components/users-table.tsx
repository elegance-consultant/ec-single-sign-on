'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserForm } from './user-form';
import { UserActions } from './user-actions';
import { UsersGrid } from './users-grid';
import { User, UserFormData } from '../types/user';

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleAddUser = (data: UserFormData) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'Active',
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (id: string, data: UserFormData) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, ...data } : user
    ));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <UserForm mode="add" onSubmit={handleAddUser} />
      </div>

      {/* Desktop view */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.enabled ? 'default' : 'secondary'}
                  >
                    {user.enabled ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <UserForm
                      mode="edit"
                      user={user}
                      onSubmit={(data) => handleEditUser(user.id, data)}
                    />
                    <UserActions onDelete={() => handleDeleteUser(user.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <UsersGrid
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </div>
  );
}
