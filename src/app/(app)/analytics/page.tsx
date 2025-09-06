
"use client"

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';

const caseVolumeData = [
  { name: 'Jan', cases: 4000 },
  { name: 'Feb', cases: 3000 },
  { name: 'Mar', cases: 2000 },
  { name: 'Apr', cases: 2780 },
  { name: 'May', cases: 1890 },
  { name: 'Jun', cases: 2390 },
  { name: 'Jul', cases: 3490 },
];

const riskLevelData = [
  { name: 'Low Risk', value: 400, fill: 'var(--color-green)' },
  { name: 'Medium Risk', value: 300, fill: 'var(--color-yellow)' },
  { name: 'High Risk', value: 200, fill: 'var(--color-red)' },
];

const resolutionTimeData = [
    { name: 'Q1 23', time: 120 },
    { name: 'Q2 23', time: 110 },
    { name: 'Q3 23', time: 115 },
    { name 'Q4 23', time: 105 },
    { name: 'Q1 24', time: 95 },
    { name: 'Q2 24', time: 92 },
];


export default function AnalyticsPage() {

    const chartVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
                ease: 'easeOut'
            }
        })
    };

    return (
        <>
            <PageHeader title="Analytics" description="Comprehensive insights and performance metrics" />
            <div className="grid gap-8">
                <motion.div custom={0} initial="hidden" animate="visible" variants={chartVariant}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Case Volume Trends</CardTitle>
                            <CardDescription>Monthly volume of new cases registered.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={caseVolumeData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip contentStyle={{
                                            backgroundColor: 'hsl(var(--background) / 0.8)',
                                            backdropFilter: 'blur(4px)',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: 'var(--radius)'
                                        }} />
                                        <Legend />
                                        <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                     <motion.div custom={1} initial="hidden" animate="visible" variants={chartVariant}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Case Risk Distribution</CardTitle>
                                <CardDescription>Distribution of cases by AI-assessed risk level.</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={riskLevelData} layout="vertical">
                                         <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={80}/>
                                        <Tooltip contentStyle={{
                                            backgroundColor: 'hsl(var(--background) / 0.8)',
                                            backdropFilter: 'blur(4px)',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: 'var(--radius)'
                                        }}/>
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                            {riskLevelData.map((entry, index) => (
                                                <Bar key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                     <motion.div custom={2} initial="hidden" animate="visible" variants={chartVariant}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Resolution Time</CardTitle>
                                <CardDescription>Average time in days to case resolution.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={resolutionTimeData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip contentStyle={{
                                                backgroundColor: 'hsl(var(--background) / 0.8)',
                                                backdropFilter: 'blur(4px)',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: 'var(--radius)'
                                            }} />
                                            <Legend />
                                            <Line type="monotone" dataKey="time" name="Days" stroke="hsl(var(--primary))" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                     </motion.div>
                </div>
            </div>
        </>
    );
}
