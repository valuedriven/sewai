'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Package, Calendar, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import styles from './orders.module.css';

const MOCK_ORDERS = [
    { id: '1001', date: '08/02/2026', total: 154.90, status: 'Novo', items: 2 },
    { id: '982', date: '01/02/2026', total: 459.00, status: 'Entregue', items: 1 },
    { id: '854', date: '15/01/2026', total: 1240.50, status: 'Entregue', items: 3 },
    { id: '721', date: '20/12/2025', total: 89.90, status: 'Cancelado', items: 1 },
];

const STATUS_MAP: Record<string, any> = {
    'Novo': 'neutral',
    'Pago': 'success',
    'Preparação': 'info',
    'Faturado': 'info',
    'Despachado': 'info',
    'Entregue': 'success',
    'Cancelado': 'error',
};

export default function OrdersPage() {
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Meus Pedidos</h1>
                <p className={styles.subtitle}>Acompanhe o status de suas compras</p>
            </header>

            <div className={styles.list}>
                {MOCK_ORDERS.map((order) => (
                    <Card key={order.id} className={styles.orderCard}>
                        <CardContent className={styles.cardContent}>
                            <div className={styles.mainInfo}>
                                <div className={styles.orderId}>
                                    <Package size={20} className={styles.icon} />
                                    <div>
                                        <span className={styles.label}>Pedido</span>
                                        <h3 className={styles.value}>#{order.id}</h3>
                                    </div>
                                </div>

                                <div className={styles.infoGroup}>
                                    <div className={styles.infoItem}>
                                        <Calendar size={16} />
                                        <span>{order.date}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <Tag size={16} />
                                        <span>{order.items} {order.items === 1 ? 'item' : 'itens'}</span>
                                    </div>
                                </div>

                                <div className={styles.statusGroup}>
                                    <Badge tone={STATUS_MAP[order.status]}>
                                        {order.status}
                                    </Badge>
                                </div>

                                <div className={styles.totalGroup}>
                                    <span className={styles.label}>Total</span>
                                    <span className={styles.totalValue}>{formatPrice(order.total)}</span>
                                </div>

                                <div className={styles.actionGroup}>
                                    <Link href={`/pedidos/${order.id}`}>
                                        <Button variant="ghost" className={styles.detailBtn}>
                                            Ver Detalhes
                                            <ChevronRight size={18} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
