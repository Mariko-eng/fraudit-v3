import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { IncidentSuspectModel } from "../../../models/suspect";

const columnHelper = createColumnHelper<IncidentSuspectModel>();

export const COLUMNS = [

    columnHelper.accessor("incident", {
    id: "incident",
    header: "Incident",
    footer: () => "Incident",
    cell: (props) => (
      <div className="text-blue-500">
        {props.row.original.id.substring(0, 5)}
      </div>
    ),
  }),

    columnHelper.accessor("individual_id_type", {
    id: "individual_id_type",
    header: () => "ID Type",
    footer: () => "ID Type",
    cell: (props) => props.getValue()
  }),

    columnHelper.accessor("individual_id_details", {
    id: "individual_id_details",
    header: () => "ID NO",
    footer: () => "ID NO",
    cell: (props) => props.getValue()
  }),

  columnHelper.accessor("individual_name", {
    id: "individual_name",
    header: () => "Name",
    footer: () => "Status",
    cell: (props) => props.getValue()
  }),

  columnHelper.accessor("individual_email", {
    id: "individual_email",
    header: () => "Email",
    footer: () => "Email",
    cell: (props) => props.getValue(),
  }),

  columnHelper.accessor("individual_phone", {
    id: "individual_phone",
    header: () => "Tel",
    footer: () => "Tel",
    cell: (props) => props.getValue(),
  }),


  columnHelper.accessor("created_at", {
    id: "created_at",
    header: "Reported Date",
    cell: (props) => {
      const today = new Date(props.getValue());
      const formattedDate1 = format(today, "do MMMM YYYY");
      return formattedDate1;
    },
    footer: () => "Reported Date",
  }),
];

