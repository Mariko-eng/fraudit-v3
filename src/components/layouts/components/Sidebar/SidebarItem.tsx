import { useState, ReactNode } from "react";
import { TbChevronDown } from "react-icons/tb";

interface SidebarItemProps {
  children: ReactNode;
  icon: ReactNode;
  itemName: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  icon,
  itemName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => toggleItem()}
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        // aria-controls="dropdown-pages"
        // data-collapse-toggle="dropdown-pages"
      >
        <div className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
          {icon}
        </div>
        <span
          className="flex-1 ml-3 text-left whitespace-nowrap"
          sidebar-toggle-item="true"
        >
          {itemName}
        </span>
        <TbChevronDown />
      </button>
      <ul
        // id="dropdown-pages"
        className={`${!isOpen && "hidden"} py-2 space-y-2`}
      >
        {children}
      </ul>
    </>
  );
};

export default SidebarItem;
