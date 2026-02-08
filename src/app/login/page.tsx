'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import styles from './login.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simular login
        setTimeout(() => {
            setIsLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <Card className={styles.loginCard}>
                <CardHeader className={styles.header}>
                    <CardTitle className={styles.title}>Bem-vindo de volta</CardTitle>
                    <p className={styles.subtitle}>Entre com sua conta para continuar</p>
                </CardHeader>
                <CardContent>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.label}>E-mail</label>
                            <div className={styles.inputWrapper}>
                                <Mail className={styles.icon} size={18} />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password" className={styles.label}>Senha</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.icon} size={18} />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <Button type="submit" className={styles.submitButton} disabled={isLoading}>
                            {isLoading ? 'Entrando...' : 'Entrar'}
                            {!isLoading && <ArrowRight size={18} className={styles.arrowIcon} />}
                        </Button>
                    </form>

                    <div className={styles.footer}>
                        <p>Não tem uma conta?</p>
                        <Link href="/cadastro" className={styles.link}>
                            Criar conta
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <div className={styles.backgroundDecor}>
                <div className={styles.blob1} />
                <div className={styles.blob2} />
            </div>
        </div>
    );
}
