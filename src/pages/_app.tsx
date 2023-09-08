import { type AppType } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { Layout } from '@src/components/layout';
import { env } from '@src/env.mjs';
import '@src/styles/globals.css';
import { Toaster } from '@src/ui-kit';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Papir</title>
        <meta name="description" content="Simple storage for your notes" />
      </Head>
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
    </>
  );
};

export default MyApp;
