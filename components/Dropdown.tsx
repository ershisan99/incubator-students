import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { IconContext } from "react-icons";
import { RiArrowDropDownLine } from "react-icons/ri";

type DropdownPropsType = {
   category: string;
   buttonText: string;
   menuItems: DropdownItemsType;
};

type DropdownItemsType = Array<{ title: string; slug: string }>;
export function MyLink(props: { [x: string]: any; href: any; children: any }) {
   let { href, children, ...rest } = props;
   return (
      <Link href={href}>
         <a {...rest}>{children}</a>
      </Link>
   );
}

export function Dropdown(props: DropdownPropsType) {
   return (
      <Menu as="div" className="relative inline-block text-left">
         <div>
            <Menu.Button className="inline-flex justify-center w-full py-2 text-sm font-medium">
               {props.buttonText}
               <IconContext.Provider value={{ size: "2rem" }}>
                  <RiArrowDropDownLine className="w-5 h-5  -mr-1" />
               </IconContext.Provider>
            </Menu.Button>
         </div>
         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <div className="px-1 py-1">
                  {props.menuItems.map((item) => (
                     <Menu.Item>
                        {({ active }) => (
                           <MyLink
                              className={`${
                                 active && "dark:bg-slate-700 bg-gray-100"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm no-underline`}
                              href={"/" + props.category + "/" + item.slug}
                           >
                              {item.title}
                           </MyLink>
                        )}
                     </Menu.Item>
                  ))}
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
}
