'use client';

import { Button } from '@/components/ui/button';
import useEmail from '@/hooks/useEmail';
import { PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentAproved() {
  const { email } = useEmail();
  const router = useRouter();

  return (
    <main className="flex items-center justify-center bg-zinc-50">
      <div className="max-w-screen-sm space-y-6 rounded-sm border border-zinc-100 bg-white p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-zinc-800">Parabéns, o seu pagamento foi aprovado!</h1>
          <PartyPopper className="text-amber-500" size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-zinc-600">Informações importantes</h3>
          <p className="text-base font-normal text-zinc-600">
            A sua partitura será enviado ao email: <b className="text-amber-500">{email}</b>, o qual foi disponibilizado
            por você no ato da compra.
          </p>
        </div>

        <Button onClick={() => router.replace('/')}>Voltar para o início</Button>
      </div>
    </main>
  );
}
