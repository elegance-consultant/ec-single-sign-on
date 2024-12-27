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

interface BirthDay {
  birthday: string
}

export function DateOfBirth({ birthday }: BirthDay) {
  return new Date(birthday[0]).toLocaleDateString() || '';
}

export function getColumns(dynamicFields: string[]): ColumnDef<User>[] {
    const select_column: ColumnDef<User>[] = [
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
    }
  ];

  const action_column: ColumnDef<User>[] = [
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
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
                onClick={() => navigator.clipboard.writeText(user.id.toString())}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => redirect(`/users/${user.id}`)}
              >
                View user details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }
  ];

  const dynamic_column: ColumnDef<User>[] = [];
  dynamicFields.forEach(field => {
    switch (field) {
      case 'id':
        dynamic_column.push({
          accessorKey: field,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={field} />
          ),
          cell: ({ row }) => {
            return row.index + 1;
          }
        });
        break;
      case 'emailVerified':
        dynamic_column.push({
          accessorKey: field,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={field} />
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
        });
        break;
      case 'attributes':

        break;
      case 'createdTimestamp':

        break;
      case 'enabled':

        break;
      case 'totp':

        break;
      case 'disableableCredentialTypes':

        break;
      case 'requiredActions':

        break;
      case 'notBefore':

        break;
      case 'access':

        break;
      default:
        dynamic_column.push({
            accessorKey: field,
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title={field} />
            ),
            cell: ({ row }) => {
              const user = row.original;
              return user?.[field].toString() || '';
            },
        });
        break;
    }
  });

  return [
    ...select_column,
    ...dynamic_column,
    ...action_column,
  ];
}
