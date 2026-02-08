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
    X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { Button } from '@/components/ui/Button';
import styles from './Sidebar.module.css';

function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, admin: true },
    { label: 'Produtos', href: '/admin/produtos', icon: Package, admin: true },
    { label: 'Clientes', href: '/admin/clientes', icon: Users, admin: true },
    { label: 'Pedidos', href: '/pedidos', icon: History, admin: false },
    { label: 'Meu Carrinho', href: '/carrinho', icon: ShoppingCart, admin: false },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

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
                        {navItems.filter(item => !item.admin).map((item) => {
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

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Administração</span>
                        {navItems.filter(item => item.admin).map((item) => {
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
                </nav>

                <div className={styles.footer}>
                    <Link
                        href="/settings"
                        className={styles.navItem}
                        onClick={onClose}
                    >
                        <Settings size={18} />
                        <span>Configurações</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
