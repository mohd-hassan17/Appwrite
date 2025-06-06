'use client';

import React from 'react';
import Signup from '@/components/Signup';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/useAuth';

const LoginPage = () => {
  const { authStatus } = useAuth();
  const router = useRouter();

  if (authStatus) {
    router.push('/profile');
    return <></>;
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Signup />
    </section>
  );
}

export default LoginPage;