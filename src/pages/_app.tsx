import { inter, lora } from "lib/fonts/fonts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<Props> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${lora.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
