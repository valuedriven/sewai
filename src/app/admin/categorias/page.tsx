'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getCategories, Category } from '@/lib/categories';
import styles from './categorias.module.css';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            const data = await getCategories();
            setCategories(data);
            setIsLoading(false);
        }
        fetchCategories();
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Categorias</h1>
                    <p className={styles.subtitle}>Organize seus produtos em categorias</p>
                </div>
                <Button className={styles.addButton}>
                    <Plus size={18} /> Nova Categoria
                </Button>
            </header>

            <Card>
                <CardContent className={styles.cardContent}>
                    <div className={styles.toolbar}>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={18} />
                            <Input placeholder="Pesquisar categorias..." className={styles.searchInput} />
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        {isLoading ? (
                            <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando categorias...</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nome da Categoria</th>
                                        <th>Produtos Vinculados</th>
                                        <th>Status</th>
                                        <th className={styles.actionsHeader}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => (
                                        <tr key={cat.id}>
                                            <td>
                                                <div className={styles.catName}>{cat.name}</div>
                                            </td>
                                            <td>{cat.count} produtos</td>
                                            <td>
                                                <Badge tone={cat.active ? 'success' : 'neutral'}>
                                                    {cat.active ? 'Ativo' : 'Inativo'}
                                                </Badge>
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
                                    {categories.length === 0 && (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                                                Nenhuma categoria cadastrada.
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
