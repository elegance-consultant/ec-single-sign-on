import DisplayUser from "@/components/display-user";
import CreateUserForm from "@/components/ui/users/add-user";

export default function Page() {
    return(
        <div className="space-y-8 py-6 pr-6">
            <div className='grid grid-cols-2'>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create New User</h2>
                </div>
                <div className="justify-self-end">
                    <DisplayUser />
                </div>
            </div>
            <CreateUserForm />
        </div>
    );
}