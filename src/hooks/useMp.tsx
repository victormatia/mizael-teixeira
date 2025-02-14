import { CREATE_CHECKOUT_URL, POST_EMAIL_SUCESS } from '@/constants/urls';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useMp() {
  const router = useRouter();

  useEffect(() => {
    initMercadoPago(process.env.MP_TOKEN as string);
  }, []);

  type TCreateCheckoutResponse = { preferenceId: string; initPoint: string };

  const createCheckoutMutation = useMutation({
    mutationKey: ['create-checkout'],
    mutationFn: async (checkoutData: any) => {
      const { data } = await axios.post<TCreateCheckoutResponse>(CREATE_CHECKOUT_URL, checkoutData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data;
    },
    onSuccess: (data) => {
      axios.post(POST_EMAIL_SUCESS)
      console.log(data)
      router.push(data.initPoint);
    },
    onError: (e) => console.error(e),
  });

  const mutateIsPending = createCheckoutMutation.isPending;

  return { createCheckoutMutation, mutateIsPending };
}
