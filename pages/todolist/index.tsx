import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Card from "../../components/Card";
import Title from "../../components/Title";

const Manuals = (props: any) => {
   return (
      <div>
         {props.manuals.map((note: any) => (
            <>
               <Title>{note.title}</Title>
               {note.content.map((contentRaw: any) => (
                  <Card content={contentRaw.raw} />
               ))}
            </>
         ))}
      </div>
   );
};

export default Manuals;

export async function getStaticProps() {
   const { data } = await client.query({
      query: gql`
         query {
            todolistManuals {
               content {
                  raw
               }
               slug
               title
               manualId
            }
         }
      `,
   });

   return {
      props: { manuals: data.todolistManuals },
   };
}
