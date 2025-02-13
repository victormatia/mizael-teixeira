import prisma from '@/lib/prisma';
import createsHtml from '@/utils/createsHtml';
import nodemailer, { SendMailOptions } from 'nodemailer';

async function main() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mizaelteixeira.contato@gmail.com',
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions: SendMailOptions = {
    from: 'mizaelteixeira',
    to: 'fvictor1705@gmail.com',
    subject: 'Confirmação de compra',
    html: createsHtml(),
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      throw new Error(error.message);
    }
  });

  return 'OK';
}

export const dynamic = 'force-dynamic';

export async function POST() {
  return main()
    .then(async (data) => {
      await prisma.$disconnect();
      return Response.json(data, { status: 201 });
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return Response.json({ message: e.message }, { status: 500 });
    });
}
