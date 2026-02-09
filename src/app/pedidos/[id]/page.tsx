'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Package, MapPin, CreditCard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getOrderById } from '@/lib/orders';
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
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            if (id) {
                const data = await getOrderById(id);
                setOrder(data);
            }
            setIsLoading(false);
        }
        fetchOrder();
    }, [id]);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value ?? 0);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    if (isLoading) {
        return <div className={styles.container}><p>Carregando detalhes do pedido...</p></div>;
    }

    if (!order) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>Pedido não encontrado</h2>
                <Link href="/pedidos">
                    <Button>Voltar para Pedidos</Button>
                </Link>
            </div>
        );
    }

    const subtotal = order.order_items?.reduce((acc: number, item: any) => acc + (item.unit_price * item.quantity), 0) || 0;
    const shipping = 25.00;
    const total = order.total_amount;

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
                    <h1 className={styles.title}>Pedido #{order.order_number}</h1>
                    <Badge tone={STATUS_MAP[order.status] || 'neutral'}>{order.status}</Badge>
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
                                {order.order_items?.map((item: any) => (
                                    <div key={item.id} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <img src={item.product?.image_url} alt={item.product?.name} />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h4 className={styles.itemName}>{item.product?.name}</h4>
                                            <p className={styles.itemQty}>{item.quantity}x {formatPrice(item.unit_price)}</p>
                                        </div>
                                        <div className={styles.itemTotal}>
                                            {formatPrice(item.unit_price * item.quantity)}
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
                                <span>{formatPrice(shipping)}</span>
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
                                    <p>{formatDate(order.created_at)}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <CreditCard size={18} className={styles.icon} />
                                <div>
                                    <label>Pagamento</label>
                                    <p>{order.payment_method || 'A definir'}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <MapPin size={18} className={styles.icon} />
                                <div>
                                    <label>Endereço de Entrega</label>
                                    <p>{order.shipping_address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
