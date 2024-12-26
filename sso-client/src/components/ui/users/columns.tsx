"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"

import { redirect } from 'next/navigation'
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types/user"
import { DataTableColumnHeader } from "@/components/colunm-header"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      return row.index + 1;
    }
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    )
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FirstName" />
    )
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LastName" />
    )
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EmailVerified" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return(
        <Badge
        variant={user.emailVerified ? 'default' : 'secondary'}
        >
        {user.emailVerified ? 'Verified' : 'Unverified'}
      </Badge>
      );
    },
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Enabled" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return(
        <Badge
        variant={user.enabled ? 'default' : 'secondary'}
        >
        {user.enabled ? 'Verified' : 'Unverified'}
      </Badge>
      );
    },
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DateOfBirth" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return(new Date(user.attributes?.DateOfBirth).toLocaleDateString('th-TH') || '');
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return(user.attributes?.Gender);
    },
  },
  {
    accessorKey: "nationalidcard",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NationalIDCard" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return(user.attributes?.NationalIDCard);
    },
  },
  {
    id: "actions",
    // accessorKey: "Actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => redirect(`/users/${user.id}`)}
            >
              View user details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]