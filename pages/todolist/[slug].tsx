import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Title from "../../components/Title";
import Card from "../../components/Card";

const TodolistPage = ({ todolist }: any) => {
   return (
      <>
         <Title>{todolist.title}</Title>
         {todolist.content.map((contentRaw: any) => (
            <Card content={contentRaw.raw} />
         ))}
      </>
   );
};

export default TodolistPage;

export async function getStaticPaths() {
   const { data } = await client.query({
      query: gql`
         query {
            todolistManuals {
               slug
            }
         }
      `,
   });
   const todolists = data.todolistManuals;
   const paths = todolists.map((todolist: { slug: string }) => ({
      params: { slug: todolist.slug },
   }));

   return {
      paths,
      fallback: false, // false or 'blocking'
   };
}
export const getStaticProps: any = async ({ params }: any) => {
   if (params) {
      const slug = params.slug;
      const { data } = await client.query({
         query: gql`
            query getTodolist($slug: String!) {
               todolistManual(where: { slug: $slug }) {
                  content {
                     raw
                  }
                  title
                  manualId
               }
            }
         `,
         variables: { slug },
      });

      return {
         props: { todolist: data.todolistManual },
      };
   }
};
