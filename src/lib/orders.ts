import { supabase } from './supabase';

interface OrderItemInput {
    product_id: string;
    unit_price: number;
    quantity: number;
}

interface OrderInput {
    customer_id: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    shipping_address: string;
    items: OrderItemInput[];
}

export async function createOrder(input: OrderInput) {
    try {
        // 1. Ensure customer exists in Supabase
        const { error: customerError } = await supabase
            .from('customers')
            .upsert({
                id: input.customer_id,
                name: input.customer_name,
                email: input.customer_email,
                active: true
            }, { onConflict: 'id' });

        if (customerError) throw customerError;

        // 2. Create the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                customer_id: input.customer_id,
                total_amount: input.total_amount,
                shipping_address: input.shipping_address,
                status: 'Novo'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 3. Create order items
        const orderItems = input.items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            unit_price: item.unit_price,
            quantity: item.quantity
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error };
    }
}

export async function getCustomerOrders(customerId: string) {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                product:products(name, image_url)
            )
        `)
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }

    return data;
}

export async function getOrderById(orderId: string) {
    // Basic UUID validation to prevent database errors for invalid formats
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(orderId)) {
        console.warn('Invalid order ID format:', orderId);
        return null;
    }

    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            customer:customers(*),
            order_items (
                *,
                product:products(*)
            )
        `)
        .eq('id', orderId)
        .single();

    if (error) {
        console.error('Error fetching order:', error);
        return null;
    }

    return data;
}

export async function getAllOrders(limit?: number) {
    let query = supabase
        .from('orders')
        .select(`
            *,
            customer:customers(name, email)
        `)
        .order('created_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching all orders:', error);
        return [];
    }

    return data;
}

export async function getDashboardStats() {
    const { data, error } = await supabase
        .from('orders')
        .select('total_amount, status');

    if (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
            totalVendas: 0,
            valorRecebido: 0,
            valorPendente: 0
        };
    }

    const totalVendas = data.length;
    const valorRecebido = data
        .filter(o => o.status === 'Pago' || o.status === 'Entregue' || o.status === 'Faturado')
        .reduce((sum, o) => sum + Number(o.total_amount), 0);
    const valorPendente = data
        .filter(o => o.status === 'Novo' || o.status === 'Preparação' || o.status === 'Despachado')
        .reduce((sum, o) => sum + Number(o.total_amount), 0);

    return {
        totalVendas,
        valorRecebido,
        valorPendente
    };
}
