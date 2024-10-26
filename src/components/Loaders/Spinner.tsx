interface SpinnerProps {
	mode?: "light" | "dark";
}

function Spinner(props: SpinnerProps) {
	return props.mode === "dark" ? <div className="loader loader-dark m-auto"></div> : <div className="loader m-auto"></div>;
}

export default Spinner;
