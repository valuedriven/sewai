'use client';

import React from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './Navbar.module.css';

interface NavbarProps {
    onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Button variant="ghost" size="icon" className={styles.menuButton} onClick={onMenuClick}>
                    <Menu size={20} />
                </Button>
                <div className={styles.logo}>
                    <span className={styles.logoText}>Sewai</span>
                </div>
            </div>

            <div className={styles.center}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <Input
                        placeholder="Buscar produtos..."
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div className={styles.right}>
                <Button variant="ghost" size="icon" className={styles.actionButton}>
                    <ShoppingCart size={20} />
                    <span className={styles.badge}>0</span>
                </Button>
                <Button variant="ghost" size="icon" className={styles.actionButton}>
                    <User size={20} />
                </Button>
                <Button variant="primary" size="sm" className={styles.loginButton}>
                    Login
                </Button>
            </div>
        </nav>
    );
}
