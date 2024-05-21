import React from "react";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../../i18n";
import Layout from "@/components/Layout";
import { wrapper } from "@/store/store";

const myApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
export default appWithTranslation(myApp);
