import { supabase } from './supabase';

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    active: boolean;
}

export async function getCustomers() {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching customers:', error);
        return [];
    }

    return data as Customer[];
}

export async function getCustomerById(id: string) {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching customer:', error);
        return null;
    }

    return data as Customer;
}

export async function syncCustomer(customer: Partial<Customer>) {
    const { data, error } = await supabase
        .from('customers')
        .upsert({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            active: true,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' })
        .select()
        .single();

    if (error) {
        console.error('Error syncing customer:', error);
        return null;
    }

    return data as Customer;
}
