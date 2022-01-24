import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import Card from "../../components/Card";
import Title from "../../components/Title";

const Notes = (props: any) => {
   return (
      <div>
         {props.notes.map((note: any) => (
            <>
               <Title>{note.category}</Title>
               {note.content.map((contentRaw: any) => (
                  <Card content={contentRaw.raw} />
               ))}
            </>
         ))}
      </div>
   );
};

export default Notes;

export async function getStaticProps() {
   const { data } = await client.query({
      query: gql`
         query {
            notes {
               category
               content {
                  raw
               }
               slug
            }
         }
      `,
   });

   return {
      props: { notes: data.notes },
   };
}
