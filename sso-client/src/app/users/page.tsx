import { cookies } from 'next/headers';
import { UsersTable } from './components/users-table';

export default async function UsersPage() {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('token');
  const jwtCookie_str = jwtCookie?.value;
  const response = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtCookie_str}`
    },
  });
  const data = await response.json(); // Await the response.json() call
  // console.log(data); //obj
  const tbheader: string[] = [];
  Object.entries(data[0]).forEach(([key, value]) => {
    // console.log(`${key} ${value}`);
    tbheader.push(key)
  });
  // console.log(typeof(tbheader));
  

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">Manage your users here</p>
      </div>
      <UsersTable users={data} tbHead={tbheader} />
    </div>
  );
}
