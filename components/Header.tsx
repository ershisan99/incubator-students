import { useQuery, gql } from "@apollo/client";
import React from "react";
import client from "../apollo-client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IconContext } from "react-icons";
import { Dropdown } from "./Dropdown";
import { HiMenu } from "react-icons/hi";

const HEADER_QUERY = gql`
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
`;

const Header = () => {
   const { data, loading, error } = useQuery(HEADER_QUERY);
   const { theme, setTheme } = useTheme();

   if (loading) {
      return <h2>Loading...</h2>;
   }

   if (error) {
      console.error(error);
      return null;
   }

   const categories = Object.keys(data);

   const homeworks = data.homeworks;
   const homeworksByIgnat = data.homeworksByIgnat;
   const notes = data.notes;
   const todolistManuals = data.todolistManuals;

   //TODO: this is fucking disgusting
   const menuItems = {
      homeworks: data.homeworks.map((homework: any) => homework.title),
      homeworksByIgnat: data.homeworksByIgnat.map((task: any) => task.title),
      notes: data.notes.map((note: any) => note.title),
      todolistManuals: data.todolistManuals.map((manual: any) => manual.title),
   };

   console.log(categories);
   console.log(homeworks);
   console.log(homeworksByIgnat);
   console.log(notes);
   console.log(todolistManuals);

   return (
      <nav className=" flex justify-center flex-nowrap mb-8 w-full">
         <div className=" flex lg:container border-b max-w-6xl w-11/12 lg:w-4/5 mx-auto flex-nowrap align-middle justify-between dark:border-white border-slate-900 py-6 ">
            <div className="lg:hidden flex items-center">
               <HiMenu className="w-6 h-6" />
            </div>

            <Link href="/">
               <div className=" flex cursor-pointer font-bold text-4xl lg:px-0 pr-4 ">
                  it-incubator.by
               </div>
            </Link>
            <div className=" lg:flex hidden items-center justify-end">
               <div className="flex items-center cursor-pointer">
                  <div className="px-4">
                     <IconContext.Provider
                        value={{
                           size: "1.5rem",
                           style: { verticalAlign: "middle" },
                        }}
                     >
                        {theme === "dark" ? (
                           <MdOutlineLightMode
                              onClick={() => setTheme("light")}
                           />
                        ) : (
                           <MdOutlineDarkMode
                              onClick={() => setTheme("dark")}
                           />
                        )}
                     </IconContext.Provider>
                  </div>

                  <span className="px-4 ">
                     <Dropdown
                        buttonText={"Домашки"}
                        menuItems={menuItems.homeworks}
                     />
                  </span>
                  <span className="px-4">
                     <Dropdown
                        buttonText={"Домашки от Игната"}
                        menuItems={menuItems.homeworksByIgnat}
                     />
                  </span>
                  <span className="px-4">
                     <Dropdown
                        buttonText={"To-do List"}
                        menuItems={menuItems.todolistManuals}
                     />
                  </span>
                  <span className="px-4">
                     <Dropdown
                        buttonText={"Памятка студента"}
                        menuItems={menuItems.notes}
                     />
                  </span>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Header;
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
