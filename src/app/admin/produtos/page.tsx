'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getProducts, Product } from '@/lib/products';
import styles from './produtos.module.css';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const data = await getProducts();
            setProducts(data);
            setIsLoading(false);
        }
        fetchProducts();
    }, []);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Produtos</h1>
                    <p className={styles.subtitle}>Gerencie seu catálogo de produtos</p>
                </div>
                <Button className={styles.addButton}>
                    <Plus size={18} /> Novo Produto
                </Button>
            </header>

            <Card>
                <CardContent className={styles.cardContent}>
                    <div className={styles.toolbar}>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={18} />
                            <Input placeholder="Pesquisar produtos..." className={styles.searchInput} />
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        {isLoading ? (
                            <p>Carregando produtos...</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Imagem</th>
                                        <th>Nome</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Estoque</th>
                                        <th>Status</th>
                                        <th className={styles.actionsHeader}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>
                                                <div className={styles.thumbnail}>
                                                    <img src={product.image_url} alt={product.name} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.productName}>{product.name}</div>
                                            </td>
                                            <td>{typeof product.category === 'string' ? product.category : product.category?.name}</td>
                                            <td>{formatPrice(product.price)}</td>
                                            <td>{product.stock} un</td>
                                            <td>
                                                <Badge tone="success">Ativo</Badge>
                                            </td>
                                            <td>
                                                <div className={styles.actions}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className={styles.deleteBtn}>
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                                                Nenhum produto cadastrado.
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
