import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "../columns";
import MOCK_DATA from "./../mock_data.json";
import { useQuery } from "@tanstack/react-query";

const getData = async () => {
  try {
    // Introduce a 2-second delay using setTimeout
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return MOCK_DATA;

  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error fetching data:", error.message);
    throw error; // Rethrow the error for the caller to handle if needed
  }
};

const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

//   const data = useMemo(() => MOCK_DATA, []);

  const dataQuery = useQuery({
    queryKey: ["data"],
    queryFn: getData
  })

  const data = dataQuery.data;

  const tableInstance = useTable(
    {
      columns: columns,
      data: data ? data : [],
      initialState: {
        pageIndex: 5,
      },
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
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
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      </table>

      <div className="flex justify-between">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}{" "}
          </strong>
        </span>
        <div>
          <span>
            Go to Page{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px", height: "25px", borderRadius: "10px" }}
            />
          </span>
          <select
            className="mx-1"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
          <button className="mx-1" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {" << "}
          </button>
          <button className="mx-1" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Prev
          </button>
          <button className="mx-1" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <button className="mx-1"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {" >> "}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginationTable;
