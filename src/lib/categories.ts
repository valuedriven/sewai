import { supabase } from './supabase';

export interface Category {
    id: string;
    name: string;
    active: boolean;
    count?: number;
}

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select(`
            *,
            products(count)
        `)
        .order('name');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data.map(cat => ({
        ...cat,
        count: cat.products?.[0]?.count || 0
    })) as Category[];
}

export async function getCategoryById(id: string) {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching category:', error);
        return null;
    }

    return data as Category;
}
