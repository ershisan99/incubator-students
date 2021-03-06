import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Title from "../../components/Title";
import Card from "../../components/Card";

const HomeworksByIgnatPage = ({ homeworkByIgnat }: any) => {
   return (
      <>
         <Title>{homeworkByIgnat.title}</Title>
         {homeworkByIgnat.task.map((contentRaw: any) => (
            <Card content={contentRaw.raw} key={contentRaw.raw} />
         ))}
      </>
   );
};

export default HomeworksByIgnatPage;

export async function getStaticPaths() {
   const { data } = await client.query({
      query: gql`
         query {
            homeworksByIgnat {
               slug
            }
         }
      `,
   });
   const homeworksByIgnat = data.homeworksByIgnat;
   const paths = homeworksByIgnat.map((homeworkByIgnat: { slug: string }) => ({
      params: { slug: homeworkByIgnat.slug },
   }));

   return {
      paths,
      fallback: false, // false or 'blocking'
   };
}
export const getStaticProps: any = async ({ params }: any) => {
   const slug = params.slug;
   const { data } = await client.query({
      query: gql`
         query getHomeworkByIgnat($slug: String!) {
            homeworkByIgnat(where: { slug: $slug }) {
               title
               task {
                  raw
               }
            }
         }
      `,
      variables: { slug },
   });

   return {
      props: { homeworkByIgnat: data.homeworkByIgnat },
   };
};
