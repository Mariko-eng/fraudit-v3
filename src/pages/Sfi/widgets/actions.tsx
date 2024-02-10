import { useState } from "react";
import { TbBrandMixpanel } from "react-icons/tb";
import { SfiModel } from "../../../models/sfi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const ActionsButton = ({
  row,
  openSfiUpdate,
  openSfiDelete,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
  openSfiUpdate: ({prevData} :{ prevData: SfiModel}) => void;
  openSfiDelete: ({prevData} :{ prevData: SfiModel}) => void;
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className="relative">
        <button
          id={`${row.original.id}-button`}
          data-dropdown-toggle={row.original.id}
          onClick={() => toggleDropdown()}
          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
        >
          <TbBrandMixpanel className="w-5 h-5" />
        </button>
        <div
          id={row.original.id}
          className={`${
            isDropdownVisible ? "block" : "hidden"
          } absolute right-0 z-10 w-44 rounded bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby={`${row.original.id}-button`}
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                View
              </a>
            </li>
            <li>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    openSfiUpdate({ prevData: row.original as SfiModel });
                    toggleDropdown();
                  }}
                  className="block py-2 px-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </button>
              </div>
            </li>
          </ul>
          <div className="py-1">
            <div className="flex justify-center">
              <button
                onClick={() => {
                  openSfiDelete({ prevData: row.original as SfiModel });
                  toggleDropdown();
                }}
                className="block py-2 px-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionsButton;
