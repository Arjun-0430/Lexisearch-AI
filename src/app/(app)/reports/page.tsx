import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, Filter, MoreHorizontal, PlusCircle } from "lucide-react";

const reports = [
    { id: "REP-001", name: "Quarterly Case Analysis", type: "Analytics", date: "2024-07-28", status: "Generated" },
    { id: "REP-002", name: "High-Risk Profile Summary", type: "Risk Assessment", date: "2024-07-27", status: "Generated" },
    { id: "REP-003", name: "Annual Financial Compliance", type: "Compliance", date: "2024-07-25", status: "Generated" },
    { id: "REP-004", name: "Monthly Search Log", type: "Audit", date: "2024-07-20", status: "Generated" },
    { id: "REP-005", name: "Q3 Forecast", type: "Analytics", date: "2024-07-15", status: "Draft" },
];

export default function ReportsPage() {
    return (
        <>
            <PageHeader title="Reports" description="Generate and manage comprehensive legal reports">
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Report
                    </Button>
                </div>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>View and download your previously generated reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date Generated</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">{report.name}</TableCell>
                                    <TableCell>{report.type}</TableCell>
                                    <TableCell>{report.date}</TableCell>
                                    <TableCell>{report.status}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-glass border-glass">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Download</DropdownMenuItem>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-5</strong> of <strong>24</strong> reports
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
