import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { IconContext } from "react-icons";
import { RiArrowDropDownLine } from "react-icons/ri";

type DropdownPropsType = {
   buttonText: string;
   menuItems: DropdownItemsType;
};

type DropdownItemsType = Array<string>;
function MyLink(props: { [x: string]: any; href: any; children: any }) {
   let { href, children, ...rest } = props;
   return (
      <Link href={href}>
         <a {...rest}>{children}</a>
      </Link>
   );
}

export function Dropdown(props: DropdownPropsType) {
   return (
      <Menu>
         <Menu.Button className="text-centre inline-flex font-semibold cursor-pointer items-center justify-items-center">
            {props.buttonText}
            <IconContext.Provider value={{ size: "2rem" }}>
               <RiArrowDropDownLine />
            </IconContext.Provider>
         </Menu.Button>
         <Menu.Items>
            {props.menuItems.map((item) => (
               <Menu.Item>
                  {({ active }) => (
                     <MyLink
                        className={`${active && "bg-blue-500"}`}
                        href="/account-settings"
                     >
                        {item}
                     </MyLink>
                  )}
               </Menu.Item>
            ))}
         </Menu.Items>
      </Menu>
   );
}
