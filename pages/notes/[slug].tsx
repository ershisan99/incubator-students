import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Title from "../../components/Title";
import Card from "../../components/Card";
import { GetStaticPaths, GetStaticProps } from "next";

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

export const getStaticPaths: GetStaticPaths = async () => {
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
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
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
      variables: { slug: params!.slug },
   });

   return {
      props: { note: data.note },
   };
};
