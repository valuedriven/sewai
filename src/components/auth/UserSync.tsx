'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { syncCustomer } from '@/lib/customers';

export function UserSync() {
    const { user, isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            const sync = async () => {
                await syncCustomer({
                    id: user.id,
                    name: user.fullName || user.username || 'Usuário',
                    email: user.primaryEmailAddress?.emailAddress || '',
                    phone: user.primaryPhoneNumber?.phoneNumber || '',
                });
            };
            sync();
        }
    }, [isLoaded, isSignedIn, user]);

    return null;
}
