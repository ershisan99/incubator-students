import React from "react";
import { DiGithubBadge } from "react-icons/di";
const Footer = () => {
   return (
      <footer className="flex items-center justify-center w-full h-24 border-t mt-10 not-prose ">
         <a
            className="flex items-center justify-center "
            href="https://github.com/ershisan99"
            target="_blank"
            rel="noopener noreferrer"
         >
            Made by{" "}
            <span className="ml-2">
               <DiGithubBadge />
            </span>
            ershisan99
         </a>
      </footer>
   );
};

export default Footer;
