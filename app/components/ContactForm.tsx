'use client';
import { useState } from 'react';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, message }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to send contact message");

            setSent(true);
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setTimeout(() => setSent(false), 4000);
        } catch (err: any) {
            console.error("Contact message error:", err);
            alert(err.message);
        }
    };

    return (
        <form onSubmit={submit} className="max-w-md">
            <div className="grid grid-cols-1 gap-3">
                <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="px-4 py-2 rounded-lg border"
                />
                <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 rounded-lg border"
                />
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone (optional)"
                    className="px-4 py-2 rounded-lg border"
                />
                <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="px-4 py-2 rounded-lg border h-28"
                />
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-vintageGold text-black font-semibold"
                    >
                        Send Message
                    </button>
                    {sent && <div className="text-sm text-green-600">Message sent!</div>}
                </div>
            </div>
        </form>
    );
}
