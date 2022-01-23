import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export const Home = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2 ">
			<Head>
				<title>Student's page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</div>
	);
};

export default Home;
