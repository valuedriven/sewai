import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore nossa Coleção</h1>
        <p className={styles.subtitle}>
          Produtos selecionados com design premium e qualidade superior.
        </p>
      </header>

      <div className={styles.grid}>
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
