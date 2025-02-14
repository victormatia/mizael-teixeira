import { HOST } from '@/constants/urls';
import mpClient from '@/lib/mpClient';
import { Music } from '@prisma/client';
import { Preference } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export const dynamic = 'force-dynamic';

type TData = Music & {
  quantity: number;
  price: number;
  payerEmail: string;
};

async function main(data: TData) {
  const preference = new Preference(mpClient);

  const { id, init_point, external_reference } = await preference.create({
    body: {
      external_reference: uuid(),
      payer: {
        email: data.payerEmail,
      },
      items: [
        {
          id: data.id,
          title: data.name,
          quantity: data.quantity,
          unit_price: data.price,
          currency_id: 'BRL',
          category_id: 'default',
        },
      ],
      payment_methods: {
        installments: 2,
      },
      back_urls: {
        success: HOST + '/payment/approved',
        pending: HOST + '/payment/pending',
        failure: HOST + '/payment/rejected',
      },
      auto_return: 'approved',
    },
  });

  return { preferenceId: id, initPoint: init_point, externalReference: external_reference };
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  return main(body)
    .then(async (data) => {
      return Response.json(data, { status: 201 });
    })
    .catch(async (e) => {
      console.error(e);
      return NextResponse.json({ message: e.message }, { status: 500 });
    });
}
