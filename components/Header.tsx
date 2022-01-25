import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import client from "../apollo-client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IconContext } from "react-icons";
import { Dropdown } from "./Dropdown";
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
                     </div>
                  </div>
               </div>
               <Disclosure.Panel className="lg:hidden">
                  <div className="mx-auto w-11/12">
                     <Disclosure.Button
                        as="a"
                        href={"/"}
                        className={
                           "no-underline bg-slate-800 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        }
                     >
                        Домашки от Игната
                     </Disclosure.Button>
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

// return (
//    <nav className={""}>
//       <div className=" flex lg:container border-b max-w-6xl w-11/12 lg:w-4/5 mx-auto flex-nowrap align-middle justify-between dark:border-white border-slate-900 py-6 ">
//          <div
//             className="lg:hidden flex items-center"
//             onClick={() => setMenuOpen(!menuOpen)}
//          >
//             <HiMenu className="w-6 h-6" />
//             <div className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto block"></div>
//          </div>

//          <Link href="/">
//             <div className=" flex cursor-pointer font-bold text-4xl lg:px-0 pr-2 ">
//                it-incubator.by
//             </div>
//          </Link>

//          <div
//             className={
//                "lg:flex lg:items-center " +
//                (menuOpen ? "flex flex-col grow overflow-y-auto " : "hidden")
//             }
//          >
//             <div className="flex items-center cursor-pointer">
//                <div className="px-4">
//                   <IconContext.Provider
//                      value={{
//                         size: "1.5rem",
//                         style: { verticalAlign: "middle" },
//                      }}
//                   >
//                      {theme === "dark" ? (
//                         <MdOutlineLightMode
//                            onClick={() => setTheme("light")}
//                         />
//                      ) : (
//                         <MdOutlineDarkMode
//                            onClick={() => setTheme("dark")}
//                         />
//                      )}
//                   </IconContext.Provider>
//                </div>

//                <span className="px-4 ">
//                   <Dropdown
//                      buttonText={"Домашки"}
//                      menuItems={menuItems.homeworks}
//                   />
//                </span>
//                <span className="px-4">
//                   <Dropdown
//                      buttonText={"Домашки от Игната"}
//                      menuItems={menuItems.homeworksByIgnat}
//                   />
//                </span>
//                <span className="px-4">
//                   <Dropdown
//                      buttonText={"To-do List"}
//                      menuItems={menuItems.todolistManuals}
//                   />
//                </span>
//                <span className="px-4">
//                   <Dropdown
//                      buttonText={"Памятка студента"}
//                      menuItems={menuItems.notes}
//                   />
//                </span>
//             </div>
//          </div>
//       </div>
//       {/* {menuOpen && (
//          <div className="">
//             <div className=" flex lg:container border-b max-w-6xl w-11/12 lg:w-4/5 mx-auto flex-nowrap align-middle justify-between dark:border-white border-slate-900 py-6 ">
//                <div className="lg:hidden flex items-center">
//                   <HiMenu className="w-6 h-6" />
//                   <div className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto block"></div>
//                </div>

//                <Link href="/">
//                   <div className=" flex cursor-pointer font-bold text-4xl lg:px-0 pr-2 ">
//                      it-incubator.by
//                   </div>
//                </Link>
//             </div>
//          </div>
//       )} */}
//    </nav>
// );
