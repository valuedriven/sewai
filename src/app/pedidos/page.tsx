'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Package, Calendar, Tag, ShoppingBag } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getCustomerOrders } from '@/lib/orders';
import styles from './orders.module.css';

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
    const { user, isLoaded } = useUser();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (user?.id) {
                const data = await getCustomerOrders(user.id);
                setOrders(data);
            }
            setIsLoading(false);
        }

        if (isLoaded) {
            fetchOrders();
        }
    }, [user, isLoaded]);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    if (isLoading) {
        return <div className={styles.container}><p>Carregando seus pedidos...</p></div>;
    }

    if (orders.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <div className={styles.emptyIcon}>
                    <ShoppingBag size={64} />
                </div>
                <h2 className={styles.emptyTitle}>Você ainda não tem pedidos</h2>
                <p className={styles.emptySubtitle}>Seus pedidos aparecerão aqui assim que você realizar uma compra.</p>
                <Link href="/">
                    <Button variant="primary">Ir para a Loja</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Meus Pedidos</h1>
                <p className={styles.subtitle}>Acompanhe o status de suas compras</p>
            </header>

            <div className={styles.list}>
                {orders.map((order) => (
                    <Card key={order.id} className={styles.orderCard}>
                        <CardContent className={styles.cardContent}>
                            <div className={styles.mainInfo}>
                                <div className={styles.orderId}>
                                    <Package size={20} className={styles.icon} />
                                    <div>
                                        <span className={styles.label}>Pedido</span>
                                        <h3 className={styles.value}>#{order.order_number}</h3>
                                    </div>
                                </div>

                                <div className={styles.infoGroup}>
                                    <div className={styles.infoItem}>
                                        <Calendar size={16} />
                                        <span>{formatDate(order.created_at)}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <Tag size={16} />
                                        <span>{order.order_items?.length || 0} {order.order_items?.length === 1 ? 'item' : 'itens'}</span>
                                    </div>
                                </div>

                                <div className={styles.statusGroup}>
                                    <Badge tone={STATUS_MAP[order.status] || 'neutral'}>
                                        {order.status}
                                    </Badge>
                                </div>

                                <div className={styles.totalGroup}>
                                    <span className={styles.label}>Total</span>
                                    <span className={styles.totalValue}>{formatPrice(order.total_amount)}</span>
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
