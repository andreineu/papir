import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import Script from 'next/script';

import { Layout } from '@src/components/layout';
import { env } from '@src/env.mjs';
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
      {env.NEXT_PUBLIC_UMAMI_SITE_ID && (
        <Script
          async
          src="https://analytics.papir.space/script.js"
          data-website-id={env.NEXT_PUBLIC_UMAMI_SITE_ID}
        />
      )}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
