
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AppSidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAppContext } from '@/context/app-context';
import { SidebarProvider, useSidebar } from '@/hooks/use-sidebar';
import { SplashScreen } from '@/components/layout/splash-screen';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAppContext();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const { collapsed } = useSidebar();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);
  
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3000); // splash duration
    return () => clearTimeout(t);
  }, []);

  if (!user) {
    return (
        <AnimatePresence>
            {showSplash && <SplashScreen />}
        </AnimatePresence>
    )
  }

  const mainVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
      <div className={`relative w-full h-screen overflow-hidden ${showSplash ? 'pointer-events-none' : ''}`}>
        <AnimatePresence>
            {showSplash && <SplashScreen />}
        </AnimatePresence>
        
        <AppSidebar />
        
        <div className={cn("relative h-full transition-all duration-300 ease-in-out", collapsed ? "pl-14" : "pl-52")}>
            <Header />
            <main className="absolute inset-x-0 top-16 bottom-0 overflow-y-auto p-4 sm:p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div 
                    key={router.pathname}
                    variants={mainVariants} 
                    initial="hidden" 
                    animate="visible" 
                    exit="exit"
                    className="max-w-7xl mx-auto w-full"
                >
                    {children}
                </motion.div>
              </AnimatePresence>
            </main>
        </div>

        <div className="fixed right-8 bottom-8 z-40">
          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.5 } }} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-2xl shadow-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium flex items-center gap-2">
            <Plus size={20} />
            Add Case
          </motion.button>
        </div>
      </div>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  )
}
