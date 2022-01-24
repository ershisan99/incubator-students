import React, { Children, ReactChildren, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export type LayoutPropType = {
   children: ReactNode;
   categories: any;
};

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
