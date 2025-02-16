import prisma from '@/lib/prisma';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
// import { NextRequest } from 'next/server';

async function main() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg: MailDataRequired = {
    to: 'fvictor1705@gmail.com',
    from: 'mizaelteixeira.contato@gmail.com',
    subject: 'Confirmação de compra',
    templateId: 'd-b8497dce95c04c75864871dfd85dd892',
  };

  sgMail.send(msg);
}

export const dynamic = 'force-dynamic';

export async function POST() {
  // const body = req.json();

  return main()
    .then(async () => {
      await prisma.$disconnect();
      return Response.json({ message: 'Sent email' }, { status: 201 });
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return Response.json({ message: e.message }, { status: 500 });
    });
}
