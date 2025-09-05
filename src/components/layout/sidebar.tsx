"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/context/app-context';
import { navItems, superAdminNavItems } from './nav-items';
import { Button } from '../ui/button';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAppContext();

  const isNavItemActive = (href: string) => {
    return pathname === href;
  };

  if (!user) return null;

  return (
     <Sidebar
      className="border-r hidden sm:flex"
      collapsible="icon"
      side="left"
    >
      <SidebarHeader className="p-2">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
                <Shield />
                <span className="sr-only">LexiSearch AI</span>
            </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            if (item.adminOnly && user.role !== 'Administrator') {
              return null;
            }
            return (
              <SidebarMenuItem key={item.id}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={isNavItemActive(item.href)}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {user.isSuperAdmin && (
          <>
            <Separator className="my-4" />
            <SidebarMenu>
              {superAdminNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={isNavItemActive(item.href)}
                      tooltip={{ children: item.label }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
