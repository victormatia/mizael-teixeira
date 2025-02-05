import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { FileSpreadsheet } from 'lucide-react';

type TProps = {
  music: {
    id: string | number;
  };
};

export default function MusicCard({ music }: TProps) {
  return (
    <Card className="max-w-[225px]">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex h-[180px] w-[190px] items-center justify-center rounded-sm bg-zinc-300">
          <FileSpreadsheet color="gray" />
        </div>
        <CardTitle>
          <p>Música {music.id}</p>
        </CardTitle>
        <CardDescription>R$ 12,00</CardDescription>
      </CardContent>
    </Card>
  );
}
