import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export const Home = () => {
   return (
      <div className="flex flex-col items-center justify-center py-2 ">
         <Head>
            <title>Student's page</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className="text-white">Some stats and whatnot</main>
      </div>
   );
};

export default Home;
