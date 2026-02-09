import React from 'react';
import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './page.module.css';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore nossa Coleção</h1>
        <p className={styles.subtitle}>
          Produtos selecionados com design premium e qualidade superior.
        </p>
      </header>

      <div className={styles.grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.empty}>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}
