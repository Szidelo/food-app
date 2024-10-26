import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { login, logout, setToken, update } from "../../redux/slices/authSlice";
import { AuthFormSignIn, AuthFormSignUp } from "../helpers/form";
import { AppDispatch } from "../../redux/store/store";
import { UserData } from "../interfaces/items/itemsInterfaces";
import { firestoreService } from "./Firestore";
import { FirebaseError } from "firebase/app";

class AuthService {
	constructor(protected dispatch: AppDispatch, protected userAuth = auth) {
		this.dispatch = dispatch;
	}

	async getUserToken(): Promise<string | null> {
		const user = this.getUser();
		if (user) {
			try {
				const token = await user.getIdToken();
				return token;
			} catch (error) {
				console.error("Error fetching token:", error);
			}
		}
		return null;
	}

	async handleSignIn(data: AuthFormSignIn): Promise<void | string> {
		const { email, password } = data;
		try {
			const userCredential = await signInWithEmailAndPassword(this.userAuth, email, password);
			const user = userCredential.user;
			const { displayName, photoURL, uid } = user;
			this.dispatch(login({ email: email, name: displayName || "", picture: photoURL || "", id: uid }));
			console.log("user logged in", user);
		} catch (error) {
			if (error instanceof FirebaseError) {
				console.error(error.code);
				return error.code;
			}
			console.error(error);
		}
	}

	async handleSignUp(data: AuthFormSignUp): Promise<void | string> {
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
			if (error instanceof FirebaseError) {
				console.error(error.code);
				return error.code;
			}
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

	async handleAuthStateChange(): Promise<void> {
		this.userAuth.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					const { email, displayName, photoURL, uid } = user;

					// Dispatch user login
					this.dispatch(login({ email: email || "", name: displayName || "", picture: photoURL || "", id: uid }));

					// Get user token and dispatch to Redux
					const token = await this.getUserToken();
					if (token) {
						this.dispatch(setToken(token));
					}

					console.log("User authenticated:", user);
				} catch (error) {
					console.error("Error during user token retrieval", error);
				}
			} else {
				// No user is logged in, clear state if needed
				this.dispatch(logout());
				console.log("No user authenticated");
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
