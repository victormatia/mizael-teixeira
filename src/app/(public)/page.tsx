'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import MusicCard from '@/components/MusicCard';
import Autoplay from 'embla-carousel-autoplay';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GENDERS_URL, MUSIC_BY_GENDER, MUSICS_URL } from '@/constants/urls';
import { Gender, Music } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currGender, setCurrGender] = useState<string>('Todos');

  const { data: genders, isLoading: gendersIsLoading } = useQuery<Gender[]>({
    queryKey: ['genders'],
    staleTime: 20000,
    queryFn: async () => {
      const { data } = await axios.get(GENDERS_URL);
      return data;
    },
  });

  const {
    data: musics,
    isLoading: musicsIsloading,
    isFetching: musicsIsFetching,
    refetch: refetchMusics,
  } = useQuery<Music[]>({
    queryKey: ['musics', currGender],
    staleTime: 20000,
    queryFn: async () => {
      const URL = currGender === 'Todos' ? MUSICS_URL : MUSIC_BY_GENDER + currGender;
      const { data } = await axios.get(URL);
      return data;
    },
  });

  useEffect(() => {
    refetchMusics();
  }, [currGender, refetchMusics]);

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
      <div className="grid max-lg:space-y-8 lg:grid-cols-[16%_84%]">
        <div className="space-y-4 lg:pr-4">
          <h2 className="text-lg font-bold">Gêneros</h2>
          <div className="flex flex-wrap gap-2">
            {gendersIsLoading ? (
              <>
                <Skeleton className="h-9 w-14" />
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-28" />
              </>
            ) : (
              <>
                <Button onClick={() => setCurrGender('Todos')} variant={currGender === 'Todos' ? 'default' : 'outline'}>
                  Todos
                </Button>
                {genders?.map((gender, i) => (
                  <Button
                    onClick={() => setCurrGender(gender.name)}
                    variant={currGender === gender.name ? 'default' : 'outline'}
                    key={gender.id + i}>
                    {gender.name}
                  </Button>
                ))}
              </>
            )}
          </div>
          <div className="h-[1px] w-full bg-zinc-200" />
          <Input placeholder="Pesquisar música" />
        </div>
        <div className="flex flex-wrap gap-4 border-zinc-300 max-lg:justify-center lg:justify-end lg:border-l-[1px]">
          {musicsIsloading || musicsIsFetching ? (
            <>
              <Skeleton className="h-[280px] w-[222px] p-4" />
              <Skeleton className="h-[280px] w-[222px] p-4" />
              <Skeleton className="h-[280px] w-[222px] p-4" />
              <Skeleton className="h-[280px] w-[222px] p-4" />
              <Skeleton className="h-[280px] w-[222px] p-4" />
            </>
          ) : (
            musics?.map((music) => (
              <Link key={music.id} href={`item/${music.id}`}>
                <MusicCard music={music} />
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
