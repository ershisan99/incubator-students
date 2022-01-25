import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
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
