import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useDispatch } from "react-redux";
import { UserData } from "../../utils/interfaces/items/itemsInterfaces";
import { EditUserFormInterface, editUserFormSchema } from "../../utils/helpers/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { helpers } from "../../utils/helpers/functions";
import Spinner from "../Loaders/Spinner";
import AuthService from "../../utils/service/AuthService";

interface UserModalProps {
	isVisible: boolean;
	onClose: () => void;
}

function UserModal({ isVisible, onClose }: UserModalProps) {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [isClosing, setIsClosing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleClose = () => {
		setIsClosing(true);

		setTimeout(() => {
			onClose();
			setIsClosing(false);
		}, 150);

		reset();
	};

	useEffect(() => {
		if (isVisible) {
			setIsClosing(false);
		}
	}, [isVisible]);

	const displayVisibility = isVisible || isClosing ? "flex" : "none";
	const modalAnimation = isClosing ? "modal-fade-out" : "modal-fade-in";
	const scaleAnimation = isClosing ? "modal-scale-out" : "modal-scale-in";

	const handleFormSubmit: SubmitHandler<EditUserFormInterface> = async (data: EditUserFormInterface) => {
		setIsLoading(true);
		const authService = new AuthService(dispatch);
		const { name, image } = data;
		const updatedUser = { photoURL: image, email: user?.email, displayName: name, id: user?.id } as UserData;
		await authService.updateUserData(updatedUser).catch((error) => setError(error));
		setIsLoading(false);

		if (!error) {
			onClose();
		}

		reset();
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EditUserFormInterface>({ resolver: yupResolver(editUserFormSchema) });

	const errorMessage = error && (
		<div className="flex flex-col items-center justify-center">
			<p className="mb-4 text-xl capitalize">{helpers.formatErrorCode(error)}!</p>
			<button onClick={() => setError("")} className="btn rounded-full">
				Try Again!
			</button>
		</div>
	);

	if (errorMessage) {
		return errorMessage;
	}

	return (
		<div onClick={handleClose} style={{ display: displayVisibility, animation: `${modalAnimation} 0.2s ease` }} className="modal">
			{isLoading ? (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner />
				</div>
			) : (
				<div
					style={{ animation: `${scaleAnimation} 0.2s ease` }}
					className="modal__user bg-caribbean-current p-8 rounded-lg shadow-lg flex flex-col justify-center items-center gap-6"
					onClick={(e) => e.stopPropagation()}>
					<h1 className="text-3xl font-bold capitalize">Hello {user?.name}</h1>
					<div>
						<img className="rounded-full w-24 h-24 object-cover shadow-lg" src={user?.picture} alt="" />
					</div>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 min-w-64">
						<div className="text-white flex flex-col gap-4 authform__form-control">
							<label>Set your name</label>
							<input type="text" placeholder="Name" {...register("name")} />
							{errors.name && <p className="text-red-500">{errors.name.message}</p>}
							<label>Set your avatar</label>
							<input type="text" placeholder="Avatar URL" {...register("image")} />
							{errors.image && <p className="text-red-500">{errors.image.message}</p>}
						</div>
						<button type="submit" className="authform__submit-btn">
							OK
						</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default UserModal;
