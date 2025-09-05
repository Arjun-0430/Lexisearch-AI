import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
    return (
        <>
            <PageHeader title="Billing" description="Manage invoices and billing information" />
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This page is under construction.</p>
                </CardContent>
            </Card>
        </>
    );
}
