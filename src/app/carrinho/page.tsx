'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import styles from './cart.module.css';

// Usar alguns produtos do mock para o carrinho
const CART_ITEMS = [
    { ...MOCK_PRODUCTS[0], quantity: 2 },
    { ...MOCK_PRODUCTS[1], quantity: 1 },
];

export default function CartPage() {
    const subtotal = CART_ITEMS.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 25.00;
    const total = subtotal + shipping;

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    if (CART_ITEMS.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <div className={styles.emptyIcon}>
                    <ShoppingBag size={64} />
                </div>
                <h2 className={styles.emptyTitle}>Seu carrinho está vazio</h2>
                <p className={styles.emptySubtitle}>Que tal explorar nossos produtos e encontrar algo especial?</p>
                <Link href="/">
                    <Button variant="primary">Continuar Comprando</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Meu Carrinho</h1>
                <p className={styles.subtitle}>{CART_ITEMS.length} itens no carrinho</p>
            </header>

            <div className={styles.layout}>
                <div className={styles.itemsSection}>
                    <div className={styles.itemsList}>
                        {CART_ITEMS.map((item) => (
                            <Card key={item.id} className={styles.itemCard}>
                                <CardContent className={styles.itemContent}>
                                    <div className={styles.itemImage}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemInfo}>
                                            <h3 className={styles.itemName}>{item.name}</h3>
                                            <p className={styles.itemCategory}>{item.category}</p>
                                        </div>
                                        <div className={styles.itemActions}>
                                            <div className={styles.quantity}>
                                                <Button variant="ghost" size="icon" className={styles.qtyBtn}>
                                                    <Minus size={14} />
                                                </Button>
                                                <span className={styles.qtyValue}>{item.quantity}</span>
                                                <Button variant="ghost" size="icon" className={styles.qtyBtn}>
                                                    <Plus size={14} />
                                                </Button>
                                            </div>
                                            <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>
                                            <Button variant="ghost" size="icon" className={styles.removeBtn}>
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <aside className={styles.summarySection}>
                    <Card className={styles.summaryCard}>
                        <CardContent className={styles.summaryContent}>
                            <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
                            <div className={styles.summaryLines}>
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
                            </div>
                            <Button className={styles.checkoutBtn}>
                                Finalizar Compra
                                <ArrowRight size={18} />
                            </Button>
                            <Link href="/" className={styles.continueLink}>
                                Continuar Comprando
                            </Link>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
