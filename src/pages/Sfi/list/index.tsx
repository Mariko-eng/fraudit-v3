import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SfiService from "../../../services/sfi.service";
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
import { SFICOLUMNS } from "../widgets/columns";
import SfiTableHeader from "../widgets/header";
import { SfiListModel, SfiModel } from "../../../models/sfi";
import { SfiActionsButton } from "../widgets/actions";
import { SfiUpdateModal } from "../modals/updateSfiModal";
import { SfiDeleteModal } from "../modals/deleteSfiModal";
import { SfiCreateModal } from "../modals/createSfiModal";
import { LoadingModal } from "../../../components/modals/messages/LoadingModal";
import { ErrorModal } from "../../../components/modals/messages/ErrorModal";
import { SuccessModal } from "../../../components/modals/messages/SuccessModal";
import { CustomError } from "../../../utils/api";

function SfiList() {
  const state = useAppSelector((store) => store.auth);

  const [open, setOpen] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedRowData, setSelectedRowData] = useState<SfiModel | null>(null);

  const [sfisListData, setSfisListData] = useState<SfiListModel | null>(null);

  const [tableData, setTableData] = useState<SfiModel[]>([]);

  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const createSFIMutation = useMutation({
    mutationFn: async (newSFIData: object) => {
      setOpen(true);
      return await SfiService.addSfi(
        { ...newSFIData },
        {
          Authorization: `Bearer ${state.tokens?.access}`,
          "Content-Type": "application/json",
        }
      );
    },
    onSuccess: () => {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
      window.location.reload();
    },
    onError: (error: CustomError) => {
      console.log(error);
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
    },
  });

  const handleSfiCreate = (newSFIData: object) => {
    createSFIMutation.mutate(newSFIData);
  };

  const openSfiUpdate = ({ prevData }: { prevData: SfiModel }) => {
    setSelectedRowData(prevData);
    setOpenUpdate(true);
  };

  const updateSFIMutation = useMutation({
    mutationFn: async (data: { sfiId: string; newSFIData: object }) => {
      setOpen(true);
      return await SfiService.updateSfi(
        data.sfiId,
        { ...data.newSFIData },
        {
          Authorization: `Bearer ${state.tokens?.access}`,
          "Content-Type": "application/json",
        }
      );
    },
    onSuccess: () => {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 4000);
    },
    onError: (error: CustomError) => {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
      return error;
    },
  });

  const handleSfiUpdate = ({
    id,
    unique_number,
  }: {
    id: string;
    unique_number: string;
  }) => {
    updateSFIMutation.mutate({
      sfiId: id,
      newSFIData: {
        unique_number: unique_number,
      },
    });
  };

  const deleteSFIMutation = useMutation({
    mutationFn: async (sfiId: string) => {
      setOpen(true);
      return await SfiService.deleteSfi(sfiId, {
        Authorization: `Bearer ${state.tokens?.access}`,
        "Content-Type": "application/json",
      });
    },
    onSuccess: () => {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
      window.location.reload();
    },
    onError: (error: CustomError) => {
      console.log(error);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    },
  });

  const handleSfiDelete = (id: string) => {
    deleteSFIMutation.mutate(id);
  };

  const openSfiDelete = ({ prevData }: { prevData: SfiModel }) => {
    console.log(prevData);
    setSelectedRowData(prevData);
    setOpenDelete(true);
  };

  const sfisQuery = useQuery({
    queryKey: ["sfis", currentPage], // Include searchParams in the queryKey
    initialData: {},
    queryFn: async () =>
      await SfiService.getSfis(
        {
          page: currentPage,
        },
        {
          Authorization: `Bearer ${state.tokens?.access}`,
        }
      ),
  });

  const sfiSearchQuery = useQuery({
    queryKey: ["sfiSearch", searchParams, currentPage], // Include searchParams in the queryKey
    initialData: {},
    queryFn: async () =>
      await SfiService.getSfis(
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
      const sfiData: SfiListModel = sfisQuery.data as SfiListModel;
      setSfisListData(sfiData);
      setTableData(sfiData.results);
    } else {
      const sfiData: SfiListModel = sfiSearchQuery.data as SfiListModel;

      setSfisListData(sfiData);
      setTableData(sfiData.results);
    }
  }, [searchParams, sfisQuery, sfiSearchQuery, setSfisListData, setTableData]);

  // console.log(sfisQuery.data)

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

  const [columns, data] = useMemo(() => {
    // Define columns with additional function passed to ActionsButton
    const cols = SFICOLUMNS.map((col) => {
      if (col.id === "actions") {
        return {
          ...col,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: (props: any) => (
            <SfiActionsButton
              props={props}
              openSfiUpdate={openSfiUpdate}
              openSfiDelete={openSfiDelete}
            />
          ),
        };
      }
      return col;
    });

    if (tableData !== undefined) {
      return [cols, tableData];
    }
    return [cols, []];
  }, [tableData]);

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
    <>
      {createSFIMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Updating SFI ..."
        />
      )}

      {createSFIMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={createSFIMutation.error.response?.statusText}
          errorMessage={
            createSFIMutation.error.errorMessage ??
            "Something went wrong. Please try again later."
          }
        />
      )}

      {createSFIMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="SFI Added successfully!"
        />
      )}

      {updateSFIMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Updating SFI ..."
        />
      )}

      {updateSFIMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={updateSFIMutation.error.response?.statusText}
          errorMessage={
            updateSFIMutation.error.errorMessage ??
            "Something went wrong. Please try again later."
          }
        />
      )}

      {updateSFIMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="SFi Updated successfully!"
        />
      )}

      {deleteSFIMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Deleting SFI ..."
        />
      )}

      {deleteSFIMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={deleteSFIMutation.error.response?.statusText}
          errorMessage={
            deleteSFIMutation.error.errorMessage ??
            "Something went wrong. Please try again later."
          }
        />
      )}

      {deleteSFIMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="SFi deleted successfully!"
        />
      )}

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
                    Sfis
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

        {sfisQuery.isLoading ? (
          <div className="text-yellow-400">Loading</div>
        ) : sfisQuery.isError ? (
          <div className="text-red-400">Something Went Wrong!</div>
        ) : sfisQuery.isSuccess ? (
          <div>
            {sfisListData ? (
              <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-2">
                <SfiTableHeader
                  totalNo={sfisListData.count ? sfisListData.count : 0}
                  searchParams={searchParams}
                  handleSearch={handleSearch}
                  setOpenCreate={setOpenCreate}
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
                            <td
                              key={cell.id}
                              className="w-5 p-4 items-center text-center"
                            >
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
                      {currentPage} of {""} {sfisListData.total}
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
                          disabled={sfisListData.previous === null}
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(sfisListData.total).keys()].map((index) => (
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
                          disabled={sfisListData.next === null}
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

      {openCreate && (
        <SfiCreateModal
          open={openCreate}
          setOpen={setOpenCreate}
          createSFI={handleSfiCreate}
        />
      )}

      {openUpdate && selectedRowData !== null && (
        <SfiUpdateModal
          open={openUpdate}
          setOpen={setOpenUpdate}
          prevData={selectedRowData}
          updateSFI={handleSfiUpdate}
        />
      )}

      {openDelete && selectedRowData !== null && (
        <SfiDeleteModal
          open={openDelete}
          setOpen={setOpenDelete}
          ID={selectedRowData.id}
          deleteSFI={handleSfiDelete}
        />
      )}
    </>
  );
}

export default SfiList;
