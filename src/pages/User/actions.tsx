import { CellContext } from "@tanstack/react-table";
// import { useState } from 'react';
// import { TbBrandMixpanel } from "react-icons/tb";
import { Link } from "react-router-dom";
import { UserModel } from "../../models/user";

const UserActionsButton = ({
  props,
}: {
  props: CellContext<UserModel, unknown>;
}) => {
  return (
    <div className="flex">
      <div className="mx-1">
        <Link
          to={`/home/users/detail/${props.row.original.id}`}
          className="text-blue-500 text-sm"
        >
          View
        </Link>
      </div>
      {props.row.original.is_superuser ? (
        <div className="mx-1">
          <Link
            to={`/home/users/${props.row.original.id}/edit/root`}
            className="text-yellow-500 text-sm"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div className="mx-1">
          <Link
            to={`/home/users/${props.row.original.id}/edit`}
            className="text-yellow-500 text-sm"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserActionsButton;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const UserActionsButton1 = ({ row } : { row: any }) => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   return (
//     <>
//     <div className='relative'>
//       <button
//         id={`${row.original.id}-button`}
//         data-dropdown-toggle={row.original.id}
//         onClick={() => toggleDropdown()}
//         className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
//         type="button"
//       >
//         <TbBrandMixpanel className="w-5 h-5" />
//       </button>
//       <div
//         id={row.original.id}
//         className={`${isDropdownVisible ? "block" : "hidden"} absolute right-0 z-10 w-44 rounded bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
//       >
//         <ul
//           className="py-1 text-sm text-gray-700 dark:text-gray-200"
//           aria-labelledby={`${row.original.id}-button`}
//         >
//           <li>
//             <a
//               href="#"
//               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               Show
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               Edit
//             </a>
//           </li>
//         </ul>
//         <div className="py-1">
//           <a
//             href="#"
//             className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//           >
//             Delete
//           </a>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export const UserActionsButton1;
