"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export function UserAccountNav({session}) {

  const supabase = createClientComponentClient();
  const {toast} = useToast()

  // console.log(session?.user?.email);
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/')
    toast({
      title: "Sign Out Successful"
    });
  
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ">
        <UserAvatar className="h-8 w-8  " />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{session?.user?.user_metadata.username}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/forms">Forms</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            console.log("sign out !!");
            handleSignOut()
            router.push("/");
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
