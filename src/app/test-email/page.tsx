'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { sendWelcomeEmail } from '@/lib/email';

export default function TestEmailPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        setLoading(true);
        setStatus('Sending...');

        // Note: In a real app, this should be a Server Action or API route to keep secrets safe.
        // For this test page, we'll use a Server Action if available, but since we just made the lib function...
        // Actually, sendWelcomeEmail uses 'resend' which uses process.env.
        // We need a Server Action to call it from the client.

        try {
            const response = await fetch('/api/test-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('Email sent successfully!');
            } else {
                setStatus('Failed to send email: ' + JSON.stringify(result.error));
            }
        } catch (error: any) {
            setStatus('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Test Email Sending</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email to receive test"
                    />
                </div>
                <Button onClick={handleSend} disabled={loading || !email}>
                    {loading ? 'Sending...' : 'Send Test Email'}
                </Button>
                {status && (
                    <div className={`p-4 rounded ${status.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
