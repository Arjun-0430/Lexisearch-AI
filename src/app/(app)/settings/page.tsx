"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

export default function SettingsPage() {
    
    const cardVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut'
            }
        })
    };
    
    return (
        <>
            <PageHeader title="Settings" description="Configure your application preferences" />
            <div className="grid gap-8">
                <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariant}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Admin User" className="bg-white/50 dark:bg-zinc-800/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="admin@global-legal.com" className="bg-white/50 dark:bg-zinc-800/50" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </motion.div>
                
                <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariant}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Manage how you receive notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <Switch id="email-notifications" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="push-notifications">Push Notifications</Label>
                                <Switch id="push-notifications" />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="monthly-reports">Monthly Reports</Label>
                                <Switch id="monthly-reports" defaultChecked />
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </motion.div>
                 <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariant}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the look and feel of the application.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Theme</Label>
                                <Select defaultValue="system">
                                    <SelectTrigger id="theme" className="bg-white/50 dark:bg-zinc-800/50">
                                        <SelectValue placeholder="Select theme" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-glass border-glass">
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>Apply Theme</Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}
