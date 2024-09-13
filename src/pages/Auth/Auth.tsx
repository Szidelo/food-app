import AuthForm from "../../components/AuthForm/AuthForm";
import { authClasses } from "./authClasses";

export type AuthType = "login" | "signup";

function Auth() {
	const { container } = authClasses;

	return (
		<section className={container + " bg-auth"}>
			<div className="w-full h-full flex justify-center items-center backdrop-brightness-50">
				<div className="flex rounded-xl overflow-hidden shadow-xl md:w-8/12 md:h-4/6 w-full h-[calc(100vh-36px)] md:m-0 m-4 bg-caribbean-current">
					<div className="md:w-1/2 md:h-full w-0 bg-black overflow-hidden">
						<img
							className="w-full h-full object-cover"
							src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="random"
						/>
					</div>
					<div className="md:w-1/2 w-full flex justify-center items-center">
						<AuthForm />
					</div>
				</div>
			</div>
		</section>
	);
}

export default Auth;
