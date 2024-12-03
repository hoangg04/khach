import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { registerFields } from "../../lib/data";
import AuthApi from "@/api/auth.api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
	// const router = useRouter();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
		fullName: "",
	};

	// Validation schema
	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Email is required"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Confirm Password is required"),
		fullName: Yup.string()
			.min(6, "Full name must be at least 6 characters")
			.required("Full Name is required"),
	});

	const handleSubmit = async (values) => {
		setLoading(true);
		const result = await AuthApi.register(values);
		if (result.status === 201) {
			toast.success("Đăng ký thành công", {
				duration: 1000,
			});
			dispatch(login(result.metadata.data.user));
			localStorage.setItem("accessToken", result.metadata.data.accessToken);
			navigate({ pathname: "/user/me" });
		}
		setLoading(false);
	};

	return (
		<>
			<section>
				<div className="flex-col flex-center px-6 py-8 mx-auto h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl">
								Create an account
							</h1>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
							>
								{({ handleChange, handleBlur, values, errors }) => (
									<Form noValidate autoComplete="off">
										{registerFields.map((field) => {
											return (
												<div key={field.name} className="mt-3">
													<label
														className="block mb-2 text-sm font-medium text-[#674188] "
														htmlFor={field.name}
													>
														{field.label}
													</label>
													<input
														className={`bg-gray-50 text-[#674188] rounded-lg focus:ring-primary-600 focus:border-primary-600 outline outline-1 block w-full p-2.5 ${
															errors[field.name] && "text-red-400 outline-red-400"
														}`}
														name={field.name}
														placeholder={field.placeholder}
														aria-label={field.name}
														onChange={handleChange}
														value={values[`${field.name}`]}
														onBlur={handleBlur}
														type={field.type}
														id={field.name}
													/>
													<span className="text-xs h-3 block text-red-500 mt-2">
														{errors[field.name] ?? ""}
													</span>
												</div>
											);
										})}
										<button
											type="submit"
											className="w-full bg-[#C8A1E0] text-white font-medium mt-3 rounded-lg text-base px-5 py-2.5 text-center"
										>
											Sign Up
										</button>
										<div className="mt-2">
											<p className="text-sm text-[#674188] text-center">
												Already have an account?{" "}
												<a href="/auth/signin" className="text-[#C8A1E0]">
													Sign In
												</a>
											</p>
										</div>
										<div className="text-center mt-2">
											<a href="/auth/register" className="text-[#C8A1E0] text-sm">
												Forgot password
											</a>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
