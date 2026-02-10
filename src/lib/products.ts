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

export async function createProduct(product: Omit<Product, 'id'>) {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error.message);
        throw error;
    }

    return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }

    return data as Product;
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error.message);
        throw error;
    }

    return true;
}

