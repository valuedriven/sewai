import React from 'react';
import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './page.module.css';

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const products = await getProducts();
  const { q: query } = await searchParams;

  const filteredProducts = query
    ? products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(query.toLowerCase())
    )
    : products;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore nossa Coleção</h1>
        <p className={styles.subtitle}>
          Produtos selecionados com design premium e qualidade superior.
        </p>
      </header>

      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.emptyContainer}>
            <p className={styles.empty}>Nenhum produto encontrado para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
