import prisma from '@/lib/prisma';

async function main() {
  const products = await prisma.music.findMany({
    include: {
      GenderToMusic: {
        select: {
          Gender: true,
        },
      },
    },
  });
  return products;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  return main()
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
