'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.container}>
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <div className={styles.wrapper}>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main className={styles.main}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
