
import { Home, Search, Shield, FileText, BarChart3, Bell, CreditCard, Brain, Code, Settings, Building2, Users2, Cpu, Server } from "lucide-react";
import type { Role } from "@/lib/types";

export const allRoles: Role[] = [
    'Platform Super Admin', 'Customer Super Admin', 'Admin', 
    'Legal Advisor', 'HR Advisor', 'Finance Advisor', 'Purchase Advisor', 
    'Administrative Advisor', 'User'
];
export const adminRoles: Role[] = ['Platform Super Admin', 'Customer Super Admin', 'Admin'];

export const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard', allowedRoles: allRoles },
    { id: 'search', label: 'Global Search', icon: Search, href: '/search', allowedRoles: allRoles },
    { id: 'risk-profile', label: 'Risk Profile', icon: Shield, href: '/risk-profiles', allowedRoles: allRoles },
    { id: 'reports', label: 'Reports', icon: FileText, href: '/reports', allowedRoles: allRoles },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', allowedRoles: allRoles },
    { id: 'alerts', label: 'Alerts', icon: Bell, href: '/alerts', allowedRoles: allRoles },
    { id: 'billing', label: 'Billing', icon: CreditCard, href: '/billing', allowedRoles: ['Customer Super Admin', 'Admin', 'Finance Advisor', 'Purchase Advisor'] },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, href: '/ai-insights', allowedRoles: allRoles },
    { id: 'api-dashboard', label: 'API Dashboard', icon: Code, href: '/api-dashboard', allowedRoles: adminRoles },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', allowedRoles: allRoles },
];

export const superAdminNavItems = [
    { id: 'tenant-management', label: 'Tenant Management', icon: Building2, href: '/tenant-management' },
    { id: 'user-management', label: 'User Management', icon: Users2, href: '/user-management' },
    { id: 'ai-models', label: 'AI Models', icon: Cpu, href: '/ai-models' },
    { id: 'system-monitoring', label: 'System Monitoring', icon: Server, href: '/system-monitoring' },
];
