import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { AuthType } from "../../pages/Auth/Auth";
import { login, logout, update } from "../../redux/slices/authSlice";
import { AuthForm } from "../helpers/form";
import { AppDispatch } from "../../redux/store/store";
import { User, UserData } from "../interfaces/items/itemsInterfaces";

class AuthService {
	constructor(protected dispatch: AppDispatch, protected userAuth = auth) {
		this.dispatch = dispatch;
	}

	async handleSubmit(data: AuthForm, authType: AuthType) {
		try {
			if (authType === "signup") {
				const userCredential = await createUserWithEmailAndPassword(this.userAuth, data.email, data.password);
				const user = userCredential.user;
				console.log("user created", user);
			} else if (authType === "login") {
				const userCredential = await signInWithEmailAndPassword(this.userAuth, data.email, data.password);
				const user = userCredential.user;
				console.log("user logged in", user);
			}
			this.dispatch(login({ email: data.email, password: data.password }));
		} catch (error) {
			console.error(error);
		}
	}

	async handleLogout() {
		try {
			await this.userAuth.signOut();
			this.dispatch(logout());
			console.log("user signed out");
		} catch (error) {
			console.error("Sign out error:", error);
		}
	}

	async handleAuthStateChange(currentUser: User | null) {
		this.userAuth.onAuthStateChanged((user) => {
			if (user) {
				if (user.email?.toLowerCase() === currentUser?.email?.toLowerCase()) {
					console.log("user already logged in", user);
				}
				this.dispatch(login({ email: user.email || "", password: "" }));
				console.log("user state", user);
			} else {
				console.log("no user");
			}
		});
	}

	async handlePasswordResetByEmail(email: string) {
		try {
			await sendPasswordResetEmail(this.userAuth, email);
			console.log("Password reset email sent");
		} catch (error) {
			console.error("Password reset email error:", error);
		}
	}

	async updateUserData(data: UserData) {
		const user = this.userAuth.currentUser;
		if (user) {
			const { displayName: name, photoURL: picture } = data;
			try {
				await updateProfile(user, { displayName: name, photoURL: picture });
				this.dispatch(update({ email: user.email || "", password: "", name, picture }));
			} catch (error) {
				console.error("Update user name error:", error);
			}
		}
	}

	getUser() {
		const user = this.userAuth.currentUser;
		if (user) {
			return user;
		} else {
			console.log("no user");
		}
	}

	getUserProfile() {
		const user = this.getUser();
		if (user) {
			const { email, displayName, photoURL, phoneNumber, uid } = user;
			const token = user.getIdToken();
			return { email, displayName, photoURL, token, phoneNumber, uid };
		}
	}
}

export default AuthService;
