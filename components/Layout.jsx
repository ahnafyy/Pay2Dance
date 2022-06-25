import Head from "next/head";
import GlobalStyles from "./prebuilt/GlobalStyles";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

/* It's loading the Stripe API. */
const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

/**
 * It's a function that returns a head tag with a title, a meta tag with a character set, and a meta
 * tag with a viewport
 * @returns The Layout component is being returned.
 */
const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <link rel="shortcut icon" href="./pay2Dance.ico" />
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};

export default Layout;
