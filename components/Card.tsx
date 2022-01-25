import { RichTextContent } from "@graphcms/rich-text-types";
import React from "react";
import RichTextItem from "./RichTextItem";

const Card = ({ content }: { content: RichTextContent }) => {
   return (
      <div
         className="container flex flex-col prose prose-slate max-w-6xl w-11/12 lg:w-4/5 mx-auto px-6 py-4 
 bg-white  rounded-lg shadow-xl align-middle justify-center my-3 dark:bg-slate-800  dark:prose-invert"
      >
         <RichTextItem content={content} />
      </div>
   );
};

export default Card;
