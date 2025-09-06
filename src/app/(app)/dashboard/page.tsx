
"use client";

import { FileText, Shield, Cpu, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/shared/stat-card';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getCases, getAIModels, getUsers } from '@/lib/data';
import { Case, AIModel, User } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { RiskBadge } from '@/components/shared/risk-badge';
import { StatusBadge } from '@/components/shared/status-badge';

export default function DashboardPage() {
  const cases: Case[] = getCases();
  const aiModels: AIModel[] = getAIModels();
  const users: User[] = getUsers();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <>
      <PageHeader title="Overview" description="Welcome back to your LEXISEARCH AI Dashboard." />
      
      <motion.div 
        className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}><StatCard title="Total Cases" value={cases.length.toLocaleString()} icon={FileText} /></motion.div>
        <motion.div variants={itemVariants}><StatCard title="High-Risk Cases" value={cases.filter(c => c.riskLevel === 'High').length} icon={Shield} color="red" /></motion.div>
        <motion.div variants={itemVariants}><StatCard title="AI Models Active" value={aiModels.filter(m => m.status === 'Active').length} icon={Cpu} color="purple" aiEnhanced /></motion.div>
        <motion.div variants={itemVariants}><StatCard title="Active Users" value={users.length} icon={Users} color="blue" /></motion.div>
      </motion.div>

      <motion.div 
        className="grid gap-8 mt-8 md:grid-cols-1 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Cases</CardTitle>
                <CardDescription>An overview of the most recently added cases.</CardDescription>
              </div>
              <Button asChild size="sm" variant="ghost" className="ml-auto gap-1">
                <Link href="/search">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cases.slice(0, 4).map((c) => (
                  <div key={c.CNR} className="flex items-center justify-between space-x-4 p-2 rounded-lg hover:bg-white/80 dark:hover:bg-zinc-800/80">
                      <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 p-3 bg-slate-100 dark:bg-zinc-800 rounded-lg">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                              <p className="text-sm font-medium leading-none">{c.Party_Name}</p>
                              <p className="text-sm text-muted-foreground">{c.CNR}</p>
                          </div>
                      </div>
                      <div>
                           {c.riskLevel && <RiskBadge level={c.riskLevel} />}
                      </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
              <CardHeader>
                  <CardTitle>AI Model Status</CardTitle>
                  <CardDescription>Performance of active AI models.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                  {aiModels.filter(m => m.status === 'Active').slice(0,3).map(model => (
                      <div key={model.id} className="flex items-center justify-between">
                          <div>
                              <p className="font-medium">{model.name}</p>
                              <p className="text-sm text-muted-foreground">{model.type}</p>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={model.status} />
                            <p className="text-sm font-semibold mt-1">{model.accuracy}% Acc.</p>
                          </div>
                      </div>
                  ))}
              </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
}
