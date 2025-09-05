import { notFound } from 'next/navigation';
import { getCaseByCnr } from '@/lib/data';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Download, Share2, Printer, ChevronLeft, Sparkles, Zap, Shield, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskBadge } from '@/components/shared/risk-badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface CaseDetailPageProps {
  params: {
    cnr: string;
  };
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  const caseDetails = getCaseByCnr(params.cnr);

  if (!caseDetails) {
    notFound();
  }

  const detailItems = [
    { label: 'State', value: caseDetails.State },
    { label: 'District', value: caseDetails.District },
    { label: 'Establishment', value: caseDetails.Establishment },
    { label: 'Case Number', value: caseDetails.Case_Number },
    { label: 'Date of Registration', value: caseDetails.Date_of_Registration },
    { label: 'Purpose Name', value: caseDetails.Purpose_Name },
    { label: 'Next Date', value: caseDetails.Next_Date || 'N/A' },
    { label: 'Disposal Nature', value: caseDetails.Disposal_Nature },
    { label: 'Date of Decision', value: caseDetails.Date_of_Decision || 'N/A' },
  ];

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/search">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {caseDetails.Party_Name}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-2"/>Print</Button>
          <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2"/>Share</Button>
          <Button size="sm"><Download className="h-4 w-4 mr-2"/>Download PDF</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
              <CardDescription>{caseDetails.CNR}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailItems.map(item => (
                    <div key={item.label}>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-primary">AI Analysis</p>
                            <p className="text-sm">{caseDetails.aiInsights}</p>
                        </div>
                    </div>
                </div>
                 <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                    <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-accent">AI Decision Recommendation</p>
                            <p className="text-sm">{caseDetails.aiDecision}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Risk Level</span>
                {caseDetails.riskLevel && <RiskBadge level={caseDetails.riskLevel} />}
              </div>
               <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Risk Score</span>
                <span>{caseDetails.riskScore}%</span>
              </div>
              <Separator/>
              <Button variant="outline">View Full Profile</Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>PII / SPPI Data</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <Lock className="h-4 w-4"/>
                    <span className="text-sm text-muted-foreground">Data is masked for security.</span>
                </div>
                <Button>
                    <Shield className="h-4 w-4 mr-2"/>
                    Authorize to View
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
