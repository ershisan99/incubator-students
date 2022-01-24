import React from "react";
import Card from "./Card";

const Title: React.FC = ({ children }) => {
   return (
      <div
         className="container flex flex-col prose prose-slate max-w-6xl w-100
 w-11/12 lg:w-4/5 mx-auto px-6 py-4 
 bg-white rounded-lg shadow-xl align-middle justify-center my-3 w-100 dark:bg-slate-800  dark:prose-invert"
      >
         <h1 className=" text-xl sm:text-2xl text-center">{children}</h1>
      </div>
   );
};

export default Title;
