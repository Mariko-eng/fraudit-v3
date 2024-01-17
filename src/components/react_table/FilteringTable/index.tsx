import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from "./../mock_data.json";
import { COLUMNS } from "../columns";
import GlobalFilter from "../GlobalFilter";
import ColumnFilter from "../ColumnFilter";

const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {
    return {
        Filter: ColumnFilter,
    }
  }, []);

  const tableInstancee = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn: defaultColumn
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstancee;

  const { globalFilter } = state;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {...headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="px-4 py-3"
                  >
                    {column.render("Header")}
                    <div>{ column.canFilter ? column.render('Filter') : null }</div>
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
      </div>
    </>
  );
};

export default FilteringTable;
