import React, { useEffect } from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-night-owl.css";
import "prismjs/plugins/show-language/prism-show-language";

type MyRichTextPropTypes = {
   content: RichTextContent;
};

const RichTextItem = (props: MyRichTextPropTypes) => {
   useEffect(() => {
      Prism.highlightAll();
   }, []);
   return (
      <RichText
         content={props.content}
         renderers={{
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h2>{children}</h2>,
            p: ({ children }) => <p>{children}</p>,
            bold: ({ children }) => <b>{children}</b>,
            li: ({ children }) => <li>{children} </li>,
            img: (props) => (
               <div>
                  <img src={props.src} alt={props.altText} />
               </div>
            ),
            code_block: ({ children }) => (
               <pre className=" language-tsx">
                  <code>{children}</code>
               </pre>
            ),
            code: ({ children }) => (
               <span className=" not-prose">
                  <code className="language-tsx">{children}</code>
               </span>
            ),
         }}
      />
   );
};

export default RichTextItem;
