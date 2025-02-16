import { MercadoPagoConfig } from 'mercadopago';

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN as string });

export default mpClient;
