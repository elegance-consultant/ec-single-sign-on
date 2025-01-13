"use client"

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export default function AccessDenied() {
  const handleDeleteCookie = async () => {
    const res = await fetch('/auth/logout', {
      method: 'GET',
    });
    if (res.ok) {
      redirect('/login');
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Access Denied</h2>
        <p className="text-muted-foreground">
          Here's an overview of your business
        </p>
      </div>
      <div className="p-8 rounded-lg shadow-lg text-center">
        <img alt="A lock icon representing access denied" className="mx-auto mb-4" height="150" src="https://storage.googleapis.com/a1aa/image/epehzgDLiRsf4oz7VpOJaUgJiTYEUU3tt4IXIojPwsnyd57nA.jpg" width="150" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-4 pr-6">
          You do not have permission to view this page.
        </p>
        <Button className="bg-red-500 px-20 py-6 text-xl rounded hover:bg-red-600" onClick={handleDeleteCookie}>
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
