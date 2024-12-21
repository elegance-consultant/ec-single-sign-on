'use client';

import { UserCard } from './user-card';
import { User } from '../types/user';

interface UsersGridProps {
  users: User[];
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

export function UsersGrid({ users, onEdit, onDelete }: UsersGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}