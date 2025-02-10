import prisma from '@/lib/prisma';

async function main(id: string) {
  const products = await prisma.music.findUnique({
    where: { id },
    include: { GenderToMusic: { select: { Gender: true } } },
  });
  return products;
}

export const dynamic = 'force-dynamic';

type TParam = { params: { id: string } };

export async function GET(_req: Request, { params }: TParam) {
  const { id } = params;

  if (!id) return Response.json({ message: 'Bad Rquest' }, { status: 400 });

  return main(id)
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
