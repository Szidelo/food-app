/* eslint-disable no-mixed-spaces-and-tabs */
type PropsType = {
	type: "home" | "food" | "details";
	title: string;
	description?: string;
	image?: string;
	buttons?: string[];
};

function Header(props: PropsType) {
	const { type, title, description, image, buttons } = props;
	return (
		<div className={type === "home" ? "home__banner" : "food__banner"}>
			<div className="container h-full w-5/6 flex items-center justify-start mx-auto">
				{image && (
					<div>
						<img src={image || ""} alt="" />
					</div>
				)}
				{type === "home" && (
					<div className="space-y-10 z-[5]">
						<h1 className="text-4xl font-bold text-white">{title}</h1>
						<p className="text-white max-w-3xl">{description ? description : ""}</p>
						<div className="flex gap-8">
							{buttons
								? buttons.map((button) => (
										<button key={button} className={`btn btn-${button} rounded-full shadow-md`}>
											{button}
										</button>
								  ))
								: ""}
						</div>
					</div>
				)}
				{type === "food" && <h1 className="text-4xl w-full font-bold text-white text-center">{title}</h1>}
			</div>
			<svg className="home__svg-header" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#fff"
					fill-opacity="1"
					d="M0,256L120,261.3C240,267,480,277,720,266.7C960,256,1200,224,1320,208L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
			</svg>
		</div>
	);
}

export default Header;
