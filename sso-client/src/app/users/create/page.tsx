import CreateUserForm from "@/components/ui/users/add-user";

export default function Page() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Create New User</h2>
            </div>
            <CreateUserForm />
        </div>
    );
}