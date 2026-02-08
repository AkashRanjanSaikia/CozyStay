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
          className="group flex items-center gap-2 p-1 rounded-full border border-transparent hover:bg-accent hover:border-border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={user?.name ? `User menu for ${user.name}` : "User menu"}
        >
          <div className="bg-secondary p-2 rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-background group-hover:scale-105 transition-all duration-300 shadow-sm ring-1 ring-transparent group-hover:ring-border">
            <CircleUserRound className="w-6 h-6" strokeWidth={1.75} />
          </div>
          {user?.name && (
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground pr-3 hidden sm:block transition-colors duration-300">
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
