import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import EditableCell from "./EditableCell";

type Person = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  date_of_birth: string;
};

const columnHelper = createColumnHelper<Person>();

export const COLUMNS = [
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

  columnHelper.accessor("first_name", {
    id: "fname",
    header: () => "F Name",
    enableSorting:false,
    cell: (props) => <EditableCell props={props}/>,
  }),

  columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
    id: "fullName",
    header: "Full Name",
  }),

  columnHelper.accessor("first_name", {
    header: () => "First Name",
    cell: (props) => props.getValue(),
    footer: (props) => props.column.id,
  }),

  columnHelper.accessor("last_name", {
    header: () => "Last Name",
    cell: (props) => props.getValue(),
    footer: (props) => props.column.id,
  }),

  columnHelper.accessor("date_of_birth", {
    header: "DOB",
    cell: (props) => {
      const today = new Date(props.getValue());
      const formattedDate1 = format(today, "dd MMMM YYYY");
      return formattedDate1;
    },
    footer: (props) => props.column.id,
  }),

 // Display Column
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => <div>Actions</div>,
    // cell: props => <RowActions row={props.row} />,
  }),
];

