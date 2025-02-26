"use client";

import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface IdProps {
  id: string
}

export function DataTableRowActions({ id }: IdProps) {

  const router = useRouter();
  const Swal = require('sweetalert2');
  const handleDelete = () => {
    const deleteUser = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600",
        cancelButton: "bg-red-600"
      },
      buttonsStyling: true
    });

    deleteUser.fire({
      title: "ต้องการลบบัญชีผู้ใช้",
      text: "ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true
    }).then((result: { isConfirmed: boolean; dismiss: boolean; }) => {
      if (result.isConfirmed) {
        deleteUser.fire({
          title: "ลบบัญชีผู้ใช้สำเร็จ",
          icon: "success",
          confirmButtonText: "ยืนยัน",
        }).then(async () => {
          const deleteUser = await fetch(`api/user/delete/${id}`, {
            method: 'GET'
          })
          if (deleteUser.ok) {
            router.refresh();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        deleteUser.fire({
          title: "ยกเลิกรายการ",
          icon: "error",
          confirmButtonText: "ยืนยัน",
        });
      }
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">{"Open Menu"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button variant={"ghost"} size={"sm"} className={"justify-start w-full"} asChild>
            <Link href={`/users/${id}`}>
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="ml-2">{"View"}</span>
              {/* /
              <Pencil className="h-4 w-4 text-green-500" />
              <span className="ml-2">{"Update"}</span> */}
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button 
            variant={"ghost"} 
            size={"sm"} 
            className={"justify-start w-full"}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
            <span className="ml-2">{"Delete"}</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
