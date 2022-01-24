import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ApolloProvider, gql } from "@apollo/client";
import client from "../apollo-client";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ApolloProvider client={client}>
         <ThemeProvider attribute="class">
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </ThemeProvider>
      </ApolloProvider>
   );
}

export default MyApp;
