import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "../../../services/user.service";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useMemo } from "react";
import { TbArrowsSort } from "react-icons/tb";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { USERCOLUMNS } from "../columns";
import UserTableHeader from "../header";
import { UserModel, UserListModel } from "../../../models/user";

function UserList() {
  const state = useAppSelector((store) => store.auth);

  const [usersListData, setUsersListData] = useState<UserListModel | null>(
    null
  );

  const [tableData, setTableData] = useState<UserModel[]>([]);

  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const usersQuery = useQuery({
    queryKey: ["users", currentPage], // Include searchParams in the queryKey
    initialData: {},
    queryFn: async () =>
      await UserService.getUsers(
        {
          page: currentPage,
        },
        {
          Authorization: `Bearer ${state.tokens?.access}`,
        }
      ),
  });

  const userSearchQuery = useQuery({
    queryKey: ["userSearch", searchParams, currentPage], // Include searchParams in the queryKey
    initialData: {},
    queryFn: async () =>
      await UserService.getUsers(
        {
          search: searchParams,
          page: currentPage,
          // page_size: currentPageSize,
        },
        {
          Authorization: `Bearer ${state.tokens?.access}`,
        }
      ),
    enabled: searchParams.trim() !== "",
  });

  useEffect(() => {
    if (searchParams.trim() === "") {
      const userData: UserListModel = usersQuery.data as UserListModel;
      setUsersListData(userData);
      setTableData(userData.results);
    } else {
      const userData: UserListModel = userSearchQuery.data as UserListModel;

      setUsersListData(userData);
      setTableData(userData.results);
    }
  }, [
    searchParams,
    usersQuery,
    userSearchQuery,
    setUsersListData,
    setTableData,
  ]);

  const [columns, data] = useMemo(() => {
    if (tableData !== undefined) {
      return [USERCOLUMNS, tableData];
    }
    return [USERCOLUMNS, []];
  }, [tableData]);

//   console.log(usersQuery.data)

  const handleSearch = (value: string) => {
    setSearchParams(value);
  };

  const handleFilter = useCallback(() => {
    queryClient.refetchQueries({
      queryKey: ["userSearch", searchParams, currentPage],
    });
  }, [queryClient, searchParams, currentPage]);

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
                  Users
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

      {usersQuery.isLoading ? (
        <div className="text-yellow-400">Loading</div>
      ) : usersQuery.isError ? (
        <div className="text-red-400">Something Went Wrong!</div>
      ) : usersQuery.isSuccess ? (
        <div>
          {usersListData ? (
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-2">
              <UserTableHeader
                totalNo={usersListData.count ? usersListData.count : 0}
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
                    {currentPage} of {""} {usersListData.total}
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
                        disabled={usersListData.previous === null}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(usersListData.total).keys()].map((index) => (
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
                        disabled={usersListData.next === null}
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
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserList;
