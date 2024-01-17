import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import MOCK_DATA from "./../mock_data.json";
import { COLUMNS } from "../columns";

const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => MOCK_DATA, []);

  const tableInstancee = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstancee;

  return (
    <table
      {...getTableProps()}
      className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {...headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope="col"
                className="px-4 py-3"
              >
                {column.render("Header")}
                {column.isSorted ? column.isSortedDesc ? '<' : " >" : "^"}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="border-b dark:border-gray-700"
            >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="px-4 py-3">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {...footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                scope="col"
                className="px-4 py-3"
              >
                {column.render("Footer")}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default SortingTable;
