'use client';

import MusicCard from '@/components/MusicCard';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

type TProps = {
  params: { id: string };
};

const instruments = ['Teclado', 'Violão', 'Violino', 'Flauta', 'Sax (Alto)', 'Sax (Tenor)'];

const tones = ['C', 'D', 'G', 'A'];

export default function Item({ params: { id } }: TProps) {
  const [instrument, setInstrument] = useState<string | undefined>(undefined);
  const [tone, setTone] = useState<string | 'Original'>('Original');

  return (
    <main className="flex items-center justify-center gap-16 p-8">
      <div className="flex flex-col justify-center gap-4">
        <MusicCard music={{ id }} />
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
          <Button className="w-full">Comprar</Button>
        </div>
      </div>
    </main>
  );
}
