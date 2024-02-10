import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { TransferModel } from "../../../models/transfer";
import { IncidentModel } from "../../../models/incident";
import ActionsButton from "./actions";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper<TransferModel>();

export const TRANSFERCOLUMNS = [
  // Display Column
  columnHelper.display({
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

  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
    footer: () => "ID",
    cell: (props) => (
      <div className="text-green-500">
        {props.row.original.id.substring(0, 5)}
      </div>
    ),
  }),

  columnHelper.accessor("incident", {
    id: "incident",
    header: "Incident",
    footer: () => "Incident",
    cell: (props) =>
      props.getValue() === undefined ? (
        <div>Nan</div>
      ) : typeof props.getValue() === "string" ? (
        <Link
          className="text-blue-500"
          to={`/home/incidents/${props.getValue() as string}`}
        >
          {(props.getValue() as string).substring(0, 5)}
        </Link>
      ) : (
        <Link
          className="text-blue-500"
          to={`/home/incidents/${
            (props.row.original.incident as IncidentModel).id
          }`}
        >
          {(props.row.original.incident as IncidentModel).id.substring(0, 5)}
        </Link>
      ),
  }),

  columnHelper.accessor("incident", {
    id: "incident-sfi",
    header: "SFI",
    footer: () => "SFI",
    cell: (props) =>
      props.getValue() === undefined ? (
        <div>Nan</div>
      ) : typeof props.getValue() === "string" ? (
        <div>SFI</div>
      ) : (
        <div>
          {(props.row.original.incident as IncidentModel).sfi?.unique_number}
        </div>
      ),
  }),

  columnHelper.accessor("status", {
    id: "status",
    header: () => "Status",
    footer: () => "Status",
    enableSorting: false,
    cell: (props) => (
      <div className="px-1 py-1">
        {props.getValue() == "PENDING" ? (
          <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md font-medium bg-gray-100 text-sm text-red-500 dark:bg-gray-900 dark:text-gray-200">
            {props.getValue() ?? "Not Available"}
          </span>
        ) : props.getValue() == "APPROVED" ? (
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

  columnHelper.accessor("created_at", {
    header: "Request Date",
    cell: (props) => {
      const today = new Date(props.getValue());
      const formattedDate1 = format(today, "dd MMMM YYYY");
      return formattedDate1;
    },
    footer: () => "Request Date",
  }),

  // Display Column
  columnHelper.display({
    id: "actions",
    header: "Actions",
    footer: "Actions",
    cell: (props) => <ActionsButton row={props.row} />,
  }),
];
