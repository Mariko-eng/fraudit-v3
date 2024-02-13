import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { SfiActionsButton }  from "./actions";
import { SfiModel } from "../../../models/sfi";

const columnHelper = createColumnHelper<SfiModel>();

export const SFICOLUMNS = [
  // Display Column
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

  columnHelper.accessor((row) => `${row.unique_number}`, {
    id: "unique_number",
    header: "SFI No",
    footer: () => "SFI No",
  }),


  columnHelper.accessor("created_at", {
    header: "Date Created",
    cell: (props) => {
      const today = new Date(props.getValue());
      const formattedDate1 = format(today, "do MMMM YYYY");
      return formattedDate1;
    },
    footer: () => "Date Created",
  }),

  // Display Column
  columnHelper.display({
    id: "actions",
    header: "Actions",
    footer: "Actions",
    cell: (props) => <SfiActionsButton props={props} openSfiUpdate={() => {}} openSfiDelete={() => {}} />,
  }),
];
