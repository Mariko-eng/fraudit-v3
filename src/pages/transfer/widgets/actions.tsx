import { TransferModel } from "../../../models/transfer";
import { CellContext } from "@tanstack/react-table";
import { useAppSelector } from "../../../redux/hooks";
import { CreatedByUserModel } from "../../../models/user";
import { SfiModel } from "../../../models/sfi";

export const TransferActionsButton = ({
  props,
  openTransferApprove,
  openTransferDecline,
  opentransferDelete,
}: {
  props: CellContext<TransferModel, unknown>;
  openTransferApprove: ({ prevData }: { prevData: TransferModel }) => void;
  openTransferDecline: ({ prevData }: { prevData: TransferModel }) => void;
  opentransferDelete: ({ prevData }: { prevData: TransferModel }) => void;
}) => {
  const state = useAppSelector((store) => store.auth);

  return (
    <div className="flex justify-center">
      {state.user?.user_category === "SOC" && (
        <>
          {props.row.original.status === "PENDING" && (
            <div className="mx-1">
              <button
                className="text-blue-500 text-sm"
                onClick={() => {
                  openTransferApprove({
                    prevData: props.row.original as TransferModel,
                  });
                }}
              >
                Approve
              </button>
            </div>
          )}
          <div className="mx-1">
            <button
              className="text-yellow-500 text-sm"
              onClick={() => {
                openTransferDecline({
                  prevData: props.row.original as TransferModel,
                });
              }}
            >
              Decline
            </button>
          </div>
        </>
      )}

      {props.row.original.status === "PENDING" && (
        <>
          {state.user?.user_category === "SOC" ? (
            <div className="mx-1">
              <button
                className="text-red-500 text-sm"
                onClick={() => {
                  opentransferDelete({
                    prevData: props.row.original as TransferModel,
                  });
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              {state.user?.user_category === "UBA" && (
                <>
                  {state.user?.id ===
                    (props.row.original.created_by as CreatedByUserModel)
                      .id && (
                    <>
                      <div className="mx-1">
                        <button
                          className="text-red-500 text-sm"
                          onClick={() => {
                            opentransferDelete({
                              prevData: props.row.original as TransferModel,
                            });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
              {state.user?.user_category === "SFI" && (
                <>
                  {(state.user.sfi as SfiModel).id ===
                    (props.row.original.created_by as CreatedByUserModel)
                      .sfi && (
                    <>
                      <div className="mx-1">
                        <button
                          className="text-red-500 text-sm"
                          onClick={() => {
                            opentransferDelete({
                              prevData: props.row.original as TransferModel,
                            });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const ActionsButton = ({ row } : { row: any }) => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   return (
//     <>
//     <div className='relative'>
//       <button
//         id={`${row.original.id}-button`}
//         data-dropdown-toggle={row.original.id}
//         onClick={() => toggleDropdown()}
//         className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
//         type="button"
//       >
//         <TbBrandMixpanel className="w-5 h-5" />
//       </button>
//       <div
//         id={row.original.id}
//         className={`${isDropdownVisible ? "block" : "hidden"} absolute right-0 z-10 w-44 rounded bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
//       >
//         <ul
//           className="py-1 text-sm text-gray-700 dark:text-gray-200"
//           aria-labelledby={`${row.original.id}-button`}
//         >
//           <li>
//             <a
//               href="#"
//               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               Show
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               Edit
//             </a>
//           </li>
//         </ul>
//         <div className="py-1">
//           <a
//             href="#"
//             className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//           >
//             Delete
//           </a>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ActionsButton;
