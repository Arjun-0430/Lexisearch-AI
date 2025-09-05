import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <>
            <PageHeader title="Settings" description="Configure your application preferences" />
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
