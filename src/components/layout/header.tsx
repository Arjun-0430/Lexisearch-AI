
"use client";

import { Bell, LogOut, PanelLeftClose, PanelLeftOpen, Search, Settings } from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/app-context';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useSidebar } from '@/hooks/use-sidebar';

export function Header() {
  const { user, setUser } = useAppContext();
  const router = useRouter();
  const { toggleSidebar, collapsed } = useSidebar();

  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 px-4 sm:px-6 shrink-0 bg-background/80 backdrop-blur-sm border-b border-border/50">
       <Button
            size="icon"
            variant="ghost"
            onClick={toggleSidebar}
        >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
        </Button>
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for cases, parties, or records..."
          className="w-full rounded-lg bg-white/80 dark:bg-zinc-800/80 pl-8 md:w-[280px] lg:w-[400px] shadow-inner"
        />
      </div>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="overflow-hidden rounded-full h-9 w-9 p-0"
            >
              <Avatar className="h-9 w-9 border-2 border-white dark:border-zinc-700">
                <AvatarFallback>{user?.avatar}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-glass border-glass">
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
