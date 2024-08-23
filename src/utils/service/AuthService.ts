import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { login, logout, setToken, update } from "../../redux/slices/authSlice";
import { AuthFormSignIn, AuthFormSignUp } from "../helpers/form";
import { AppDispatch } from "../../redux/store/store";
import { User, UserData } from "../interfaces/items/itemsInterfaces";
import { firestoreService } from "./Firestore";

class AuthService {
	constructor(protected dispatch: AppDispatch, protected userAuth = auth) {
		this.dispatch = dispatch;
	}

	async getUserToken(): Promise<string | null> {
		const user = this.getUser();
		if (user) {
			const token = await user.getIdToken();
			return token;
		}
		return null;
	}

	async handleSignIn(data: AuthFormSignIn): Promise<void> {
		const { email, password } = data;
		try {
			const userCredential = await signInWithEmailAndPassword(this.userAuth, email, password);
			const user = userCredential.user;
			const { displayName, photoURL, uid } = user;
			this.dispatch(login({ email: email, name: displayName || "", picture: photoURL || "", id: uid }));
			console.log("user logged in", user);
		} catch (error) {
			console.error(error);
		}
	}

	async handleSignUp(data: AuthFormSignUp): Promise<void> {
		const { email, password, name } = data;
		try {
			const userCredential = await createUserWithEmailAndPassword(this.userAuth, email, password);
			const user = userCredential.user;

			await updateProfile(user, { displayName: name });

			const { displayName, photoURL, uid } = user;

			this.dispatch(login({ email: email, name: displayName || "", picture: photoURL || "", id: uid }));

			await firestoreService.saveUserDataToDb(
				{ email, name: displayName || "", picture: photoURL || "", id: uid },
				{ displayName: displayName || "", photoURL: photoURL || "", email: email }
			);

			console.log("User created and profile updated", user);
		} catch (error) {
			console.error("Error during sign up:", error);
		}
	}

	async handleLogout(): Promise<void> {
		try {
			await this.userAuth.signOut();
			this.dispatch(logout());
			console.log("user signed out");
		} catch (error) {
			console.error("Sign out error:", error);
		}
	}

	async handleAuthStateChange(currentUser: User | null): Promise<void> {
		this.userAuth.onAuthStateChanged(async (user) => {
			if (user) {
				const { email, displayName, photoURL, uid } = user;
				if (email?.toLowerCase() === currentUser?.email?.toLowerCase()) {
					console.log("user already logged in", user);
				}

				this.dispatch(login({ email: email || "", name: displayName || "", picture: photoURL || "", id: uid }));
				this.dispatch(setToken((await this.getUserToken()) || ""));
				console.log("user state", user);
			} else {
				console.log("no user");
			}
		});
	}

	async handlePasswordResetByEmail(email: string): Promise<void> {
		try {
			await sendPasswordResetEmail(this.userAuth, email);
			console.log("Password reset email sent");
		} catch (error) {
			console.error("Password reset email error:", error);
		}
	}

	async updateUserData(data: UserData): Promise<void> {
		const user = this.userAuth.currentUser;
		if (user) {
			const { displayName: name, photoURL: picture } = data;
			try {
				this.dispatch(update({ email: user.email || "", name, picture, id: user.uid }));

				await updateProfile(user, { displayName: name, photoURL: picture });

				await firestoreService.saveUserDataToDb(
					{ email: user.email || "", name, picture, id: user.uid },
					{ displayName: name, photoURL: picture, email: user.email || "" }
				);

				console.log("User profile and Firestore data updated");
			} catch (error) {
				console.error("Update user data error:", error);
			}
		}
	}

	getUser() {
		const user = this.userAuth.currentUser;
		if (user) {
			return user;
		} else {
			console.log("no user");
			return null;
		}
	}

	getUserProfile() {
		const user = this.getUser();
		if (user) {
			const { email, displayName, photoURL, phoneNumber, uid } = user;
			const token = user.getIdToken();
			return { email, displayName, photoURL, token, phoneNumber, uid };
		}
		return null;
	}
}

export default AuthService;
