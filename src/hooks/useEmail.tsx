import { useEffect, useState } from 'react';

export default function useEmail() {
  const [email, setEmail] = useState<string | null>(null);

  const saveEmail = (data: string) => {
    setEmail(data);
    localStorage.setItem('MT-email', data);
  };

  useEffect(() => {
    const emailOnLocalStorage = localStorage.getItem('MT-email');

    if (emailOnLocalStorage) setEmail(emailOnLocalStorage);
    else setEmail(null);
  }, []);

  return { email, saveEmail };
}
