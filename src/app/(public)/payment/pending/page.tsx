'use client';

import { Button } from '@/components/ui/button';
import useEmail from '@/hooks/useEmail';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentPedding() {
  const { email } = useEmail();
  const router = useRouter();

  return (
    <main className="flex items-center justify-center bg-zinc-50">
      <div className="max-w-screen-sm space-y-6 rounded-sm border border-zinc-100 bg-white p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-zinc-800">O seu pagamento está em analise!</h1>
          <Clock className="text-zinc-500" size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-zinc-600">Informações importantes</h3>
          <p className="text-base font-normal text-zinc-500">
            Fique tranquilo, serão enviadas atualizações sobre seu pedido ao email:{' '}
            <b className="text-amber-500">{email}</b> sempre que houver mudanças de status.
          </p>
        </div>

        <Button onClick={() => router.replace('/')}>Voltar para o início</Button>
      </div>
    </main>
  );
}
