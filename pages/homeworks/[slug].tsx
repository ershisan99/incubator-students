import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Title from "../../components/Title";
import Card from "../../components/Card";
import { GetStaticProps } from "next";

type homeworksPropTypes = {
   homeworks: Array<homeworkPropTypes>;
};

//TODO
type homeworkPropTypes = {
   title: string;
   week: number;
   slug: string;
   //    task: Array<raw: RichTextContent>;
};

const HomeworkPage = (props: any) => {
   return (
      <div>
         <>
            <Title>{props.homework.title}</Title>
            {props.homework.task.map((task: any) => (
               <Card content={task.raw} />
            ))}
         </>
      </div>
   );
};

export default HomeworkPage;

export async function getStaticPaths() {
   const { data } = await client.query({
      query: gql`
         query {
            homeworks {
               slug
            }
         }
      `,
   });
   const { homeworks } = data;
   const paths = homeworks.map((hw: { slug: string }) => ({
      params: { slug: hw.slug },
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
            query getHomework($slug: String!) {
               homework(where: { slug: $slug }) {
                  task {
                     raw
                  }
                  title
                  homeworkId
               }
            }
         `,
         variables: { slug },
      });

      return {
         props: { homework: data.homework },
      };
   }
};
