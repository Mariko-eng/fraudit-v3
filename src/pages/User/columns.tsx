import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { UserModel } from "../../models/user";
import ActionsButton from "./actions";

const userColumnHelper = createColumnHelper<UserModel>();

export const USERCOLUMNS = [
  // Display Column
  // userColumnHelper.display({
  //   id: "select",
  //   header: (props) => (
  //     <input
  //       type="checkbox"
  //       checked={props.table.getIsAllRowsSelected()}
  //       onChange={props.table.getToggleAllRowsSelectedHandler()}
  //     />
  //   ),
  //   cell: (props) => (
  //     <input
  //       type="checkbox"
  //       checked={props.row.getIsSelected()}
  //       disabled={!props.row.getCanSelect()}
  //       onChange={props.row.getToggleSelectedHandler()}
  //     />
  //   ),
  // }),

  userColumnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
    id: "Name/s",
    header: "Name/s",
    footer: () => "Name/s",
  }),

  userColumnHelper.accessor((row) => `${row.email}`, {
    id: "email",
    header: "Email",
    footer: () => "Email",
  }),

  userColumnHelper.accessor((row) => `${row.phone_number}`, {
    id: "Phone",
    header: "Phone No",
    footer: () => "Phone No",
  }),

  userColumnHelper.accessor("user_category", {
    id: "user_category",
    header: () => "USER ROLE",
    footer: () => "USER ROLE",
    enableSorting: false,
    cell: (props) => (
      <div className="px-1 py-1">
        {props.row.original.is_superuser ? (
          <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {props.row.original.user_category ?? "N/A"}
          </span>
        ) : props.row.original.is_staff ? (
          <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            {props.row.original.user_category ?? "N/A"}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {props.row.original.user_category ?? "N/A"}
          </span>
        )}
      </div>
    ),
  }),

  userColumnHelper.accessor("is_active", {
    id: "is_active",
    header: () => "STATUS",
    footer: () => "STATUS",
    enableSorting: false,
    cell: (props) => {
      return props.row.original.is_active ? (
        <div className="flex items-center justify-center">
          <span
            className="bg-green-500 m-1"
            style={{ width: "10px", height: "10px" }}
          ></span>
          <div> Active </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span
            className="bg-red-500 m-1"
            style={{ width: "10px", height: "10px" }}
          ></span>
          <div> Inactive </div>
        </div>
      );
    },
  }),

  userColumnHelper.accessor("last_login", {
    header: "Last Login",
    cell: (props) => {
      const today = new Date(props.getValue());
      const formattedDate1 = format(today, "do MMMM YYYY");
      return formattedDate1;
    },
    footer: () => "Last Login",
  }),

  userColumnHelper.accessor("created_at", {
    header: "Date Joined",
    cell: (props) => {
      const today = new Date(props.getValue());
      const formattedDate1 = format(today, "do MMMM YYYY");
      return formattedDate1;
    },
    footer: () => "Date Joined",
  }),

  // Display Column
  userColumnHelper.display({
    id: "actions",
    header: "Actions",
    footer: "Actions",
    cell: (props) => <ActionsButton props={props} />,
  }),
];
