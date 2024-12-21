'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { UserForm } from './user-form';
import { UserActions } from './user-actions';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{user.name}</h3>
          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
            {user.status}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
        </div>
        <div className="flex space-x-2 pt-2">
          <UserForm
            mode="edit"
            user={user}
            onSubmit={(data) => onEdit(user.id, data)}
          />
          <UserActions onDelete={() => onDelete(user.id)} />
        </div>
      </div>
    </Card>
  );
}