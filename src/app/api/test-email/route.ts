import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        const result = await sendWelcomeEmail(email, 'Test User');

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error sending email:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Unknown error',
            details: error
        }, { status: 500 });
    }
}
