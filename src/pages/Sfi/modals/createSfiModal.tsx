import { SyntheticEvent, ChangeEvent, useState } from "react";
import { ParentModal } from "../../../components/modals";


export const SfiCreateModal = ({
	open,
	setOpen,
	createSFI,
}: {
	open: boolean;
	setOpen: (value: boolean) => void;
	createSFI: (data: object) => void;
}) => {
	const [newSFINo, setNewSFINo] = useState<string>("");

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		setOpen(false);

		createSFI({
            unique_number: newSFINo
        });
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

        setNewSFINo(event.target.value)
	};

	return (
		<ParentModal
			open={open}
			setOpen={setOpen}
			hasButtons={false}
		>
			<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="h-6 w-6 text-orange-600"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<div className="mb-8">
					<h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
						Create New SFI
					</h2>
					<div className="flex justify-between">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Add a new financial institution by providing the
							following details.
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					{/* <!-- Grid --> */}
					<div className="grid grid-cols-12 gap-4 sm:gap-6">
						{/* <!-- End Col --> */}

						<div className="col-span-3">
							<label
								htmlFor="unique_number"
								className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
							>
								Bank No.
							</label>
						</div>
						{/* <!-- End Col --> */}

						<div className="col-span-9">
							<input
								id="unique_number"
								name="unique_number"
								type="text"
								value={newSFINo}
								onChange={handleChange}
								className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
								placeholder="Bank A"
								required
								minLength={1}
							/>
						</div>
						{/* <!-- End Col --> */}
					</div>
					{/* <!-- End Grid --> */}

					<div className="mt-5 flex justify-end gap-x-2">
						<button
							type="button"
							onClick={() => setOpen(false)}
							// onClick={handleReset}
							// disabled={!!registerMutation.isLoading}
							className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#00AFD7] transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#00AFD7] text-white hover:bg-[#00AFE7] focus:outline-none focus:ring-2 focus:ring-[#00AFD7] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
							// disabled={!!registerMutation.isLoading}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</ParentModal>
	);
};