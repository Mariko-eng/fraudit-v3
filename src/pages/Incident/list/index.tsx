import { useQuery, useQueryClient } from "@tanstack/react-query";
import IncidentService from "../../../services/incident.service";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { IncidentListModel, IncidentModel } from "../../../models/incident";
import { useEffect, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TbArrowsSort } from "react-icons/tb";
import { INCIDENTCOLUMNS } from "../columns";
import IncidentTableHeader from "../header";
import { useParams } from "react-router-dom";

function IncidentList() {
  const params = useParams();

  const { status } = params;

  const state = useAppSelector((store) => store.auth);

  const [tableData, setTableData] = useState<IncidentModel[]>([]);

  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const incidentsQuery = useQuery({
    queryKey: ["incidents", currentPage, status], // Include searchParams in the queryKey
    initialData: {},
    queryFn: async () => {
      if (status) {
        return await IncidentService.getIncidents(
          {
            page: currentPage,
            status: status,
          },
          {
            Authorization: `Bearer ${state.tokens?.access}`,
          }
        );
      } else {
        return await IncidentService.getIncidents(
          {
            page: currentPage,
          },
          {
            Authorization: `Bearer ${state.tokens?.access}`,
          }
        );
      }
    },
  });

  const incidentsSearchQuery = useQuery({
    queryKey: ["incidentSearch", searchParams, currentPage, status], // Include searchParams in the queryKey
    initialData: {},
    queryFn: async () => {
      if (status) {
        return await IncidentService.getIncidents(
          {
            search: searchParams,
            status: status,
            page: currentPage,
            // page_size: currentPageSize,
          },
          {
            Authorization: `Bearer ${state.tokens?.access}`,
          }
        );
      } else {
        return await IncidentService.getIncidents(
          {
            search: searchParams,
            page: currentPage,
            // page_size: currentPageSize,
          },
          {
            Authorization: `Bearer ${state.tokens?.access}`,
          }
        );
      }
    },
    enabled: searchParams.trim() !== "",
  });

  useEffect(() => {
    if (searchParams.trim() === "") {
      const incidentData: IncidentListModel =
        incidentsQuery.data as IncidentListModel;

      setTableData(incidentData.results);
    } else {
      const incidentData: IncidentListModel =
        incidentsSearchQuery.data as IncidentListModel;

      setTableData(incidentData.results);
    }
  }, [
    searchParams,
    incidentsQuery.data,
    incidentsSearchQuery.data,
    setTableData,
  ]);

  const [columns, data] = useMemo(() => {
    if (tableData !== undefined) {
      return [INCIDENTCOLUMNS, tableData];
    }
    return [INCIDENTCOLUMNS, []];
  }, [tableData]);

  // console.log(incidentsQuery.data)

  const handleSearch = (value: string) => {
    setSearchParams(value);
  };

  const handleFilter = useCallback(() => {
    queryClient.refetchQueries({
      queryKey: ["incidentSearch", searchParams, currentPage, status],
    });
  }, [queryClient, searchParams, currentPage, status]);

  useEffect(() => {
    if (searchParams.trim() !== "") {
      handleFilter();
    }
  }, [searchParams, currentPage, handleFilter]);

  const tableInstance = useReactTable({
    columns,
    data: data || [],
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const headerGroups = tableInstance.getHeaderGroups();

  const rowModel = tableInstance.getRowModel();

  // Use useEffect to trigger a manual refetch when needed
  useEffect(() => {
    // Manually trigger a refetch when the component mounts or when specific dependencies change
    queryClient.refetchQueries({
      queryKey: ["incidents", currentPage, status],
    });
  }, [queryClient, currentPage, status]); // Specify dependencies as needed

  return (
    <div>
      <div className="mb-4 col-span-full xl:mb-2">
        <nav className="flex mb-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5 mr-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a
                  href="#"
                  className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                >
                  Incidents
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span
                  className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                  aria-current="page"
                >
                  List
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div>
        {incidentsQuery.data ? (
          <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-2">
            <IncidentTableHeader
              totalNo={
                incidentsQuery.data.count ? incidentsQuery.data.count : 0
              }
              searchParams={searchParams}
              handleSearch={handleSearch}
            />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  {headerGroups.map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((headerItem) => (
                        <th
                          colSpan={headerItem.colSpan}
                          key={headerItem.id}
                          className="w-5 p-4"
                        >
                          <div className="flex items-start justify-center">
                            {flexRender(
                              headerItem.column.columnDef.header,
                              headerItem.getContext()
                            )}
                            {headerItem.column.getCanSort() && (
                              <TbArrowsSort
                                className="ml-1"
                                onClick={() => {
                                  headerItem.column.toggleSorting();
                                }}
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
                    <tr
                      key={row.id}
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="w-5 p-4 items-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></tfoot>
              </table>
            </div>

            <br />
            <div>
              <p>
                Page{" "}
                <span>
                  {currentPage} of {""} {incidentsQuery.data.total}
                </span>
              </p>
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => {
                          if (prev > 1) {
                            return prev - 1;
                          } else {
                            return 1;
                          }
                        });
                      }}
                      disabled={incidentsQuery.data.previous === null}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(incidentsQuery.data.total).keys()].map((index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setCurrentPage(index + 1);
                        }}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => prev + 1);
                      }}
                      disabled={incidentsQuery.data.next === null}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        ) : (
          <p>Loading....</p>
        )}

        {/* <BasicTable /> */}
      </div>
    </div>
  );
}

export default IncidentList;
