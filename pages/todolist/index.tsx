import { gql } from "@apollo/client";
import React from "react";
import client from "../../apollo-client";
import RichTextItem from "../../components/RichTextItem";
import Title from "../../components/Title";

const Manuals = (props: any) => {
   return (
      <div>
         {props.manuals.map((note: any) => (
            <>
               <Title>{note.title}</Title>
               {note.content.map((contentRaw: any) => (
                  <RichTextItem content={contentRaw.raw} />
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
