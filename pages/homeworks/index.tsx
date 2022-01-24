import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Title from "../../components/Title";
import Card from "../../components/Card";

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

const Homeworks = (props: any) => {
   return (
      <div>
         {props.homeworks.map((homework: any) => (
            <>
               <Title>{homework.title}</Title>
               {homework.task.map((task: any) => (
                  <Card content={task.raw} />
               ))}
            </>
         ))}
      </div>
   );
};

export default Homeworks;

export async function getStaticProps() {
   const { data } = await client.query({
      query: gql`
         query {
            homeworks {
               homeworkId
               slug
               task {
                  raw
               }
               title
            }
         }
      `,
   });

   return {
      props: { homeworks: data.homeworks },
   };
}
