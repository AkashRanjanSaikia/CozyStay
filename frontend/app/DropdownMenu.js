"use client";

import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./context/usercontext";

export function DropdownMenuDemo() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="group flex items-center gap-2 p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label={user?.name ? `User menu for ${user.name}` : "User menu"}
        >
          <CircleUserRound className="w-6 h-6 " />
          {user?.name && (
            <span className="text-sm font-medium pr-2 hidden sm:block">
              {user.name.split(" ")[0]}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/my-bookings")}>Your Bookings</DropdownMenuItem>
          {user?.role === "manager" && ( <>
            <DropdownMenuItem onClick={() => router.push("/manager/dashboard")}>Manager Dashboard</DropdownMenuItem>
            </>
          )}
          {user?.role === "user" && (
            <DropdownMenuItem onClick={() => router.push("/register")}>Register as Manager</DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => router.push("/my-favourites")}>Your Favourite Hotels</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
