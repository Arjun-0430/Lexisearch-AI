
"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTenants } from "@/lib/data";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { motion } from 'framer-motion';

export default function TenantManagementPage() {
    const tenants = getTenants();

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.5,
                ease: 'easeOut'
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <PageHeader title="Tenant Management" description="Manage multi-tenant organizations." />
            <motion.div className="space-y-8" variants={cardVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Tenant</CardTitle>
                            <CardDescription>Create a new tenant organization in the system.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div className="space-y-2">
                                    <label htmlFor="tenantName">Tenant Name</label>
                                    <Input id="tenantName" placeholder="Enter tenant name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="domain">Domain</label>
                                    <Input id="domain" placeholder="tenant.com" />
                                </div>
                                <Button><Plus className="h-4 w-4 mr-2"/>Add Tenant</Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>All Tenants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Domain</TableHead>
                                        <TableHead>Users</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tenants.map(tenant => (
                                        <TableRow key={tenant.id}>
                                            <TableCell className="font-medium">{tenant.name}</TableCell>
                                            <TableCell>{tenant.domain}</TableCell>
                                            <TableCell>{tenant.users}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={tenant.status} />
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Edit3 className="h-4 w-4"/>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Table>
                    </CardContent>
                </Card>
                </motion.div>
            </motion.div>
        </>
    )
}
