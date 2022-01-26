import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import client from "../apollo-client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IconContext } from "react-icons";
import { Dropdown, MyLink } from "./Dropdown";
import { HiMenu, HiX } from "react-icons/hi";
import { Disclosure } from "@headlessui/react";

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

   const homeworks = data.homeworks;
   const homeworksByIgnat = data.homeworksByIgnat;
   const notes = data.notes;
   const todolistManuals = data.todolistManuals;

   return (
      <Disclosure as="nav">
         {({ open }) => (
            <>
               <div className="max-w-7xl mx-auto w-11/12">
                  <div className="flex items-center justify-between lg:justify-center h-16">
                     <div className="flex lg:hidden">
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md hover:text-white hover:bg-gray-700 ">
                           {open ? (
                              <HiX
                                 className="block h-6 w-6"
                                 aria-hidden="true"
                              />
                           ) : (
                              <HiMenu
                                 className="block h-6 w-6"
                                 aria-hidden="true"
                              />
                           )}
                        </Disclosure.Button>
                     </div>
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <Link href="/">
                              <div className=" flex shrink-0 cursor-pointer font-bold text-4xl lg:px-0 pr-2 ">
                                 it-incubator.by
                              </div>
                           </Link>
                        </div>
                        <div className={"hidden lg:block"}>
                           <div className="ml-10 flex items-baseline space-x-4">
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
                                       category="homeworks"
                                       buttonText={"Домашки"}
                                       menuItems={data.homeworks}
                                    />
                                 </span>
                                 <span className="px-4">
                                    <Dropdown
                                       category="homeworksByIgnat"
                                       buttonText={"Домашки от Игната"}
                                       menuItems={data.homeworksByIgnat}
                                    />
                                 </span>
                                 <span className="px-4">
                                    <Dropdown
                                       category="todolist"
                                       buttonText={"To-do List"}
                                       menuItems={data.todolistManuals}
                                    />
                                 </span>
                                 <span className="px-4">
                                    <Dropdown
                                       category="notes"
                                       buttonText={"Памятка студента"}
                                       menuItems={data.notes}
                                    />
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <Disclosure.Panel className="lg:hidden">
                  <div className="mx-auto w-11/12">
                     <Disclosure>
                        <div className="mx-auto w-11/12">
                           <Disclosure.Button>Домашки</Disclosure.Button>
                           <Disclosure.Panel>
                              {data.homeworks.map(
                                 (el: { title: string; slug: string }) => {
                                    return (
                                       <MyLink href={"/homeworks/" + el.slug}>
                                          {el.title}
                                       </MyLink>
                                    );
                                 }
                              )}
                           </Disclosure.Panel>
                        </div>
                     </Disclosure>
                     <Disclosure>
                        <div className="mx-auto w-11/12">
                           <Disclosure.Button>
                              Домашки от Игната
                           </Disclosure.Button>
                           <Disclosure.Panel>
                              {data.homeworksByIgnat.map(
                                 (el: { title: string; slug: string }) => {
                                    return (
                                       <MyLink
                                          href={"/homeworksByIgnat/" + el.slug}
                                       >
                                          {el.title}
                                       </MyLink>
                                    );
                                 }
                              )}
                           </Disclosure.Panel>
                        </div>
                     </Disclosure>
                     <Disclosure>
                        {" "}
                        <div className="mx-auto w-11/12">
                           <Disclosure.Button>To-do List</Disclosure.Button>
                           <Disclosure.Panel>
                              {data.todolistManuals.map(
                                 (el: { title: string; slug: string }) => {
                                    return (
                                       <MyLink href={"/todolist/" + el.slug}>
                                          {el.title}
                                       </MyLink>
                                    );
                                 }
                              )}
                           </Disclosure.Panel>
                        </div>
                     </Disclosure>
                     <Disclosure>
                        <div className="mx-auto w-11/12">
                           <Disclosure.Button>
                              Памятка студента
                           </Disclosure.Button>
                           <Disclosure.Panel>
                              {data.notes.map(
                                 (el: { title: string; slug: string }) => {
                                    return (
                                       <MyLink href={"/notes/" + el.slug}>
                                          {el.title}
                                       </MyLink>
                                    );
                                 }
                              )}
                           </Disclosure.Panel>
                        </div>
                     </Disclosure>
                  </div>
               </Disclosure.Panel>
            </>
         )}
      </Disclosure>
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
