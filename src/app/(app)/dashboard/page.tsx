import { FileText, Shield, Code, Users } from 'lucide-react';
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

  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back to LexiSearch AI." />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard title="Total Cases" value={cases.length.toLocaleString()} icon={FileText} />
        <StatCard title="High-Risk Cases" value={cases.filter(c => c.riskLevel === 'High').length} icon={Shield} color="red" />
        <StatCard title="AI Models Active" value={aiModels.filter(m => m.status === 'Active').length} icon={Code} color="purple" aiEnhanced />
        <StatCard title="Active Users" value={users.length} icon={Users} color="blue" />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-8">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Cases</CardTitle>
              <CardDescription>
                An overview of the most recently added cases.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/search">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cases.slice(0, 4).map((c) => (
                <div key={c.CNR} className="flex items-center justify-between space-x-4 p-2 rounded-lg hover:bg-muted">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                           <FileText className="h-6 w-6 text-muted-foreground" />
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
        <Card>
            <CardHeader>
                <CardTitle>AI Model Status</CardTitle>
                <CardDescription>Performance of active AI models.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
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
      </div>
    </>
  );
}
