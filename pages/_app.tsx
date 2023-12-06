import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Head>
        <title>Estate Ledger | Konma</title>
        <meta name="description" content="Marketplace Starter by Mesh SDK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://media.licdn.com/dms/image/C560BAQHtUhTlqSzmYA/company-logo_200_200/0/1626840339452?e=2147483647&v=beta&t=Y2KAwri9wam_Z0AoCXU7b7wBbLC273MOVm3SRNZrkC8" />
      </Head>
      

      <Navbar />
      <Component {...pageProps} />{" "}
    </MeshProvider>
  );
}
