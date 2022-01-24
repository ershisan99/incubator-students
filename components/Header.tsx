import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IconContext } from "react-icons";
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
      <div className="container mx-auto px-10 mb-8">
         <div className="border-b w-full inline-block dark:border-white border-slate-900 py-8">
            <div className="md:float-left block">
               <Link href="/">
                  <span className="cursor-pointer font-bold text-4xl ">
                     it-incubator.by
                  </span>
               </Link>
            </div>
            <div className="hidden md:float-right md:contents">
               {categories.map((category) => (
                  <Link key={category.slug} href={`/${category.slug}`}>
                     <span className="md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer">
                        {category.name}
                     </span>
                  </Link>
               ))}
            </div>
            <div className="hover:cursor-pointer float-right mt-2 mr-4">
               <IconContext.Provider
                  value={{
                     size: "1.5rem",
                     style: { verticalAlign: "middle" },
                  }}
               >
                  <div>
                     {theme === "dark" ? (
                        <MdOutlineLightMode onClick={() => setTheme("light")} />
                     ) : (
                        <MdOutlineDarkMode onClick={() => setTheme("dark")} />
                     )}
                  </div>
               </IconContext.Provider>
            </div>
         </div>
      </div>
   );
};

export default Header;
