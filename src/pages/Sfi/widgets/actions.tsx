import { SfiModel } from "../../../models/sfi";
import { CellContext } from "@tanstack/react-table";

export const SfiActionsButton = ({
  props,
  openSfiUpdate,
  openSfiDelete,
}: {
  props: CellContext<SfiModel, unknown>;
  openSfiUpdate: ({ prevData }: { prevData: SfiModel }) => void;
  openSfiDelete: ({ prevData }: { prevData: SfiModel }) => void;
}) => {
  return (
    <div className="flex justify-center">
      <div className="mx-1">
        <button
          className="text-yellow-500 text-sm"
          onClick={() => {
            openSfiUpdate({ prevData: props.row.original as SfiModel });
          }}
        >
          Edit
        </button>
      </div>
      <div className="mx-1">
        <button
          className="text-red-500 text-sm"
          onClick={() => {
            openSfiDelete({ prevData: props.row.original as SfiModel });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};


// export default SfiActionsButton;
