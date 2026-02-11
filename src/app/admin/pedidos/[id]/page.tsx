'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getOrderById } from '@/lib/orders';
import styles from './detalhes.module.css';

const STATUS_MAP: Record<string, any> = {
    'Novo': 'neutral',
    'Pago': 'success',
    'Preparação': 'info',
    'Faturado': 'info',
    'Despachado': 'info',
    'Entregue': 'success',
    'Cancelado': 'error',
};

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const orderId = resolvedParams.id;
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            const data = await getOrderById(orderId);
            setOrder(data);
            setIsLoading(false);
        }
        fetchOrder();
    }, [orderId]);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>Carregando detalhes do pedido...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className={styles.container}>
                <Link href="/admin/pedidos" className={styles.backBtn}>
                    <ArrowLeft size={16} /> Voltar para pedidos
                </Link>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <h2>Pedido não encontrado</h2>
                    <p>O pedido que você está procurando não existe ou foi removido.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/admin/pedidos" className={styles.backBtn}>
                    <ArrowLeft size={16} /> Voltar para pedidos
                </Link>
                <div className={styles.headerTitleRow}>
                    <h1 className={styles.title}>Pedido #{order.order_number}</h1>
                    <Badge tone={STATUS_MAP[order.status]}>
                        {order.status}
                    </Badge>
                </div>
                <p className={styles.infoValue}>
                    Realizado em {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </header>

            <div className={styles.grid}>
                <div className={styles.mainContent}>
                    <Card>
                        <CardContent>
                            <h2 className={styles.cardTitle}>
                                <Package size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                Itens do Pedido
                            </h2>
                            <table className={styles.itemsTable}>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço Unit.</th>
                                        <th>Qtd</th>
                                        <th style={{ textAlign: 'right' }}>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.order_items?.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className={styles.productCell}>
                                                {item.product?.image_url && (
                                                    <img
                                                        src={item.product.image_url}
                                                        alt={item.product.name}
                                                        className={styles.productImage}
                                                    />
                                                )}
                                                <span className={styles.productName}>{item.product?.name}</span>
                                            </td>
                                            <td className={styles.unitPrice}>{formatPrice(item.unit_price)}</td>
                                            <td className={styles.quantity}>{item.quantity}</td>
                                            <td className={styles.subtotal}>{formatPrice(item.unit_price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className={styles.summaryRow}>
                                <div className={styles.summaryContent}>
                                    <div className={styles.summaryItem}>
                                        <span>Subtotal</span>
                                        <span>{formatPrice(order.total_amount)}</span>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <span>Frete</span>
                                        <span>Grátis</span>
                                    </div>
                                    <div className={styles.summaryTotal}>
                                        <span>Total</span>
                                        <span>{formatPrice(order.total_amount)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className={styles.sidebar}>
                    <Card style={{ marginBottom: '1.5rem' }}>
                        <CardContent>
                            <h2 className={styles.cardTitle}>
                                <User size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                Cliente
                            </h2>
                            <div className={styles.infoSection}>
                                <span className={styles.infoLabel}>Nome</span>
                                <span className={styles.infoValue}>{order.customer?.name}</span>
                            </div>
                            <div className={styles.infoSection}>
                                <span className={styles.infoLabel}>E-mail</span>
                                <span className={styles.infoValue}>{order.customer?.email}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h2 className={styles.cardTitle}>
                                <MapPin size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                Endereço de Entrega
                            </h2>
                            <div className={styles.infoSection}>
                                <p className={`${styles.infoValue} ${styles.address}`}>
                                    {order.shipping_address}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
