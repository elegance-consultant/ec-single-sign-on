import CreateUser from "@/components/ui/users/create";

export default function createUser() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateUser />
      </div>
    </div>
  );
}
