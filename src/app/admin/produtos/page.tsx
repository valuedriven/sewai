'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { getProducts, createProduct, updateProduct, deleteProduct, Product } from '@/lib/products';
import { getCategories, Category } from '@/lib/categories';
import styles from './produtos.module.css';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { showToast } = useToast();

    // Form state
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category_id: '',
        image_url: ''
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
            showToast('Erro ao carregar', 'Não foi possível buscar os dados de produtos ou categorias.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const handleOpenModal = (product: Product | null = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category_id: (product as any).category_id || '',
                image_url: product.image_url
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: 0,
                stock: 0,
                category_id: categories.length > 0 ? categories[0].id : '',
                image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSave = async () => {
        if (!formData.name.trim() || !formData.category_id) return;

        setIsSaving(true);
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, formData);
                showToast('Sucesso', 'Produto atualizado com sucesso!', 'success');
            } else {
                await createProduct(formData);
                showToast('Sucesso', 'Novo produto criado com sucesso!', 'success');
            }
            await fetchData();
            handleCloseModal();
        } catch (error: any) {
            console.error('Error saving product:', error);
            if (error.code === '42501') {
                showToast('Erro de Permissão (RLS)', 'O banco de dados bloqueou esta ação. Verifique as políticas de segurança.', 'error');
            } else {
                showToast('Erro ao salvar', error.message || 'Erro inesperado ao salvar produto.', 'error');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) {
            return;
        }

        try {
            await deleteProduct(id);
            showToast('Excluído', 'Produto removido com sucesso.', 'success');
            await fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast('Erro ao excluir', 'Não foi possível excluir o produto.', 'error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    const filteredProducts = products.filter(product => {
        const searchLower = searchQuery.toLowerCase();
        const categoryName = typeof product.category === 'string' ? product.category : product.category?.name || '';

        return (
            product.name.toLowerCase().includes(searchLower) ||
            (product.description && product.description.toLowerCase().includes(searchLower)) ||
            categoryName.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Produtos</h1>
                    <p className={styles.subtitle}>Gerencie seu catálogo de produtos</p>
                </div>
                <Button className={styles.addButton} onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Novo Produto
                </Button>
            </header>

            <Card>
                <CardContent className={styles.cardContent}>
                    <div className={styles.toolbar}>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={18} />
                            <Input
                                placeholder="Pesquisar produtos..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        {isLoading ? (
                            <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando produtos...</p>
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
                                    {filteredProducts.map((product) => (
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
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(product)}>
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={styles.deleteBtn}
                                                        onClick={() => handleDelete(product.id)}
                                                    >
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

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
                footer={
                    <>
                        <Button variant="outline" onClick={handleCloseModal} disabled={isSaving}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving || !formData.name.trim()}>
                            {isSaving ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Nome do Produto</label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Camiseta Nike Fit"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.875rem',
                                outline: 'none',
                                resize: 'none'
                            }}
                            placeholder="Descrição detalhada do produto..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Preço (R$)</label>
                            <Input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Estoque</label>
                            <Input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Categoria</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.875rem',
                                outline: 'none',
                                background: 'white'
                            }}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>URL da Imagem</label>
                        <Input
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

