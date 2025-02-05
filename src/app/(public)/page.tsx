'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import MusicCard from '@/components/MusicCard';
import Autoplay from 'embla-carousel-autoplay';

const genders = ['Pop', 'Gospel', 'Rock', 'Mpb', 'Samba', 'Sertanejo'];

export default function Home() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <Carousel
        plugins={[Autoplay()]}
        opts={{
          loop: true,
        }}>
        <CarouselContent>
          <CarouselItem>
            <div className="flex h-[50vh] items-center justify-center rounded bg-zinc-400">1</div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex h-[50vh] items-center justify-center rounded bg-zinc-400">2</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="grid grid-cols-[16%_84%]">
        <div className="pr-4">
          <h2 className="text-lg font-bold">Gêneros</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Todos</Button>
            {genders.map((gender, i) => (
              <Button variant="outline" key={gender + i}>
                {gender}
              </Button>
            ))}
            <div className="h-[1px] w-full bg-zinc-200" />
            <Input placeholder="Pesquisar música" />
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-4 border-l-[1px] border-zinc-300">
          {Array.from({ length: 50 }, (_, i) => i).map((index) => (
            <Link key={index} href={`item/${index}`}>
              <MusicCard music={{ id: index }} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
