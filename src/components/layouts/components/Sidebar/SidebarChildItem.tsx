import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { toggleSidebar } from "../../../../redux/slices/sidebar";

const SidebarChildItem = ({linkString, itemName} : {linkString :string; itemName: string}) => {

  const dispatch = useAppDispatch();

  return (
    <li>
      <Link
        to={linkString}
        onClick={() => dispatch(toggleSidebar(false))}
        className="flex items-center p-1 text-sm text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        {itemName}
      </Link>
    </li>
  );
};

export default SidebarChildItem;
