"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { DataTableViewOptions } from "@/components/column-toggle";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/pagination";
import Papa from "papaparse";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalUsers: number;
  totalPages: number;
  page: number;
  pageSize: number;
  search: string;
  nationalIDCard: string;
  searchType: string;
  phone: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalUsers,
  totalPages,
  page,
  pageSize,
  search,
  nationalIDCard,
  searchType,
  phone,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdTimestamp: false,
    // next: false,
    // plus: false,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedSearchType, setSelectedSearchType] = useState(searchType);
  const [searchValue, setSearchValue] = useState(search);
  const [nationalIDValue, setNationalIDValue] = useState(nationalIDCard);

  const handleSearchTypeChange = (value: string) => {
    setSelectedSearchType(value);
    if (value === 'refresh') {
      setSearchValue('');
      setNationalIDValue('');
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  function downloadCSV<T>(data: T[], filename: string = "data.csv") {
    const csv = "\ufeff" + Papa.unparse(data);
    const csvFile = new Blob([csv], { type: "text/csv;charset=UTF-16LE;" });
    const downloadLink = document.createElement("a");

    downloadLink.setAttribute("href", URL.createObjectURL(csvFile));
    downloadLink.setAttribute("download", filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const handleExportCSV = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const rowsToExport =
      selectedRows && selectedRows.length > 0
        ? selectedRows
        : table.getRowModel().rows;

    const csvData = rowsToExport.map((row) => {
      const original = row.original;
      const flattened: any = {};

      function flattenObject(obj: any, prefix = "") {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            let propName = prefix
              ? (Array.isArray(obj) ? `${prefix}` : `${prefix}.${key}`)
              : key;
            switch (propName) {
              case 'totp': break;
              case 'notBefore': break;
              case 'disableableCredentialTypes': break;
              case 'requiredActions': break;
              case 'access.manageGroupMembership': break;
              case 'access.view': break;
              case 'access.mapRoles': break;
              case 'access.impersonate': break;
              case 'access.manage': break;
              case 'access': break;
              case propName:
                propName = key;
                if (typeof obj[key] === "object" && obj[key] !== null) {
                  flattenObject(obj[key], propName);
                } else {
                  if (Array.isArray(obj)) {
                    flattened[prefix] = obj;
                  } else {
                    flattened[propName] = obj[key];
                  }
                }
              default:
                break;
            }
          }
        }
      }

      flattenObject(original);
      return flattened;
    });

    downloadCSV(csvData, "users.csv");
  };

  return (
    <div className="rounded-md">
      <div>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          {/* <Input
            type="text"
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
          /> */}
          <form method="GET" action="users" className="flex grid-cols-2">
            <Select name="searchType" defaultValue={selectedSearchType} onValueChange={handleSearchTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-email">Name/Email</SelectItem>
                <SelectItem value="national-id">National ID Card</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>

            {selectedSearchType === 'name-email' ? (
              <Input
                type="text"
                name="search"
                placeholder="Search users by name or email..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="max-w-sm ml-2"
              />
            ) : selectedSearchType === 'national-id' ? (
              <Input
                type="text"
                name="q"
                placeholder="Search users by National ID Card..."
                value={nationalIDValue}
                onChange={(e) => setNationalIDValue(e.target.value)}
                className="max-w-sm ml-2"
              />
            ) : (
              <Input
                type="text"
                name="q"
                placeholder="Search users by phone..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="max-w-sm ml-2"
              />
            )}

            <Button type="submit" className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 dark:text-white">
              Search
            </Button>
          </form>

          <div className="flex justify-end">
            <DropdownMenu>
              <Button className="bg-gray-500 hover:bg-gray-600 text-white dark:bg-gray-500 hover:dark:bg-gray-600" onClick={handleExportCSV}>Export CSV</Button>
              <DataTableViewOptions table={table} />
              {/* <Button className="ml-5 bg-sky-900 hover:bg-sky-800 dark:text-white" onClick={() => redirect('/users/create')}>+ Create new user</Button> */}
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-2">
        <DataTablePagination table={table} totalUsers={totalUsers} totalPages={totalPages} page={page} pageSize={pageSize} className="flex-col md:flex-row" />
      </div>
    </div>
  );
}
