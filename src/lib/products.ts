import { supabase } from './supabase';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category?: {
        name: string;
    };
    stock: number;
}

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            category:categories(name)
        `)
        .eq('active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as Product[];
}

export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            category:categories(name)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data as Product;
}
