import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import IncidentService from "../../../services/incident.service";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
// import { IncidentListModel, IncidentModel } from "../../../models/incident";
import { TransferListModel, TransferModel } from "../../../models/transfer";
import { useEffect, useMemo } from "react";
import { TbArrowsSort } from "react-icons/tb";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TRANSFERCOLUMNS } from "../widgets/columns";
import TransferTableHeader from "../widgets/header";
import { useParams } from "react-router-dom";
import { CustomError } from "../../../utils/api";
import { SuccessModal } from "../../../components/modals/messages/SuccessModal";
import { ErrorModal } from "../../../components/modals/messages/ErrorModal";
import { LoadingModal } from "../../../components/modals/messages/LoadingModal";
import { TransferApproveModal } from "../modals/approveTransferModal";
import { TransferDeclineModal } from "../modals/declineTransferModal";
import { TransferDeleteModal } from "../modals/deleteTransferModal";
import { TransferActionsButton } from "../widgets/actions";

function TransferList() {
  const params = useParams();

  const { status } = params;

  const state = useAppSelector((store) => store.auth);

  const [open, setOpen] = useState<boolean>(false);
  const [openApprove, setOpenApprove] = useState<boolean>(false);
  const [openDecline, setOpenDecline] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [responseData, setResponseData] = useState<TransferListModel | null>(
    null
  );
  const [tableData, setTableData] = useState<TransferModel[]>([]);

  const [selectedRowData, setSelectedRowData] = useState<TransferModel | null>(
    null
  );

  const queryClient = useQueryClient();

  // const [searchParams, setSearchParams] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const transfersQuery = useQuery({
    queryKey: ["transfers", currentPage, status], // Include searchParams in the queryKey
    initialData: {},
    queryFn: async () => {
      if (status) {
        return await IncidentService.getTransferRequests(
          {
            page: currentPage,
            status: status,
          },
          {
            Authorization: `Bearer ${state.tokens?.access}`,
          }
        );
      } else {
        return await IncidentService.getTransferRequests(
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

  useEffect(() => {
      const transferData: TransferListModel =
        transfersQuery.data as TransferListModel;

      setResponseData(transferData)
      setTableData(transferData.results);
  }, [
    transfersQuery,
    setTableData,
  ]);

  // console.log(transfersQuery.data)

  // Use useEffect to trigger a manual refetch when needed
  useEffect(() => {
    // Manually trigger a refetch when the component mounts or when specific dependencies change
    queryClient.refetchQueries({
      queryKey: ["transfers", currentPage, status],
    });
  }, [queryClient, currentPage, status]); // Specify dependencies as needed

  const appoveTransferMutation = useMutation({
    mutationFn: async (data: { transferId: string }) => {
      setOpen(true);
      return await IncidentService.approveTransferRequest(data.transferId, {
        Authorization: `Bearer ${state.tokens?.access}`,
        "Content-Type": "application/json",
      });
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

  const handleTransferApprove = (id: string) => {
    appoveTransferMutation.mutate({
      transferId: id,
    });
  };

  const declineTransferMutation = useMutation({
    mutationFn: async (data: { transferId: string }) => {
      setOpen(true);
      return await IncidentService.declineTransferRequest(data.transferId, {
        Authorization: `Bearer ${state.tokens?.access}`,
        "Content-Type": "application/json",
      });
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

  const handleTransferDecline = (id: string) => {
    declineTransferMutation.mutate({
      transferId: id,
    });
  };

  const deleteTransferMutation = useMutation({
    mutationFn: async (sfiId: string) => {
      setOpen(true);
      return await IncidentService.deleteTransferRequest(sfiId, {
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

  const handleTransferDelete = (id: string) => {
    deleteTransferMutation.mutate(id);
  };

  const openTransferApprove = ({ prevData }: { prevData: TransferModel }) => {
    setSelectedRowData(prevData);
    setOpenApprove(true);
  };

  const openTransferDecline = ({ prevData }: { prevData: TransferModel }) => {
    setSelectedRowData(prevData);
    setOpenDecline(true);
  };

  const openTransferDelete = ({ prevData }: { prevData: TransferModel }) => {
    setSelectedRowData(prevData);
    setOpenDelete(true);
  };

  const [columns, data] = useMemo(() => {
    // Define columns with additional function passed to ActionsButton
    const cols = TRANSFERCOLUMNS.map((col) => {
      if (col.id === "actions") {
        return {
          ...col,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: (props: any) => (
            <TransferActionsButton
              props={props}
              openTransferApprove={openTransferApprove}
              openTransferDecline={openTransferDecline}
              opentransferDelete={openTransferDelete}
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
      {appoveTransferMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Approving Transfer ..."
        />
      )}

      {appoveTransferMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={appoveTransferMutation.error.response?.statusText}
          errorMessage={
            appoveTransferMutation.error.errorMessage ??
            "Something went wrong. Please try again later."
          }
        />
      )}

      {appoveTransferMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="Transfer Approved successfully!"
        />
      )}

      {declineTransferMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Declining Transfer ..."
        />
      )}

      {declineTransferMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={declineTransferMutation.error.response?.statusText}
          errorMessage={
            declineTransferMutation.error.errorMessage ??
            "Something went wrong. Please try again later."
          }
        />
      )}

      {declineTransferMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="Transfer Declined successfully!"
        />
      )}

      {deleteTransferMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Deleting Transfer ..."
        />
      )}

      {deleteTransferMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={deleteTransferMutation.error.response?.statusText}
          errorMessage={
            deleteTransferMutation.error.errorMessage ??
            "Something went wrong. Please try again later."
          }
        />
      )}

      {deleteTransferMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="Transfer deleted successfully!"
        />
      )}

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
                  Transfers
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
        {responseData ? (
          <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-2">
            <TransferTableHeader
              totalNo={
                responseData.count ? responseData.count : 0
              }
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
            { responseData.total && 
            <div>
              <p>
                Page{" "}
                <span>
                  {currentPage} of {""} {responseData.total}
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
                      disabled={responseData.previous === null}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(responseData.total).keys()].map((index) => (
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
                      disabled={responseData.next === null}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            }
          </div>
        ) : (
          <p>Loading....</p>
        )}
      </div>

      {openApprove && selectedRowData !== null && (
        <TransferApproveModal
          open={openApprove}
          setOpen={setOpenApprove}
          ID={selectedRowData.id}
          approveTransfer={handleTransferApprove}
        />
      )}

      {openDecline && selectedRowData !== null && (
        <TransferDeclineModal
          open={openDecline}
          setOpen={setOpenDecline}
          ID={selectedRowData.id}
          declineTransfer={handleTransferDecline}
        />
      )}

      {openDelete && selectedRowData !== null && (
        <TransferDeleteModal
          open={openDelete}
          setOpen={setOpenDelete}
          ID={selectedRowData.id}
          deleteTransfer={handleTransferDelete}
        />
      )}
    </>
  );
}

export default TransferList;
