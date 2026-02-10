'use client';

import { useEffect, useRef } from 'react';
import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

export function FaroInit() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;

        const url = process.env.NEXT_PUBLIC_FARO_URL;
        const appName = process.env.NEXT_PUBLIC_FARO_APP_NAME;

        if (url && appName) {
            initializeFaro({
                url,
                app: {
                    name: appName,
                    version: '1.0.0', // Pode ser dinâmico no futuro
                    environment: process.env.NODE_ENV,
                },
                instrumentations: [
                    ...getWebInstrumentations(),
                    new TracingInstrumentation(),
                ],
            });
            initialized.current = true;
            console.log('Grafana Faro initialized successfully');
        } else {
            console.warn('Grafana Faro configuration missing in .env.local');
        }
    }, []);

    return null;
}
