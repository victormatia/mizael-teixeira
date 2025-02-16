// app/api/mercadopago-webhook/route.js

import { NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import mpClient from '@/lib/mpClient';
import axios from 'axios';
import { POST_EMAIL_SUCESS } from '@/constants/urls';
// import { handleMercadoPagoPayment } from "@/app/server/mercado-pago/handle-payment";

export async function POST(request: Request) {
  try {
    // verifyMercadoPagoSignature(request);

    const body = await request.json();

    const { topic, data } = body;

    switch (topic) {
      case 'payment':
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({ id: data.id });
        if (
          paymentData.status === 'approved' || // Pagamento por cartão OU
          paymentData.date_approved !== null // Pagamento por Pix
        ) {
          // await handleMercadoPagoPayment(paymentData);
          await axios.post(POST_EMAIL_SUCESS);
        }
        break;
      // case "subscription_preapproval": Eventos de assinatura
      //   console.log("Subscription preapproval event");
      //   console.log(data);
      //   break;
      default:
        console.log('body', body);
      // console.log('Unhandled event type:', type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
