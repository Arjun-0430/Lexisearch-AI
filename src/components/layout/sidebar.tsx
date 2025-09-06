
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenu,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/context/app-context';
import { navItems, superAdminNavItems } from './nav-items';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';
import { Scale } from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAppContext();
  const { collapsed } = useSidebar();

  const isNavItemActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  if (!user) return null;

  return (
     <Sidebar
        className="border-r border-glass bg-glass"
        collapsible
        side="left"
      >
      <SidebarHeader className={cn("p-4 flex items-center gap-3 transition-all duration-300 h-16 border-b border-border/50", collapsed ? "justify-center" : "justify-start")}>
        <div className="rounded-lg p-2 bg-gradient-to-r from-pink-100 to-blue-100">
           <Scale className="h-7 w-7 text-pink-500" />
        </div>
        <motion.div initial={{opacity:0, width: 0}} animate={{opacity: collapsed ? 0: 1, width: collapsed ? 0 : "auto"}} transition={{duration: 0.3}}>
            <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">LEXISEARCH AI</div>
            <div className="text-xs text-slate-500">Smarter Access</div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="!py-0">
        <SidebarMenu>
          {navItems.map((item, i) => {
            if (item.adminOnly && user.role !== 'Administrator') {
              return null;
            }
            return (
              <motion.div key={item.id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * i }}>
                <SidebarMenuItem>
                    <Link href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-all hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-800/50 dark:hover:text-slate-50", isNavItemActive(item.href) && "bg-gradient-to-r from-pink-50 to-blue-100 text-pink-600 dark:from-pink-900/50 dark:to-blue-900/50 dark:text-pink-400 font-semibold")}>
                      <item.icon className="h-5 w-5" />
                      <span className={cn(collapsed && "hidden")}>{item.label}</span>
                    </Link>
                </SidebarMenuItem>
              </motion.div>
            );
          })}
        </SidebarMenu>

        {user.isSuperAdmin && (
          <>
            <Separator className="my-4" />
             <SidebarMenu>
              {superAdminNavItems.map((item, i) => (
                 <motion.div key={item.id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * (i + navItems.length) }}>
                    <SidebarMenuItem>
                        <Link href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-all hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-800/50 dark:hover:text-slate-50", isNavItemActive(item.href) && "bg-gradient-to-r from-pink-50 to-blue-100 text-pink-600 dark:from-pink-900/50 dark:to-blue-900/50 dark:text-pink-400 font-semibold")}>
                        <item.icon className="h-5 w-5" />
                        <span className={cn(collapsed && "hidden")}>{item.label}</span>
                        </Link>
                    </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
