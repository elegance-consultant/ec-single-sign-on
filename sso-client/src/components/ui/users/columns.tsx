"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types/user"
import { DataTableColumnHeader } from "@/components/colunm-header"
import { DataTableRowActions } from "./data-table-row-actions"

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
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original;
        return <DataTableRowActions id={user.id.toString()} />
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
            return (
              <Badge
                variant={user.emailVerified ? 'default' : 'secondary'}
                className={user.emailVerified ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
              >
                {user.emailVerified ? 'Verified' : 'UnVerified'}
              </Badge>
            );
          },
        });
        break;
      case 'enabled':
        dynamic_column.push({
          accessorKey: field,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title='สถานะบัญชี' />
          ),
          cell: ({ row }) => {
            const user = row.original
            return (
              <Badge
                variant={user.enabled ? 'default' : 'secondary'}
                className={user.enabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
              >
                {user.enabled ? 'Active' : 'Blacklist'}
              </Badge>
            );
          },
        });
        break;
      // case 'attributes':
      //   break;

      //Fixed field display Tables User is undefined
      case 'attributes':
        dynamic_column.push({
          accessorKey: 'NationalIDCard',
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title='IDCard' />
          ),
          cell: ({ row }) => {
            const user = row.original;
            if (user.attributes?.NationalIDCard == undefined) {
              return '';
            } else {
              return user.attributes?.NationalIDCard ?? '';
            }
          }
        },
        {
          accessorKey: 'Telephone',
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Phone' />
          ),
          cell: ({ row }) => {
            const user = row.original;
            if (user.attributes?.Telephone == undefined) {
              return '';
            } else {
              return user.attributes?.Telephone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') ?? '';
            }
          }
        });
        break;
      case 'createdTimestamp':
        dynamic_column.push({
          accessorKey: field,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title='วันเวลาที่สร้างบัญชี' />
          ),
          cell: ({ row }) => {
            const timestamp = row.original[field];
            return timestamp ? new Date(Number(timestamp)).toLocaleString() : '';
          },
        });
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
            return user?.[field] ? user?.[field].toString() : '';
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
