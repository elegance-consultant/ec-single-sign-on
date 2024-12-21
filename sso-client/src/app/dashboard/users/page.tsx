import { UsersTable } from './components/users-table';

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">Manage your users here</p>
      </div>
      <UsersTable />
    </div>
  );
}