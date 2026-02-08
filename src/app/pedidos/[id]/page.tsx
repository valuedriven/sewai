'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Package, MapPin, CreditCard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import styles from './order-details.module.css';

const STATUS_MAP: Record<string, any> = {
    'Novo': 'neutral',
    'Pago': 'success',
    'Preparação': 'info',
    'Faturado': 'info',
    'Despachado': 'info',
    'Entregue': 'success',
    'Cancelado': 'error',
};

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    // Mock data para um pedido específico
    const order = {
        id,
        date: '08/02/2026',
        status: 'Novo',
        paymentMethod: 'Pix',
        address: 'Av. Paulista, 1000 - Bela Vista - São Paulo/SP - 01310-100',
        items: [
            { ...MOCK_PRODUCTS[0], quantity: 2 },
            { ...MOCK_PRODUCTS[1], quantity: 1 },
        ],
        shipping: 25.00,
    };

    const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal + order.shipping;

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/pedidos">
                    <Button variant="ghost" size="sm" className={styles.backBtn}>
                        <ArrowLeft size={18} />
                        Voltar para Pedidos
                    </Button>
                </Link>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>Pedido #{id}</h1>
                    <Badge tone={STATUS_MAP[order.status]}>{order.status}</Badge>
                </div>
            </header>

            <div className={styles.grid}>
                <div className={styles.mainCol}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Itens do Pedido</CardTitle>
                        </CardHeader>
                        <CardContent className={styles.noPadding}>
                            <div className={styles.itemsList}>
                                {order.items.map((item) => (
                                    <div key={item.id} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h4 className={styles.itemName}>{item.name}</h4>
                                            <p className={styles.itemQty}>{item.quantity}x {formatPrice(item.price)}</p>
                                        </div>
                                        <div className={styles.itemTotal}>
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className={styles.sideCol}>
                    <Card className={styles.infoCard}>
                        <CardHeader>
                            <CardTitle>Resumo</CardTitle>
                        </CardHeader>
                        <CardContent className={styles.summaryContent}>
                            <div className={styles.summaryLine}>
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className={styles.summaryLine}>
                                <span>Frete</span>
                                <span>{formatPrice(order.shipping)}</span>
                            </div>
                            <div className={styles.divider} />
                            <div className={`${styles.summaryLine} ${styles.totalLine}`}>
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={styles.infoCard}>
                        <CardHeader>
                            <CardTitle>Informações</CardTitle>
                        </CardHeader>
                        <CardContent className={styles.infoContent}>
                            <div className={styles.infoItem}>
                                <Clock size={18} className={styles.icon} />
                                <div>
                                    <label>Data do Pedido</label>
                                    <p>{order.date}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <CreditCard size={18} className={styles.icon} />
                                <div>
                                    <label>Pagamento</label>
                                    <p>{order.paymentMethod}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <MapPin size={18} className={styles.icon} />
                                <div>
                                    <label>Endereço de Entrega</label>
                                    <p>{order.address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
