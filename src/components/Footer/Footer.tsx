import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle, FaYoutube } from "react-icons/fa";

const cssClasss = {
	footerStyle: "w-full py-14 flex flex-col justify-between items-center bg-caribbean-current-dark text-white",
	iconStyle: "w-10 h-10 mx-2 cursor-pointer social-icon transition duration-10",
	navLinkStyle: "mx-2 cursor-pointer social-icon transition duration-300",
};

function Footer() {
	const { footerStyle, iconStyle, navLinkStyle } = cssClasss;
	return (
		<footer className={footerStyle}>
			<div className="flex justify-between">
				<FaFacebook className={iconStyle} />
				<FaInstagram className={iconStyle} />
				<FaTwitter className={iconStyle} />
				<FaGoogle className={iconStyle} />
				<FaYoutube className={iconStyle} />
			</div>
			<nav className="mt-4">
				<a href="/home" className={navLinkStyle}>
					Home
				</a>
				<a href="/news" className={navLinkStyle}>
					News
				</a>
				<a href="/about" className={navLinkStyle}>
					About
				</a>
				<a href="/contact" className={navLinkStyle}>
					Contact
				</a>
			</nav>
		</footer>
	);
}

export default Footer;
