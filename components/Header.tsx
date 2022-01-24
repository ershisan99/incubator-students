import { gql } from "@apollo/client";
import React from "react";
import client from "../apollo-client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IconContext } from "react-icons";
import { Dropdown } from "./Dropdown";
const categories = [
   { title: "Homeworks", slug: "homeworks" },
   { title: "ToDoList", slug: "todolist" },
   { title: "Notes", slug: "notes" },
];

const Header = (props: any) => {
   const { theme, setTheme } = useTheme();
   console.log(props);

   return (
      <nav className=" container flex mx-auto justify-center flex-nowrap px-10 mb-8">
         <div className=" flex container border-b w-full flex-nowrap align-middle justify-start dark:border-white border-slate-900 py-6">
            <Link href="/">
               <div className=" flex flex-nowrap cursor-pointer self-start font-bold text-4xl ">
                  it-incubator.by
               </div>
            </Link>
            <div className=" md:flex hidden flex-auto items-center justify-end">
               <div className="flex justify-end items-center cursor-pointer">
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
                  {categories.map((category: any) => {
                     return (
                        <span className="px-4">
                           <Dropdown
                              buttonText={category.title}
                              menuItems={[]}
                           />
                        </span>
                     );
                  })}
                  {console.log(props)}
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
