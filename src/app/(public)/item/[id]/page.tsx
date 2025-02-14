'use client';

import MusicCard from '@/components/MusicCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { MUSICS_URL } from '@/constants/urls';
import useEmail from '@/hooks/useEmail';
import useMp from '@/hooks/useMp';
import { Music } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TProps = {
  params: { id: string };
};

const instruments = ['Teclado', 'Violão', 'Violino', 'Flauta', 'Sax (Alto)', 'Sax (Tenor)'];

const tones = ['C', 'D', 'G', 'A'];

export default function Item({ params: { id } }: TProps) {
  const [instrument, setInstrument] = useState<string>(instruments[0]);
  const [tone, setTone] = useState<string | 'Original'>('Original');

  const { email, saveEmail } = useEmail();

  const router = useRouter();

  const { data: music, isLoading } = useQuery<Music>({
    queryKey: ['music', `${id}`],
    queryFn: async () => {
      const { data } = await axios.get(MUSICS_URL + `/${id}`);
      return data;
    },
  });

  const { createCheckoutMutation, mutateIsPending } = useMp();

  const createCheckout = () =>
    createCheckoutMutation.mutate({
      id: music?.id,
      name: `Partitura: ${music?.name} - Versão: ${instrument} - Tom: ${tone}`,
      quantity: 1,
      price: 12,
      payerEmail: email,
    });

  return (
    <main className="flex flex-col items-center justify-center gap-4 p-8 max-md:p-4">
      <Dialog>
        <div className="w-full max-w-screen-md">
          <Button onClick={() => router.back()} variant="link" className="p-0 text-base font-bold">
            <ChevronLeft />
            <p>Voltar</p>
          </Button>
        </div>
        <div className="flex w-full max-w-screen-md items-center justify-between gap-8 max-md:flex-col">
          <div className="flex flex-col justify-center gap-4">
            {isLoading && <Skeleton className="h-[280px] w-[222px] p-4" />}
            {music && <MusicCard music={music} />}
            <div>
              <p className="font-medium text-zinc-800">Instrumento: {instrument ? instrument : 'Não selecionado'}</p>
              <p className="font-medium text-zinc-800">Tom: {tone ? tone : 'Original'}</p>
            </div>
          </div>
          <div className="h-2/3 w-[1px] bg-zinc-200" />
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xl font-bold text-zinc-800">Escolha o instrumento</label>
              <div className="flex max-w-md flex-wrap gap-4">
                {instruments.map((currentInstrument, i) => (
                  <Button
                    onClick={() => setInstrument(currentInstrument)}
                    variant={instrument === currentInstrument ? 'default' : 'outline'}
                    key={currentInstrument + i}>
                    {currentInstrument}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xl font-bold text-zinc-800">Escolha o tom</label>
              <div className="flex max-w-md flex-wrap gap-4">
                <Button onClick={() => setTone('Original')} variant={tone === 'Original' ? 'default' : 'outline'}>
                  Original
                </Button>
                {tones.map((currentTone, i) => (
                  <Button
                    onClick={() => setTone(currentTone)}
                    variant={tone === currentTone ? 'default' : 'outline'}
                    key={currentTone + i}>
                    {currentTone}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <DialogTrigger asChild>
                <Button disabled={isLoading} className="w-full">
                  Comprar
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </div>

        <DialogContent>
          {mutateIsPending ? (
            <>
              <DialogHeader>
                <DialogTitle>Redirecionando...</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Você será redirecionado para a área de pagamento em alguns segundos.
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Adicione um email</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {email
                  ? 'Confirme o seu email antes de proseguir'
                  : 'Para proseguir você deve disponibilizar um email para que possamos enviar o arquivo da partitura quando o pagamento for aprovado.'}
              </DialogDescription>
              <Input
                onChange={({ target }) => saveEmail(target.value)}
                value={email ? email : undefined}
                placeholder="exemplo@gmail.com"
              />
              <DialogFooter>
                <Button disabled={mutateIsPending} onClick={createCheckout}>
                  {mutateIsPending ? 'Carregando' : 'Finalizar compra'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
