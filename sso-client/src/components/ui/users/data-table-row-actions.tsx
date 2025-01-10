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
import { useToast } from "@/hooks/use-toast";

interface IdProps {
  id: string
}

export function DataTableRowActions({ id }: IdProps) {
  const { toast } = useToast()
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
              {<span className="ml-2">{"View"}</span>}
              /
              <Pencil className="h-4 w-4 text-green-500" />
              {<span className="ml-2">{"Update"}</span>}
            </Link>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button variant={"ghost"} size={"sm"} className={"justify-start w-full"}
                onClick={() => {
                  toast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                  })
                }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
            {<span className="ml-2">{"Delete"}</span>}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
