import { useAppSelector } from "../../redux/hooks/hooks";
import Card from "../../components/UserCard/Card";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormSignIn, AuthFormSignUp, signInFormSchema, signUpFormSchema } from "../../utils/helpers/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import AuthService from "../../utils/service/AuthService";
import { useDispatch } from "react-redux";
import { AUTH_TYPES } from "../../utils/constants/auth";

export type AuthType = "login" | "signup";

function Auth() {
	const [authType, setAuthType] = useState<AuthType>("login");

	const user = useAppSelector((state) => state.auth.user);

	const dispatch = useDispatch();
	const authServ = new AuthService(dispatch);

	const handleFormSubmit: SubmitHandler<AuthFormSignIn | AuthFormSignUp> = async (data) => {
		if (authType === "login") {
			await authServ.handleSignIn(data as AuthFormSignIn);
		} else {
			await authServ.handleSignUp(data as AuthFormSignUp);
		}
		reset();
	};

	const handleAuthType = () => {
		setAuthType((prevAuthType) => (prevAuthType === "login" ? "signup" : "login"));
	};

	const handleSignOut = async () => {
		await authServ.handleLogout();
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AuthFormSignIn | AuthFormSignUp>({
		resolver: yupResolver(authType === "login" ? signInFormSchema : signUpFormSchema),
	});

	return (
		<div className="auth">
			<Card />
			<h2>{authType === AUTH_TYPES.LOGIN ? "Log In" : "Register your account"}</h2>
			{/* <form onSubmit={handleSubmit(handleFormSubmit)} action="">
				{authType === AUTH_TYPES.SIGNUP ? (
					<>
						<div className="form-control">
							<label htmlFor="name">Name</label>
							<input className={errors.name && "input-error"} type="text" placeholder="John Doe" {...register("name")} />
							{errors.name && <p className="form-error">{errors.name.message}</p>}
						</div>
						<div className="form-control">
							<label htmlFor="email">Email</label>
							<input className={errors.email && "input-error"} type="email" placeholder="email" {...register("email")} />
							{errors.email && <p className="form-error">{errors.email.message}</p>}
						</div>
						<div className="form-control">
							<label htmlFor="password">Password</label>
							<input
								className={errors.password && "input-error"}
								type="password"
								placeholder="password"
								{...register("password")}
							/>
							{errors.password && <p className="form-error">{errors.password.message}</p>}
						</div>
						<div className="form-control">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								className={errors.confirmPassword && "input-error"}
								type="password"
								placeholder="confirm password"
								{...register("confirmPassword")}
							/>
							{errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
						</div>
						<div>
							<p>Already have a account?</p>
							<button className="link-btn" onClick={handleAuthType}>
								Log In with email
							</button>
						</div>
					</>
				) : (
					<>
						<div className="form-control">
							<label htmlFor="email">Email</label>
							<input className={errors.email && "input-error"} type="email" placeholder="email" {...register("email")} />
							{errors.email && <p className="form-error">{errors.email.message}</p>}
						</div>
						<div className="form-control">
							<label htmlFor="password">Password</label>
							<input
								className={errors.password && "input-error"}
								type="password"
								placeholder="password"
								{...register("password")}
							/>
							{errors.password && <p className="form-error">{errors.password.message}</p>}
						</div>
						<div>
							<p>Dont have a accout yet??</p>
							<button className="link-btn" onClick={handleAuthType}>
								Sign Up
							</button>
						</div>
					</>
				)}
				<button className="w-full">{authType === AUTH_TYPES.LOGIN ? "Log In" : "Sign Up"}</button>
			</form> */}
			<div className="form-options">
				<Link to="/">
					<button>Home</button>
				</Link>
				<button disabled={user == null} onClick={handleSignOut}>
					Sign Out
				</button>
			</div>
		</div>
	);
}

export default Auth;
