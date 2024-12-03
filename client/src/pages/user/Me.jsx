import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { updateProfileFields } from "../../lib/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "@/lib/features/user/userSlice";
import { Loader2 } from "lucide-react";
import UserApi from "@/api/user.api";
import { ENUM_ROLE } from "@/constant";
export default function Me() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isHydrated, setIsHydrated] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setIsHydrated(true);
	}, [user]);
	// Validation schema
	const validationSchema = Yup.object({
		usr_email: Yup.string().email("Invalid email address").required("Email is required"),
		usr_name: Yup.string().required("Full Name is required"),
		usr_phone: Yup.string()
			.required()
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Phone number is not valid")
			.max(10),
		usr_address: Yup.string().required("Address is required"),
	});

	const handleSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
			delete values.usr_email;
			const result = await UserApi.updateUser(values);
			if (result.status === 200) {
				dispatch(login(result.metadata.data));
				toast.success("Cập nhật thông tin thành công",{
					duration: 1000,
				});
			}
		} finally {
			setSubmitting(false);
		}
	};
	const becomeSeller = async () => {
		setLoading(true);
		const result = await UserApi.becomeSeller();
		if (result.status === 200) {
			dispatch(
				login({
					usr_role: ENUM_ROLE.SELLER,
				}),
			);
			toast.success("Bạn đã trở thành người bán", {
				duration: 1000,
			});
		}
		setLoading(false);
	};
	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		toast.success("Đăng xuất thành công", {
			duration: 1000,
		});
		dispatch(logout());
		navigate({ pathname: "/auth/login" });
	};

	return (
		<section className="bg-gray-100">
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="flex gap-5 flex-col md:flex-row ">
					<div className="flex flex-col w-full md:max-w-[300px] bg-white rounded-lg flex-center overflow-hidden h-max">
						<div className="relative h-[150px] w-full flex-center before:h-1/2 before:w-full before:bg-gray-400 before:absolute before:top-0">
							<div className="overflow-hidden size-[100px] rounded-full	z-10 border-2 border-white">
								<img alt="avatar" src={user.usr_avatar} className="size-full object-cover" />
							</div>
						</div>
						<div className="flex-1 w-full flex justify-start items-center flex-col gap-2 mb-5">
							<Button
								onClick={handleLogout}
								className="w-9/12 bg-gray-400 hover:bg-gray-300 hover:text-black"
							>
								Đăng xuất
							</Button>
						</div>
					</div>

					<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 flex-1">
						<Formik
							initialValues={user}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
							enableReinitialize 
						>
							{({ handleChange, handleBlur, values, errors, isSubmitting }) => (
								<Form noValidate autoComplete="off">
									{updateProfileFields.map((field) => {
										return (
											<div key={field.name} className="mt-3">
												<label
													className="block mb-2 text-sm font-medium text-[#674188]"
													htmlFor={field.name}
												>
													{field.label}
												</label>
												<input
													className="bg-gray-50 border border-gray-300 text-[#674188] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:text-gray-400"
													name={field.name}
													placeholder={field.placeholder}
													aria-label={field.name}
													onChange={handleChange}
													value={values[`${field.name}`] ?? ""}
													onBlur={handleBlur}
													type={field.type}
													id={field.name}
													disabled={!isHydrated || field.name == "usr_email"} // Disable input until hydration is complete
												/>
												<span className="text-xs h-3 block text-red-500 mt-2">
													{errors[field.name] ?? ""}
												</span>
											</div>
										);
									})}

									<button
										type="submit"
										className="w-full bg-[#C8A1E0] mt-5 text-white font-medium rounded-lg text-base px-5 py-2.5 text-center"
										disabled={isSubmitting || !isHydrated} // Disable submit button until fully hydrated
									>
										{isSubmitting ? (
											<div className="flex gap-4">
												<Loader2 className="animate-spin" />
												Please wait...
											</div>
										) : (
											"Update"
										)}
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</section>
	);
}
