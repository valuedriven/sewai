'use client';

import React, { useEffect, useState } from 'react';
import {
    TrendingUp,
    DollarSign,
    Clock,
    ChevronRight,
    Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getAllOrders, getDashboardStats } from '@/lib/orders';
import styles from './dashboard.module.css';

const STATUS_MAP: Record<string, any> = {
    'Novo': 'neutral',
    'Pago': 'success',
    'Preparação': 'info',
    'Faturado': 'info',
    'Despachado': 'info',
    'Entregue': 'success',
    'Cancelado': 'error',
};

export default function DashboardPage() {
    const [stats, setStats] = useState({ totalVendas: 0, valorRecebido: 0, valorPendente: 0 });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            const [statsData, ordersData] = await Promise.all([
                getDashboardStats(),
                getAllOrders(5)
            ]);
            setStats(statsData);
            setRecentOrders(ordersData);
            setIsLoading(false);
        }
        fetchDashboardData();
    }, []);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const statsConfig = [
        { label: 'Total de Vendas', value: stats.totalVendas.toString(), icon: Package, color: 'primary' },
        { label: 'Valor Recebido', value: formatPrice(stats.valorRecebido), icon: DollarSign, color: 'success' },
        { label: 'Valor Pendente', value: formatPrice(stats.valorPendente), icon: Clock, color: 'warning' },
    ];
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <p className={styles.subtitle}>Visão geral do seu e-commerce</p>
            </header>

            <div className={styles.statsGrid}>
                {statsConfig.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={i} className={styles.statCard}>
                            <CardContent className={styles.statContent}>
                                <div className={styles.statInfo}>
                                    <p className={styles.statLabel}>{stat.label}</p>
                                    <h3 className={styles.statValue}>{stat.value}</h3>
                                </div>
                                <div className={`${styles.statIconWrapper} ${styles[stat.color]}`}>
                                    <Icon size={24} />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card className={styles.ordersCard}>
                <CardHeader className={styles.ordersHeader}>
                    <CardTitle>Últimos Pedidos</CardTitle>
                    <Button variant="ghost" size="sm" className={styles.viewAll}>
                        Ver todos <ChevronRight size={16} />
                    </Button>
                </CardHeader>
                <CardContent className={styles.noPadding}>
                    <div className={styles.tableWrapper}>
                        {isLoading ? (
                            <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando dados...</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cliente</th>
                                        <th>Data</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>#{order.order_number}</td>
                                            <td>{order.customer?.name || 'Cliente desconhecido'}</td>
                                            <td>{new Date(order.created_at).toLocaleDateString('pt-BR')}</td>
                                            <td>{formatPrice(order.total_amount)}</td>
                                            <td>
                                                <Badge tone={STATUS_MAP[order.status]}>
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Button variant="ghost" size="icon">
                                                    <ChevronRight size={18} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                                Nenhum pedido recente.
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
