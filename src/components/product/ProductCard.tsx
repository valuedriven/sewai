'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        category: string;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(product.price);

    return (
        <Card className={styles.productCard}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Badge tone="neutral" className={styles.categoryBadge}>
                    {product.category}
                </Badge>
            </div>
            <CardContent className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
            </CardContent>
            <CardFooter className={styles.footer}>
                <span className={styles.price}>{formattedPrice}</span>
                <Button size="sm" className={styles.addButton}>
                    <ShoppingCart size={16} className={styles.cartIcon} />
                    Adicionar
                </Button>
            </CardFooter>
        </Card>
    );
}
