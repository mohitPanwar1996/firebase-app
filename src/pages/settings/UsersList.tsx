import { UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";

export default function UserList() {
  return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="max-w-6xl w-full mx-auto grid gap-2">
            <h1 className="font-semibold text-3xl">Users</h1>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 dark:text-gray-400">Manage the users.</p>
              <Button>Add User</Button>
            </div>
          </div>
          <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
            <div className="grid gap-6">
              <Card>
                <CardContent>
                  <div className="grid gap-4">
                    <UserRow name="John Doe" email="john@example.com" role="Admin" />
                    <UserRow name="Jane Smith" email="jane@example.com" role="Manager" />
                    <UserRow name="Bob Johnson" email="bob@example.com" role="User" />
                    <UserRow name="Sarah Lee" email="sarah@example.com" role="User" />
                    <UserRow name="Michael Chen" email="michael@example.com" role="Manager" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
  );
}

function UserRow({ name, email, role }:any) {
  return (
    <div className="grid grid-cols-[40px_1fr_1fr_1fr] items-center gap-4 bg-gray-100 px-4 py-2 rounded-md dark:bg-gray-800">
      <div className="flex items-center justify-center rounded-full bg-gray-200 w-8 h-8 dark:bg-gray-700">
        <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <p className="font-medium">{name}</p>
      <p className="text-gray-500 dark:text-gray-400">{email}</p>
      <p className="text-gray-500 dark:text-gray-400">{role}</p>
    </div>
  );
}
