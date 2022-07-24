import "tailwindcss/tailwind.css";
import Head from "next/head";
import CookieBanner from "../components/CookieBanner/CookieBanner";
import Analytics from "../components/Analytics/Analytics";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> React &amp; Firebase SaaS starter</title>
        <meta
          name="description"
          content="Create your next SaaS business by using this starter. Brings a full-stack React web app to life in minutes. Made using a dream tech stack: React, Firebase and Stripe."
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#fcf4ed"></meta>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* Social sharing images */}
        <meta property="og:url" content="https://reactapp.dev" />
        <meta property="og:title" content="React &amp; Firebase SaaS starter" />
        <meta
          property="og:description"
          content="Create your next SaaS business by using this starter. Brings a full-stack React web app to life in minutes. Made using a dream tech stack: React, Firebase and Stripe."
        />
        <meta
          property="og:image"
          content="https://reactapp.dev/ReactFirebaseStarter_wide.jpg"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:text:title"
          content="React &amp; Firebase SaaS starter"
        />
        <meta
          name="twitter:description"
          content="Create your next SaaS business by using this starter. Brings a full-stack React web app to life in minutes."
        />
        <meta
          name="twitter:image"
          content="https://reactapp.dev/ReactFirebaseStarter.jpg"
        />
      </Head>

      <Component {...pageProps} />
      <CookieBanner
        privacyPolicyLink={"/privacy"}
        showStatistic={true}
        showMarketing={false}
        showExternalMedia={false}
      />
      <Analytics />
    </>
  );
}

export default MyApp;
