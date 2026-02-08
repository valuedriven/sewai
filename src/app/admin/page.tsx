'use client';

import React from 'react';
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
import styles from './dashboard.module.css';

const MOCK_STATS = [
    { label: 'Total de Vendas', value: '124', icon: Package, trend: '+12%', color: 'primary' },
    { label: 'Valor Recebido', value: 'R$ 12.450,00', icon: DollarSign, trend: '+8%', color: 'success' },
    { label: 'Valor Pendente', value: 'R$ 3.200,00', icon: Clock, trend: '-2%', color: 'warning' },
];

const RECENT_ORDERS = [
    { id: '1001', customer: 'João Silva', date: '08/02/2026', total: 'R$ 129,90', status: 'Novo' },
    { id: '1002', customer: 'Maria Souza', date: '08/02/2026', total: 'R$ 459,00', status: 'Pago' },
    { id: '1003', customer: 'Pedro Santos', date: '07/02/2026', total: 'R$ 899,00', status: 'Preparação' },
    { id: '1004', customer: 'Ana Oliveira', date: '07/02/2026', total: 'R$ 329,90', status: 'Despachado' },
    { id: '1005', customer: 'Lucas Lima', date: '06/02/2026', total: 'R$ 1.599,00', status: 'Entregue' },
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

export default function DashboardPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <p className={styles.subtitle}>Visão geral do seu e-commerce</p>
            </header>

            <div className={styles.statsGrid}>
                {MOCK_STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={i} className={styles.statCard}>
                            <CardContent className={styles.statContent}>
                                <div className={styles.statInfo}>
                                    <p className={styles.statLabel}>{stat.label}</p>
                                    <h3 className={styles.statValue}>{stat.value}</h3>
                                    <span className={styles.statTrend}>{stat.trend} desde ontem</span>
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
                                {RECENT_ORDERS.map((order) => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.date}</td>
                                        <td>{order.total}</td>
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
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
