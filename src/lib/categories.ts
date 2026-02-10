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
export async function createCategory(name: string) {
    const { data, error } = await supabase
        .from('categories')
        .insert([{ name, active: true }])
        .select()
        .single();

    if (error) {
        console.error('Error creating category:', error.message);
        throw error;
    }

    return data as Category;
}

export async function updateCategory(id: string, updates: Partial<Category>) {
    const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating category:', error.message);
        throw error;
    }

    return data as Category;
}

export async function deleteCategory(id: string) {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting category:', error.message);
        throw error;
    }

    return true;
}
