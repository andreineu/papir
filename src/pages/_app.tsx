import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';

import { Layout } from '@src/components/layout';
import { api } from '@src/lib/api';
import '@src/styles/globals.css';
import { Toaster } from '@src/ui-kit';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
