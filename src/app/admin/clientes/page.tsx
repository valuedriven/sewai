'use client';

import React, { useEffect, useState } from 'react';
import { Search, Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { getCustomers, Customer } from '@/lib/customers';
import styles from './clientes.module.css';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomers() {
            const data = await getCustomers();
            setCustomers(data);
            setIsLoading(false);
        }
        fetchCustomers();
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Clientes</h1>
                    <p className={styles.subtitle}>Gerencie a base de clientes do seu e-commerce</p>
                </div>
            </header>

            <Card>
                <CardContent className={styles.cardContent}>
                    <div className={styles.toolbar}>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={18} />
                            <Input placeholder="Pesquisar clientes por nome ou e-mail..." className={styles.searchInput} />
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        {isLoading ? (
                            <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando clientes...</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Contato</th>
                                        <th>Endereço</th>
                                        <th className={styles.actionsHeader}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td>
                                                <div className={styles.customerHeader}>
                                                    <div className={styles.avatar}>
                                                        {customer.name?.charAt(0) || '?'}
                                                    </div>
                                                    <div className={styles.customerName}>{customer.name}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.contactInfo}>
                                                    <span className={styles.infoLine}><Mail size={14} /> {customer.email}</span>
                                                    <span className={styles.infoLine}><Phone size={14} /> {customer.phone}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.addressLine}>
                                                    <MapPin size={14} /> {customer.address}
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.actions}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className={styles.deleteBtn}>
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {customers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                                                Nenhum cliente cadastrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
