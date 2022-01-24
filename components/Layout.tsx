import React, { Children } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
   return (
      <div className="h-100">
         <Header />
         {children}
         <Footer />
      </div>
   );
};

export default Layout;
