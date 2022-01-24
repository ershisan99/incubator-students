import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import RichTextItem from "../../components/RichTextItem";
import Title from "../../components/Title";

const Notes = (props: any) => {
   return (
      <div>
         {props.notes.map((note: any) => (
            <>
               <Title>{note.category}</Title>
               {note.content.map((contentRaw: any) => (
                  <RichTextItem content={contentRaw.raw} />
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
