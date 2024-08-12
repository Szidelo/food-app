import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks/hooks";
import { login, logout } from "../../redux/slices/authSlice";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthForm, authFormSchema } from "../../utils/helpers/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Firebase";

function Auth() {
	const [authType, setAuthType] = useState<"login" | "signup">("login");

	const user = useAppSelector((state) => state.auth.user);
	console.log("user", user);

	const dispatch = useDispatch();

	const handleFormSubmit = async (data: AuthForm) => {
		const userAuth = auth;

		try {
			if (authType === "signup") {
				const userCredential = await createUserWithEmailAndPassword(userAuth, data.email, data.password);
				const user = userCredential.user;
				console.log("user created", user);
			} else if (authType === "login") {
				const userCredential = await signInWithEmailAndPassword(userAuth, data.email, data.password);
				const user = userCredential.user;
				console.log("user logged in", user);
			}
			dispatch(login({ email: data.email, password: data.password }));
			reset();
		} catch (error) {
			console.error(error);
		}
	};

	const handleAuthType = () => {
		setAuthType((prevAuthType) => (prevAuthType === "login" ? "signup" : "login"));
	};

	const handleSignOut = () => {
		const userAuth = auth;
		userAuth.signOut();
		dispatch(logout());
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AuthForm>({
		resolver: yupResolver(authFormSchema),
	});

	return (
		<div className="auth">
			<Card />
			<h2>Log In</h2>
			<form onSubmit={handleSubmit(handleFormSubmit)} action="">
				<button className="w-full">Google</button>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input className={errors.email && "input-error"} type="email" placeholder="email@example.com" {...register("email")} />
					{errors.email && <p className="form-error">{errors.email.message}</p>}
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input className={errors.password && "input-error"} type="password" placeholder="******" {...register("password")} />
					{errors.password && <p className="form-error">{errors.password.message}</p>}
				</div>
				<div className="form-control">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						className={errors.confirmPassword && "input-error"}
						type="password"
						placeholder="******"
						{...register("confirmPassword")}
					/>
					{errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
				</div>

				<button className="w-full">Sign in with Email</button>
				<p>Do not have a account yet?</p>
				{authType === "login" ? (
					<button onClick={handleAuthType}>Sign Up</button>
				) : (
					<button onClick={handleAuthType}>Log In</button>
				)}
			</form>
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
