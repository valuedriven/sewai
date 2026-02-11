'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    SignInButton,
    UserButton,
    SignedIn,
    SignedOut
} from "@clerk/nextjs";
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import styles from './Navbar.module.css';

interface NavbarProps {
    onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
    const { totalItems } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get('q') || '';
    const [searchValue, setSearchValue] = React.useState(currentQuery);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchValue) {
            params.set('q', searchValue);
        } else {
            params.delete('q');
        }
        router.push(`/?${params.toString()}`);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Button variant="ghost" size="icon" className={styles.menuButton} onClick={onMenuClick}>
                    <Menu size={20} />
                </Button>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>Sewai</span>
                </Link>
            </div>

            <div className={styles.center}>
                <form className={styles.searchWrapper} onSubmit={handleSearch}>
                    <Search className={styles.searchIcon} size={18} />
                    <Input
                        placeholder="Buscar produtos..."
                        className={styles.searchInput}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
            </div>

            <div className={styles.right}>
                <Link href="/carrinho">
                    <Button variant="ghost" size="icon" className={styles.actionButton}>
                        <ShoppingCart size={20} />
                        {totalItems > 0 && (
                            <span className={styles.badge}>{totalItems}</span>
                        )}
                    </Button>
                </Link>

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="primary" size="sm" className={styles.loginButton}>
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </nav>
    );
}
