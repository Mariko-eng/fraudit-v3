import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { IncidentModel } from "../../../models/incident";

const incidentColumnHelper = createColumnHelper<IncidentModel>();

export const COLUMNS = [

  incidentColumnHelper.accessor("id", {
    id: "id",
    header: "ID",
    footer: () => "ID",
    cell: (props) => (
        <div>
        {props.row.original.id.substring(0, 5)}
        </div>
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

  incidentColumnHelper.accessor("currency", {
    header: () => "currency",
    cell: (props) => props.getValue(),
    footer: () => "Currency",
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
      const formattedDate1 = format(today, "do MMMM YYYY");
      return formattedDate1;
    },
    footer: () => "Occurence Date",
  }),
];


function formatNumber(number: number) {
  // Remove decimal point
  const integerPart = Math.floor(number);

  // Format with commas
  const formattedNumber = integerPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedNumber;
}
