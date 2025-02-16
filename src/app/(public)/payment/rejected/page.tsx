'use client';

import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentRjected() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center bg-zinc-50">
      <div className="max-w-screen-sm space-y-6 rounded-sm border border-zinc-100 bg-white p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-zinc-800">Infelizmente o seu pagamento foi rejeitado!</h1>
          <CircleX className="text-red-400" size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-zinc-600">Informações importantes</h3>
          <p className="text-base font-normal text-zinc-500">
            Algo de errado aconteceu. Verifique sua conexão com a internet e tente novamente.
            <br />
            Caso o erro persista consulte a provedora do seu cartão.
          </p>
        </div>

        <Button onClick={() => router.replace('/')}>Voltar para o início</Button>
      </div>
    </main>
  );
}
