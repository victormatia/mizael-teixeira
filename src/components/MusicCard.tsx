import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { FileSpreadsheet } from 'lucide-react';
import { Music } from '@prisma/client';
import { usePathname } from 'next/navigation';

type TProps = {
  music: Music;
};

export default function MusicCard({ music }: TProps) {
  const path = usePathname();

  return (
    <Card className="max-w-[225px]">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex h-[180px] w-[190px] items-center justify-center rounded-sm bg-zinc-300">
          <FileSpreadsheet color="gray" />
        </div>
        <CardTitle>{music.name}</CardTitle>
        <CardDescription className={path === '/' ? 'w-32 truncate' : ''}>{music.autor}</CardDescription>
        <CardDescription>R$ 12,00</CardDescription>
      </CardContent>
    </Card>
  );
}
