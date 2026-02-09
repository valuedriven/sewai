'use client';

import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getAllOrders } from '@/lib/orders';
import styles from './pedidos.module.css';

const STATUS_MAP: Record<string, any> = {
    'Novo': 'neutral',
    'Pago': 'success',
    'Preparação': 'info',
    'Faturado': 'info',
    'Despachado': 'info',
    'Entregue': 'success',
    'Cancelado': 'error',
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            const data = await getAllOrders();
            setOrders(data);
            setIsLoading(false);
        }
        fetchOrders();
    }, []);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Gestão de Pedidos</h1>
                    <p className={styles.subtitle}>Gerencie e acompanhe todos os pedidos da loja</p>
                </div>
            </header>

            <Card>
                <CardContent className={styles.cardContent}>
                    <div className={styles.toolbar}>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={18} />
                            <Input placeholder="Pesquisar por ID ou cliente..." className={styles.searchInput} />
                        </div>
                        <Button variant="outline" size="sm" className={styles.filterBtn}>
                            <Filter size={18} /> Filtros
                        </Button>
                    </div>

                    <div className={styles.tableWrapper}>
                        {isLoading ? (
                            <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando pedidos...</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cliente</th>
                                        <th>Data</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th className={styles.actionsHeader}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className={styles.orderId}>#{order.order_number}</td>
                                            <td className={styles.customerName}>{order.customer?.name || 'Cliente desconhecido'}</td>
                                            <td className={styles.dateCell}>{new Date(order.created_at).toLocaleDateString('pt-BR')}</td>
                                            <td className={styles.totalCell}>{formatPrice(order.total_amount)}</td>
                                            <td>
                                                <Badge tone={STATUS_MAP[order.status]}>
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className={styles.actions}>
                                                    <Button variant="ghost" size="icon">
                                                        <ChevronRight size={18} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                                Nenhum pedido encontrado.
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
