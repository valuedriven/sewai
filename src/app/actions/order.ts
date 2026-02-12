'use server';

import { resend } from '@/lib/resend';
import { OrderConfirmationEmail } from '@/components/emails/OrderConfirmationEmail';

interface SendOrderConfirmationParams {
    email: string;
    orderId: string;
    customerName: string;
    items: any[];
    total: number;
}

export async function sendOrderConfirmation({
    email,
    orderId,
    customerName,
    items,
    total,
}: SendOrderConfirmationParams) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Sewai <onboarding@resend.dev>',
            to: email,
            subject: `Confirmação do Pedido #${orderId}`,
            react: OrderConfirmationEmail({
                orderId,
                customerName,
                items,
                total,
            }),
        });

        if (error) {
            console.error('Resend API Error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error: any) {
        console.error('Server Action Error:', error);
        return { success: false, error: error.message };
    }
}
