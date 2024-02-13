import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { CustomError } from "../../../utils/api";
import LogoLight from "./../../../assets/UBALogoOnlyLight.png";
import LogoDark from "./../../../assets/UBALogoOnlyDark.png";
import AuthService from "../../../services/auth.service";
import { LoadingModal } from "../../../components/modals/messages/LoadingModal";
import { SuccessModal } from "../../../components/modals/messages/SuccessModal";
import { ErrorModal } from "../../../components/modals/messages/ErrorModal";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

	const [email, setEmail] = useState<string>("");

	const [open, setOpen] = useState<boolean>(false);

	const [sentRequest, setSentRequest] = useState<boolean>(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const forgotPasswordRequestMutation = useMutation({
		mutationFn: async () => {
			setOpen(true); AuthService
			return await AuthService.forgotPasswordRequest(email);
		},
		onSuccess: () => {
			setOpen(true);

			setTimeout(() => {
				setOpen(false);

				setSentRequest(true);
				// return navigate("/reset-password");
			}, 4000);
		},
		onError: (error: CustomError) => {
			setOpen(true);

			setTimeout(() => {
				setOpen(false);
			}, 4000);

            console.log(error)
		},
	});

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		forgotPasswordRequestMutation.mutate();
	};

	return (
		<>
			<div className="h-full">
				<div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
					<main className="w-full max-w-md mx-auto p-6">
						{/* modals */}
						{forgotPasswordRequestMutation.isPending && (
							<LoadingModal open={open} setOpen={setOpen} />
						)}

						{forgotPasswordRequestMutation.isSuccess && (
							<SuccessModal
								open={open}
								setOpen={setOpen}
								successTitle="Success"
								successMessage="Password request sent successfully. Please check your email inbox for a link to reset your password"
							/>
						)}

						{forgotPasswordRequestMutation.isError && (
							<ErrorModal
								open={open}
								setOpen={setOpen}
								errorTitle={
									forgotPasswordRequestMutation.error.response
										?.statusText
								}
								errorMessage={
									forgotPasswordRequestMutation.error
										.errorMessage
								}
							/>
						)}
						{/* endmodals */}
						<div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
							<div className="p-4 sm:p-7">
								<div className="text-center">
									<div className="flex justify-center">
										<img
											src={LogoLight}
											className="w-1/2 dark:hidden"
										/>
										<img
											src={LogoDark}
											className="w-1/2 hidden dark:block"
										/>
									</div>
									<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
										Forgot password
									</h1>
									<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
										Remember password?
										<Link
											className="text-[#00AFD7] hover:text-[#00AFD2] decoration-2 hover:underline font-medium"
											to="/"
										>
											&nbsp;Sign in here
										</Link>
									</p>
								</div>

								<div className="mt-5">
									{
										sentRequest ? <>
											<div className="grid gap-y-4">
												<p className="dark:text-white">Password reset email sent. Please check your email inbox to reset your password</p>
											</div>
										</> : <>
											{/* <!-- Form --> */}
											<form onSubmit={handleSubmit}>
												<div className="grid gap-y-4">
													{/* <!-- Form Group --> */}
													<div>
														<label
															htmlFor="email"
															className="block text-sm mb-2 dark:text-white"
														>
															Email address
														</label>
														<div className="relative">
															<input
																type="email"
																id="email"
																name="email"
																value={email}
																onChange={handleChange}
																disabled={!!forgotPasswordRequestMutation.isPending}
																className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
																required
																aria-describedby="email-error"
															/>
															<div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
																<svg
																	className="h-5 w-5 text-red-500"
																	width="16"
																	height="16"
																	fill="currentColor"
																	viewBox="0 0 16 16"
																	aria-hidden="true"
																>
																	<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
																</svg>
															</div>
														</div>
														<p
															className="hidden text-xs text-red-600 mt-2"
															id="email-error"
														>
															Please include a valid email
															address so we can get back
															to you
														</p>
													</div>
													{/* <!-- End Form Group --> */}

													<button
														type="submit"
														className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#00AFD7] text-white hover:bg-[#00AFD1] focus:outline-none focus:ring-2 focus:ring-[#00AFD7] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
													>
														Reset password
													</button>
												</div>
											</form>
											{/* <!-- End Form --> */}

										</>
									}
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;