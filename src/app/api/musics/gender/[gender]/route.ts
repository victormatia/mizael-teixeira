import prisma from '@/lib/prisma';
import { console } from 'inspector';

async function main(gender: string) {
  const products = await prisma.music.findMany({
    where: { GenderToMusic: { every: { Gender: { name: gender } } } },
    include: { GenderToMusic: { select: { Gender: true } } },
  });
  return products;
}

export const dynamic = 'force-dynamic';

type TParam = { params: { gender: string } };

export async function GET(_req: Request, { params }: TParam) {
  const { gender } = params;

  if (!gender) return Response.json({ message: 'Bad Rquest' }, { status: 400 });

  return main(gender)
    .then(async (data) => {
      await prisma.$disconnect();
      return Response.json(data);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return Response.json({ message: e.message }, { status: 500 });
    });
}
