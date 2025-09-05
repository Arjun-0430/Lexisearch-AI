"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAppContext } from '@/context/app-context';
import { SidebarProvider } from '@/hooks/use-sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
        </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
