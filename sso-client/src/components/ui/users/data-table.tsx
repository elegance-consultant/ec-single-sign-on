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
import { redirect } from "next/navigation";
import { DataTablePagination } from "@/components/pagination";
import Papa from "papaparse";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdTimestamp: false,
  });
  const [globalFilter, setGlobalFilter] = useState("");

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
            const propName = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === "object" && obj[key] !== null) {
              flattenObject(obj[key], propName);
            } else {
              flattened[propName] = obj[key];
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
          <div className="flex gap-4 max-w-sm">
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <DropdownMenu>
                <Button className="bg-gray-500 hover:bg-gray-600 text-white dark:bg-gray-500 hover:dark:bg-gray-600" onClick={handleExportCSV}>Export CSV</Button>
                <DataTableViewOptions table={table} />
                <Button className="ml-5 bg-sky-900 hover:bg-sky-800 dark:text-white" onClick={() => redirect('/users/create')}>+ Create new user</Button>
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
        <DataTablePagination table={table} className="flex-col md:flex-row" />
      </div>
    </div>
  );
}
