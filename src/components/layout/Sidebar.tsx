'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingCart,
    History,
    Settings,
    Layers,
    X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { Button } from '@/components/ui/Button';
import { useUser } from '@clerk/nextjs';
import { isAdmin } from '@/lib/auth';
import styles from './Sidebar.module.css';

function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { label: 'Início', href: '/', icon: Package, admin: false, requireAuth: false },
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, admin: true, requireAuth: true },
    { label: 'Categorias', href: '/admin/categorias', icon: Layers, admin: true, requireAuth: true },
    { label: 'Produtos', href: '/admin/produtos', icon: Package, admin: true, requireAuth: true },
    { label: 'Clientes', href: '/admin/clientes', icon: Users, admin: true, requireAuth: true },
    { label: 'Pedidos', href: '/admin/pedidos', icon: History, admin: true, requireAuth: true },
    { label: 'Meus Pedidos', href: '/pedidos', icon: History, admin: false, requireAuth: true },
    { label: 'Meu Carrinho', href: '/carrinho', icon: ShoppingCart, admin: false, requireAuth: false },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user, isLoaded, isSignedIn } = useUser();
    const isUserAdmin = isAdmin(user);

    const filteredNavItems = navItems.filter(item => {
        if (item.requireAuth && !isSignedIn) return false;
        return true;
    });

    return (
        <>
            <div
                className={cn(styles.overlay, isOpen && styles.overlayVisible)}
                onClick={onClose}
            />
            <aside className={cn(styles.sidebar, isOpen && styles.sidebarOpen)}>
                <div className={styles.header}>
                    <span className={styles.title}>Menu</span>
                    <Button variant="ghost" size="icon" onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </Button>
                </div>

                <nav className={styles.nav}>
                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Principal</span>
                        {filteredNavItems.filter(item => !item.admin).map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(styles.navItem, isActive && styles.navItemActive)}
                                    onClick={onClose}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {isUserAdmin && (
                        <div className={styles.section}>
                            <span className={styles.sectionTitle}>Administração</span>
                            {filteredNavItems.filter(item => item.admin).map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(styles.navItem, isActive && styles.navItemActive)}
                                        onClick={onClose}
                                    >
                                        <Icon size={18} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </nav>

                <div className={styles.footer}>
                    <p className={styles.version}>v1.0.0</p>
                </div>
            </aside>
        </>
    );
}
