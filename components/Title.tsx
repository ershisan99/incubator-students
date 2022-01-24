import React from "react";

const Title: React.FC = ({ children }) => {
   return (
      <h1 className="text-2xl text-center dark:text-white font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
         {children}
      </h1>
   );
};

export default Title;
