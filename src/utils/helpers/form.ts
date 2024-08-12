import * as yup from "yup";

export const authFormSchema = yup.object().shape({
	email: yup.string().email("Please provide a valid email address").required("Email is required"),
	password: yup
		.string()
		.min(4, "Password must be at least 4 characters")
		.max(20, "Password sould have a maximum of 20 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Password confirmation is required"),
});

export interface AuthForm {
	email: string;
	password: string;
	confirmPassword: string;
}
