import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IconContext } from "react-icons";
import { RiArrowDropDownLine } from "react-icons/ri";
const Header = () => {
   const categories = [
      { name: "Homeworks", slug: "homeworks" },
      { name: "ToDoList", slug: "todolist" },
      { name: "Notes", slug: "notes" },
   ];
   const { theme, setTheme } = useTheme();
   const [enabled, setEnabled] = useState(false);
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   return (
      <nav className=" container flex mx-auto justify-center flex-nowrap px-10 mb-8">
         <div className=" flex container border-b w-full flex-nowrap align-middle justify-start dark:border-white border-slate-900 py-6">
            <Link href="/">
               <div className=" flex flex-auto flex-nowrap cursor-pointer self-start font-bold text-4xl ">
                  it-incubator.by
               </div>
            </Link>
            <div className=" md:flex hidden flex-auto items-center justify-end">
               <div className="flex justify-end items-center">
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
                  {categories.map((category) => (
                     <span>
                        <Link key={category.slug} href={`/${category.slug}`}>
                           <button className="text-centre  inline-flex font-semibold cursor-pointer items-center justify-items-center">
                              {category.name}
                              <IconContext.Provider value={{ size: "2rem" }}>
                                 <RiArrowDropDownLine />
                              </IconContext.Provider>
                           </button>
                        </Link>
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Header;
