import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { IncidentModel } from "../../models/incident";
import ActionsButton from "./actions";
import { Link } from "react-router-dom";

const incidentColumnHelper = createColumnHelper<IncidentModel>();

export const INCIDENTCOLUMNS = [
  // Display Column
  incidentColumnHelper.display({
    id: "select",
    header: (props) => (
      <input
        type="checkbox"
        checked={props.table.getIsAllRowsSelected()}
        onChange={props.table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: (props) => (
      <input
        type="checkbox"
        checked={props.row.getIsSelected()}
        disabled={!props.row.getCanSelect()}
        onChange={props.row.getToggleSelectedHandler()}
      />
    ),
  }),

  incidentColumnHelper.accessor("id", {
    id: "id",
    header: "ID",
    footer: () => "ID",
    cell: (props) => (
      <Link className="text-blue-500"  to={`/home/incidents/${props.row.original.id}`}>
        {props.row.original.id.substring(0, 5)}
      </Link>
    ),
  }),

  incidentColumnHelper.accessor((row) => `${row.sfi?.unique_number}`, {
    id: "Sfi",
    header: "SFI",
    footer: () => "SFI",
  }),

  incidentColumnHelper.accessor("status", {
    id: "status",
    header: () => "Status",
    footer: () => "Status",
    enableSorting: false,
    cell: (props) => (
      <div className="px-1 py-1">
        {props.getValue() == "BLACK" ? (
          <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md font-medium bg-gray-100 text-sm text-red-500 dark:bg-gray-900 dark:text-gray-200">
            {props.getValue() ?? "Not Available"}
          </span>
        ) : props.getValue() == "GREY" ? (
          <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-200">
            {props.getValue() ?? "Not Available"}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-blue-500 dark:bg-gray-900 dark:text-gray-200">
            {props.getValue() ?? "Not Available"}
          </span>
        )}
      </div>
    ),
  }),

  incidentColumnHelper.accessor("classification", {
    header: () => "Classification",
    cell: (props) => props.getValue(),
    footer: () => "Classification",
  }),

  incidentColumnHelper.accessor("category_name", {
    header: () => "Category",
    cell: (props) => props.getValue(),
    footer: () => "Category",
  }),

  incidentColumnHelper.accessor("sub_category_name", {
    header: () => "Sub Category",
    cell: (props) => props.getValue(),
    footer: () => "Sub Category",
  }),

  incidentColumnHelper.accessor("actual_amount", {
    header: () => "Amount",
    cell: (props) => formatNumber(props.getValue()),
    footer: () => "Amount",
  }),

  incidentColumnHelper.accessor("actual_date", {
    header: "Occurence Date",
    cell: (props) => {
      const today = new Date(props.getValue());
      const formattedDate1 = format(today, "dd MMMM YYYY");
      return formattedDate1;
    },
    footer: () => "Occurence Date",
  }),

  // Display Column
  incidentColumnHelper.display({
    id: "actions",
    header: "Actions",
    footer: "Actions",
    cell: (props) => <ActionsButton row={props.row} />,
  }),
];

// const ActionButton = ({row}) => {

//   return (
//     <>
//       <button
//         id={`${row.original.id}-button`}
//         data-dropdown-toggle={row.original.id}
//         className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
//         type="button"
//       >
//         <svg
//           className="w-5 h-5"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
//         </svg>
//       </button>
//       <div
//         id={row.original.id}
//         className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
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
//     </>
//   );
// };

function formatNumber(number: number) {
  // Remove decimal point
  const integerPart = Math.floor(number);

  // Format with commas
  const formattedNumber = integerPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedNumber;
}
