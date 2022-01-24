import { gql } from "@apollo/client";
import React from "react";
import client from "../apollo-client";

const HeaderTest = (props: any) => {
   console.log(props);

   return <div>props</div>;
};

export default HeaderTest;

export async function getStaticProps() {
   const { data } = await client.query({
      query: gql`
         query Categories {
            todolistManuals {
               slug
               title
               manualId
            }
            homeworksByIgnat {
               homeworkId
               slug
               title
            }
            homeworks {
               slug
               title
               homeworkId
            }
            notes {
               slug
               title
            }
         }
      `,
   });

   return {
      props: { data: data },
   };
}
