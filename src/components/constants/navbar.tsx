import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "@/components/images/logo.png";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Image
          src={logo}
          height={150}
          width={150}
          alt="logo"
          // className="h-6 w-6"
        />
        {/* <span className="text-2xl font-bold text-primary">Logo</span> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-2 py-4"
          >
            <Avatar className="h-8 w-8 bg-secondary items-center justify-center">
              <User className="h-4 w-4" />
            </Avatar>
            <span className="hidden sm:inline text-primary">
              Shreedhar Joshi
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
