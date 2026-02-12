import { resend } from './resend';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';

export const sendWelcomeEmail = async (email: string, firstName?: string) => {
    try {
        const data = await resend.emails.send({
            from: 'Sewai <onboarding@resend.dev>',
            to: email,
            subject: 'Bem-vindo à Sewai!',
            react: WelcomeEmail({ firstName }),
        });

        return { success: true, data };
    } catch (error: any) {
        console.error('Error sending welcome email:', error);
        // Ensure error is serializable
        return {
            success: false,
            error: {
                message: error.message || 'Unknown error',
                name: error.name,
                code: error.code
            }
        };
    }
};
