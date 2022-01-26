import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Title from "../../components/Title";
import Card from "../../components/Card";

const Notes = ({ note }: any) => {
   return (
      <>
         {note.content.map((contentRaw: any) => (
            <Card content={contentRaw.raw} />
         ))}
      </>
   );
};

export default Notes;

export async function getStaticPaths() {
   const { data } = await client.query({
      query: gql`
         query {
            notes {
               slug
            }
         }
      `,
   });
   const { notes } = data;
   const paths = notes.map((note: { slug: string }) => ({
      params: { slug: note.slug },
   }));

   return {
      paths,
      fallback: true, // false or 'blocking'
   };
}
export const getStaticProps: any = async ({ params }: any) => {
   if (params) {
      const slug = params.slug;
      const { data } = await client.query({
         query: gql`
            query getHomework($slug: String!) {
               note(where: { slug: $slug }) {
                  content {
                     raw
                  }
                  title
               }
            }
         `,
         variables: { slug },
      });

      return {
         props: { note: data.note },
      };
   }
};
