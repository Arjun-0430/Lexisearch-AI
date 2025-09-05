import { Home, Search, Shield, FileText, BarChart3, Bell, CreditCard, Brain, Code, Settings, Building2, Users2, Cpu, Server } from "lucide-react";

export const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard', adminOnly: false },
    { id: 'search', label: 'Global Search', icon: Search, href: '/search', adminOnly: false },
    { id: 'risk-profile', label: 'Risk Profile', icon: Shield, href: '/risk-profiles', adminOnly: false },
    { id: 'reports', label: 'Reports', icon: FileText, href: '/reports', adminOnly: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', adminOnly: false },
    { id: 'alerts', label: 'Alerts', icon: Bell, href: '/alerts', adminOnly: false },
    { id: 'billing', label: 'Billing', icon: CreditCard, href: '/billing', adminOnly: false },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, href: '/ai-insights', adminOnly: false },
    { id: 'api-dashboard', label: 'API Dashboard', icon: Code, href: '/api-dashboard', adminOnly: true },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', adminOnly: true },
];

export const superAdminNavItems = [
    { id: 'tenant-management', label: 'Tenant Management', icon: Building2, href: '/tenant-management', adminOnly: true },
    { id: 'user-management', label: 'User Management', icon: Users2, href: '/user-management', adminOnly: true },
    { id: 'ai-models', label: 'AI Models', icon: Cpu, href: '/ai-models', adminOnly: true },
    { id: 'system-monitoring', label: 'System Monitoring', icon: Server, href: '/system-monitoring', adminOnly: true },
];
