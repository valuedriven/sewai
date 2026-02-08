import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '2rem',
            textAlign: 'center',
            gap: '1rem'
        }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Página não encontrada</h1>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
                A aplicação Sewai está rodando no Next.js, mas o caminho solicitado não existe.
            </p>
            <Link
                href="/"
                style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '500'
                }}
            >
                Voltar para o Início
            </Link>
        </div>
    );
}
