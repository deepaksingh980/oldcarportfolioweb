'use client';
import { useState } from 'react';

export default function EnquiryForm({ carName }: { carName?: string }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: any) => {
    e.preventDefault();
    // frontend-only: simulate success
    setSent(true);
    setTimeout(()=> setSent(false), 4000);
    setName(''); setEmail(''); setPhone(''); setMessage('');
  };

  return (
    <form onSubmit={submit} className="max-w-md">
      {carName && <div className="mb-2 text-sm">Enquiry for: <strong>{carName}</strong></div>}
      <div className="grid grid-cols-1 gap-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="px-4 py-2 rounded-lg border" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="px-4 py-2 rounded-lg border" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone (optional)" className="px-4 py-2 rounded-lg border" />
        <textarea required value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message" className="px-4 py-2 rounded-lg border h-28" />
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-lg bg-vintageGold text-black font-semibold">Send Enquiry</button>
          {sent && <div className="text-sm">Enquiry sent (frontend demo)</div>}
        </div>
      </div>
    </form>
  );
}
