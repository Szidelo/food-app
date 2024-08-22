import React from "react";

function AuthForm() {
	return (
		<form className="text-papaya-whip p-10">
			<div className="">
				<h2 className="font-bold text-4xl text-center mb-8">Sign Up</h2>
				<div className="flex flex-col authform__form-control p-6 gap-4">
					<input type="text" name="name" placeholder="Username..." />
					<input type="email" name="email" placeholder="Email..." />
					<input type="password" name="password" placeholder="Password..." />
					<input type="password" name="confirmPassword" placeholder="Confirm Password..." />
					<button className="authform__submit-btn">Sign Up</button>
					<div className="flex justify-between items-center w-full">
						<div className="border border-transparent border-b-orange-50 w-full me-3"></div>
						<p>or</p>
						<div className="border border-transparent border-b-orange-50 w-full ms-3"></div>
					</div>
					<button className="authform__google-btn">Sign up with Google</button>
				</div>
				<div>
					<p className="text-center">
						Alredy have a account? <button className="authform__link-btn">Log In...</button>
					</p>
				</div>
			</div>
		</form>
	);
}

export default AuthForm;
