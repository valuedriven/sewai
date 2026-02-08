'use client';

import React from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './categorias.module.css';

const MOCK_CATEGORIES = [
    { id: '1', name: 'Vestuário', active: true, count: 24 },
    { id: '2', name: 'Calçados', active: true, count: 12 },
    { id: '3', name: 'Acessórios', active: true, count: 45 },
    { id: '4', name: 'Eletrônicos', active: true, count: 8 },
    { id: '5', name: 'Casa', active: false, count: 0 },
];

export default function AdminCategoriesPage() {
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
                                {MOCK_CATEGORIES.map((cat) => (
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
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
