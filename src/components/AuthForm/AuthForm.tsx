import { useState } from "react";
import Spinner from "../Loaders/Spinner";
import { useDispatch } from "react-redux";
import AuthService from "../../utils/service/AuthService";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormSignIn, AuthFormSignUp, signInFormSchema, signUpFormSchema } from "../../utils/helpers/form";
import { AUTH_TYPES } from "../../utils/constants/auth";

type AuthType = "login" | "signup";

function AuthForm() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [authType, setAuthType] = useState<AuthType>("signup");

	const authService = new AuthService(dispatch);

	const handleAuthType = () => {
		setAuthType((prevAuthType) => (prevAuthType === "login" ? "signup" : "login"));
		reset();
	};

	const handleFormSubmit: SubmitHandler<AuthFormSignIn | AuthFormSignUp> = async (data) => {
		setLoading(true);
		if (authType === "login") {
			await authService.handleSignIn(data as AuthFormSignIn);
		} else {
			await authService.handleSignUp(data as AuthFormSignUp);
		}
		reset();
		setLoading(false);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AuthFormSignUp | AuthFormSignIn>({
		resolver: yupResolver(authType === "login" ? signInFormSchema : signUpFormSchema),
	});

	if (loading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<Spinner />
			</div>
		);
	}

	const inputs =
		authType === AUTH_TYPES.SIGNUP ? (
			<>
				<input type="text" className={errors.name && "authform__error-input"} placeholder="Username..." {...register("name")} />
				{errors.name && <p className="authform__form-error">{errors.name.message}</p>}

				<input type="email" className={errors.email && "authform__error-input"} placeholder="Email..." {...register("email")} />
				{errors.email && <p className="authform__form-error">{errors.email.message}</p>}

				<input
					type="password"
					className={errors.password && "authform__error-input"}
					placeholder="Password..."
					{...register("password")}
				/>
				{errors.password && <p className="authform__form-error">{errors.password.message}</p>}

				<input
					type="password"
					className={errors.confirmPassword && "authform__error-input"}
					placeholder="Confirm Password..."
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && <p className="authform__form-error">{errors.confirmPassword.message}</p>}
			</>
		) : (
			<>
				<input type="email" className={errors.email && "authform__error-input"} placeholder="Email..." {...register("email")} />
				{errors.email && <p className="authform__form-error">{errors.email.message}</p>}

				<input
					type="password"
					className={errors.password && "authform__error-input"}
					placeholder="Password..."
					{...register("password")}
				/>
				{errors.password && <p className="authform__form-error">{errors.password.message}</p>}
			</>
		);

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="text-papaya-whip md:p-10 px-2 py-15 my-auto w-full">
			<div className="">
				<h2 className="font-bold text-4xl text-center mb-8">{authType === AUTH_TYPES.SIGNUP ? "Sign Up" : "Sign In"}</h2>
				<div className="flex flex-col authform__form-control p-6 gap-4">
					{inputs}
					<button className="authform__submit-btn">{authType === AUTH_TYPES.SIGNUP ? "Sign Up" : "Sign In"}</button>
					<div className="flex justify-between items-center w-full">
						<div className="border border-transparent border-b-orange-50 w-full me-3"></div>
						<p>or</p>
						<div className="border border-transparent border-b-orange-50 w-full ms-3"></div>
					</div>
					<button className="authform__google-btn">{authType === AUTH_TYPES.SIGNUP ? "Sign Up" : "Sign In"} with Google</button>
				</div>
				<div>
					<p className="text-center">
						{authType === AUTH_TYPES.SIGNUP ? "Already have a accout?" : ""}{" "}
						<button onClick={handleAuthType} className="authform__link-btn">
							{authType === AUTH_TYPES.SIGNUP ? "Sign In" : "Register Your Account Here!"}
						</button>
					</p>
				</div>
			</div>
		</form>
	);
}

export default AuthForm;
