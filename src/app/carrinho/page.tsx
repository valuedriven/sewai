'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useCart } from '@/contexts/CartContext';
import { createOrder } from '@/lib/orders';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import styles from './cart.module.css';

export default function CartPage() {
    const { items, subtotal, shipping, total, updateQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useUser();
    const { showToast } = useToast();
    const router = useRouter();
    const [isPending, setIsPending] = React.useState(false);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const handleCheckout = async () => {
        if (!user) return;

        setIsPending(true);
        try {
            const orderItems = items.map(item => ({
                product_id: item.id,
                unit_price: item.price,
                quantity: item.quantity
            }));

            const result = await createOrder({
                customer_id: user.id,
                customer_name: user.fullName || user.username || 'Cliente',
                customer_email: user.primaryEmailAddress?.emailAddress || '',
                total_amount: total,
                shipping_address: 'Endereço cadastrado', // Simplificado para MVP
                items: orderItems
            });

            if (result.success && result.orderId) {
                clearCart();
                showToast('Pedido realizado!', 'Seu pedido foi processado com sucesso.', 'success');
                router.push(`/pedidos/${result.orderId}`);
            } else {
                showToast('Erro no pedido', 'Não foi possível processar seu pedido. Tente novamente.', 'error');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            showToast('Erro inesperado', 'Ocorreu um erro ao finalizar sua compra.', 'error');
        } finally {
            setIsPending(false);
        }
    };

    if (items.length === 0) {
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
                <p className={styles.subtitle}>{items.length} itens no carrinho</p>
            </header>

            <div className={styles.layout}>
                <div className={styles.itemsSection}>
                    <div className={styles.itemsList}>
                        {items.map((item) => (
                            <Card key={item.id} className={styles.itemCard}>
                                <CardContent className={styles.itemContent}>
                                    <div className={styles.itemImage}>
                                        <img src={item.image_url} alt={item.name} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemInfo}>
                                            <h3 className={styles.itemName}>{item.name}</h3>
                                            <p className={styles.itemCategory}>
                                                {typeof item.category === 'string' ? item.category : item.category?.name}
                                            </p>
                                        </div>
                                        <div className={styles.itemActions}>
                                            <div className={styles.quantity}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus size={14} />
                                                </Button>
                                                <span className={styles.qtyValue}>{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus size={14} />
                                                </Button>
                                            </div>
                                            <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={styles.removeBtn}
                                                onClick={() => removeFromCart(item.id)}
                                            >
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

                            <SignedIn>
                                <Button
                                    className={styles.checkoutBtn}
                                    onClick={handleCheckout}
                                    disabled={isPending}
                                >
                                    {isPending ? 'Processando...' : 'Finalizar Compra'}
                                    {!isPending && <ArrowRight size={18} />}
                                </Button>
                            </SignedIn>

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <Button className={styles.checkoutBtn}>
                                        Finalizar Compra
                                        <ArrowRight size={18} />
                                    </Button>
                                </SignInButton>
                            </SignedOut>

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
