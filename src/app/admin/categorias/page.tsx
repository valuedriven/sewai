'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { getCategories, createCategory, updateCategory, deleteCategory, Category } from '@/lib/categories';
import styles from './categorias.module.css';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { showToast } = useToast();

    // Form state
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [catName, setCatName] = useState('');
    const [catActive, setCatActive] = useState(true);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            showToast('Erro ao carregar', 'Não foi possível buscar as categorias do banco de dados.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenModal = (category: Category | null = null) => {
        if (category) {
            setEditingCategory(category);
            setCatName(category.name);
            setCatActive(category.active);
        } else {
            setEditingCategory(null);
            setCatName('');
            setCatActive(true);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setCatName('');
    };

    const handleSave = async () => {
        if (!catName.trim()) return;

        setIsSaving(true);
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, { name: catName, active: catActive });
                showToast('Sucesso', 'Categoria atualizada com sucesso!', 'success');
            } else {
                await createCategory(catName);
                showToast('Sucesso', 'Nova categoria criada com sucesso!', 'success');
            }
            await fetchCategories();
            handleCloseModal();
        } catch (error: any) {
            console.error('Error saving category:', error);
            if (error.code === '42501') {
                showToast('Erro de Permissão (RLS)', 'O banco de dados bloqueou esta ação. Verifique as políticas de segurança.', 'error');
            } else {
                showToast('Erro ao salvar', error.message || 'Erro inesperado ao salvar categoria.', 'error');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            await deleteCategory(id);
            showToast('Excluído', 'Categoria removida com sucesso.', 'success');
            await fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            showToast('Erro ao excluir', 'Não foi possível excluir a categoria.', 'error');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Categorias</h1>
                    <p className={styles.subtitle}>Organize seus produtos em categorias</p>
                </div>
                <Button className={styles.addButton} onClick={() => handleOpenModal()}>
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
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(cat)}>
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={styles.deleteBtn}
                                                        onClick={() => handleDelete(cat.id)}
                                                    >
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

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                footer={
                    <>
                        <Button variant="outline" onClick={handleCloseModal} disabled={isSaving}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving || !catName.trim()}>
                            {isSaving ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Nome da Categoria</label>
                        <Input
                            value={catName}
                            onChange={(e) => setCatName(e.target.value)}
                            placeholder="Ex: Camisas, Calças, Acessórios..."
                            autoFocus
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                            type="checkbox"
                            id="catActive"
                            checked={catActive}
                            onChange={(e) => setCatActive(e.target.checked)}
                            style={{ width: '1rem', height: '1rem' }}
                        />
                        <label htmlFor="catActive" style={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                            Categoria Ativa
                        </label>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

