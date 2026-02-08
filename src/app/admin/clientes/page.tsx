'use client';

import React from 'react';
import { Search, Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import styles from './clientes.module.css';

const MOCK_CUSTOMERS = [
    { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 98888-7777', address: 'Av. Paulista, 1000 - SP' },
    { id: '2', name: 'Maria Souza', email: 'maria@email.com', phone: '(21) 97777-6666', address: 'Rua das Flores, 123 - RJ' },
    { id: '3', name: 'Pedro Santos', email: 'pedro@email.com', phone: '(31) 96666-5555', address: 'Rua da Bahia, 456 - MG' },
    { id: '4', name: 'Ana Oliveira', email: 'ana@email.com', phone: '(41) 95555-4444', address: 'Rua XV de Novembro, 789 - PR' },
    { id: '5', name: 'Lucas Lima', email: 'lucas@email.com', phone: '(51) 94444-3333', address: 'Av. Ipiranga, 321 - RS' },
];

export default function AdminCustomersPage() {
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
                                {MOCK_CUSTOMERS.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>
                                            <div className={styles.customerHeader}>
                                                <div className={styles.avatar}>
                                                    {customer.name.charAt(0)}
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
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
