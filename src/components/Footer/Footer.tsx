import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiFrontendmentor } from "react-icons/si";

function Footer() {
	const iconStyle = "w-10 h-10 mx-2 cursor-pointer social-icon transition duration-10";

	return (
		<footer className="w-full py-14 flex flex-col justify-between items-center bg-caribbean-current-dark text-white">
			<p className="text-center mb-4">All rights reserved @Szidelo Claudiu 2024</p>
			<div className="flex max-w-fit mx-auto mb-16 md:mb-0">
				<a href="https://www.linkedin.com/in/claudiu-szidelo-671b1324a/" target="_blank" rel="noopener noreferrer">
					<FaLinkedin className={iconStyle} />
				</a>
				<a href="https://github.com/szidelo" target="_blank" rel="noopener noreferrer">
					<FaGithub className={iconStyle} />
				</a>
				<a href="https://www.frontendmentor.io/profile/szidelo" target="_blank" rel="noopener noreferrer">
					<SiFrontendmentor className={iconStyle} />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
