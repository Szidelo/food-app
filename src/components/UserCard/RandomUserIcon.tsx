interface RandomUserIconProps {
	name: string;
}

const RandomUserIcon = ({ name }: RandomUserIconProps) => {
	return (
		<div className="user_icon">
			<div className="circle">
				<h1 className="font-extrabold uppercase">{name[0] + name[1]}</h1>
			</div>
		</div>
	);
};

export default RandomUserIcon;
