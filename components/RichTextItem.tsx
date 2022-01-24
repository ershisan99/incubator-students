import React, { useEffect } from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/show-language/prism-show-language";

type MyRichTextPropTypes = {
   content: RichTextContent;
};

const RichTextItem = (props: MyRichTextPropTypes) => {
   useEffect(() => {
      Prism.highlightAll();
   }, []);
   return (
      <div className="container w-100 lg:w-4/5 mx-auto flex flex-col max-w-6xl">
         <div className="p-4 flex flex-col dark:bg-slate-800 bg-white rounded-lg shadow-xl align-middle justify-center mt-4 w-100  mx-2">
            <RichText
               content={props.content}
               renderers={{
                  h1: ({ children }) => <h1>{children}</h1>,
                  h2: ({ children }) => <h2>{children}</h2>,
                  p: ({ children }) => <p>{children}</p>,
                  bold: ({ children }) => <b>{children}</b>,
                  li: ({ children }) => <li>{children} </li>,
                  img: (props) => (
                     <img
                        className="place-self-center"
                        src={props.src}
                        alt={props.altText}
                        style={{ maxWidth: "800px" }}
                     />
                  ),
                  code_block: ({ children }) => (
                     <pre className="language-tsx">
                        <code>{children}</code>
                     </pre>
                  ),
                  code: ({ children }) => (
                     <code className="language-tsx">{children}</code>
                  ),
               }}
            />
         </div>
      </div>
   );
};

export default RichTextItem;
