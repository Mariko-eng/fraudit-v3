import { useCallback, useEffect, useMemo, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import MOCK_DATA from "./../../../constants/sample_data/mock_data.json";
import { COLUMNS } from "./columns";
import TableHeader from "./TableHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getData = async (search: string) => {
  try {
    // console.log("search");
    // console.log(search);
    // Introduce a 2-second delay using setTimeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (search === "") {
      const data = MOCK_DATA;
      return data;
    } else {
      const data = MOCK_DATA.filter((item) =>
        item.first_name.toLowerCase().includes(search)
      );
      return data;
    }

    // return MOCK_DATA;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error fetching data:", error.message);
    throw error; // Rethrow the error for the caller to handle if needed
  }
};

const BasicTable = () => {

  const columns = useMemo(() => COLUMNS, []);

  const [searchParams, setSearchParams] = useState<string>("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 20,
  });

  const queryClient = useQueryClient();

  const dataQuery = useQuery({
    queryKey: ["data", searchParams], // Include searchParams in the queryKey
    initialData: [],
    queryFn: () => getData(searchParams),
    // queryFn: getData,
  });

  const tableInstance = useReactTable({
    columns,
    data: dataQuery.data,
    state: {
      pagination: pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: async () => {
        console.log("Loading Started ...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Loading Finished ....");
        queryClient.invalidateQueries({ queryKey: ["data"] });
      },
      updateCellData: (rowIndex: number, columnId: string, value: string) => {
        console.log(rowIndex);
        console.log(columnId);
        console.log(value);
        // setData(
        //   prev => prev.map((row, index) =>
        //   index === rowIndex ? {
        //     ...prev[rowIndex],
        //     [columId] : value
        //   } : row
        //   )
        // )
      },
    },
  });

  const headerGroups = tableInstance.getHeaderGroups();

  const rowModel = tableInstance.getRowModel();

  const handleSearch = (value: string) => {
    setSearchParams(value);
  };

  const handleFilter = useCallback(() => {
    queryClient.refetchQueries({ queryKey: ["data", searchParams] });
  }, [queryClient, searchParams]);

  // const handleFilter = () => {
  //   queryClient.refetchQueries({ queryKey: ["data", searchParams] });
  // }

  useEffect(() => {
    if (searchParams.trim() !== "") {
      handleFilter();
    }
  }, [searchParams, handleFilter]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-2">
      <TableHeader searchParams={searchParams} handleSearch={handleSearch} />

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b dark:border-gray-700">
              {headerGroup.headers.map((headerItem) => (
                <th
                  colSpan={headerItem.colSpan}
                  key={headerItem.id}
                  className="px-3 py-3"
                >
                  <div className="flex items-center justify-center">
                    {flexRender(
                      headerItem.column.columnDef.header,
                      headerItem.getContext()
                    )}
                    {headerItem.column.getCanSort() && (
                      <TbArrowsSort
                        className="ml-1"
                        onClick={
                          () => {
                            headerItem.column.toggleSorting()
                        }
                        }
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rowModel.rows.map((row) => (
            <tr key={row.id} className="border-b dark:border-gray-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></tfoot>
      </table>

      <br />
      <div>
        <p>
          Page{" "}
          <span>
            {tableInstance.getState().pagination.pageIndex + 1} of {""}{" "}
            {tableInstance.getPageCount()}
          </span>
        </p>
        <div className="flex">
          <select
            style={{ width: "110px", height: "30px" }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={pagination.pageSize}
            onChange={(e) => {
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }));
            }}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>

          <button
            className="mx-2"
            onClick={() => {
              const px = tableInstance.getState().pagination.pageIndex;
              setPagination((prev) => ({
                ...prev,
                pageIndex: px - 1,
              }));

              tableInstance.previousPage();
            }}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="mx-2"
            onClick={() => {
              const px = tableInstance.getState().pagination.pageIndex;
              setPagination((prev) => ({
                ...prev,
                pageIndex: px + 1,
              }));
              tableInstance.nextPage();
            }}
            disabled={!tableInstance.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
