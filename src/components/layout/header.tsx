"use client";

import {
  Bell,
  Home,
  LineChart,
  LogOut,
  Package,
  Package2,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/app-context';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useSidebar } from '@/hooks/use-sidebar';
import { navItems, superAdminNavItems } from './nav-items';

export function Header() {
  const { user, setUser } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <Button
            size="icon"
            variant="outline"
            className="sm:hidden"
            onClick={toggleSidebar}
        >
            <Shield className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
        </Button>
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full h-8 w-8"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.avatar}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="mr-2 h-4 w-4"/>
                Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4"/>
                Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
