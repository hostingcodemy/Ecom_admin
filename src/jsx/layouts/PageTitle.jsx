import React from "react";
import { Link, useLocation } from "react-router-dom";

const PageTitle = () => {
	const location = useLocation();
	const { pathname } = location;

	//let motherMenu = "Hotel Position";
	let activeMenu = "";

	if (pathname === "/hotel-position") {
		activeMenu = "Hotel Position";
	} else if (pathname === "/add-category") {
		activeMenu = " Add Category";
	} else if (pathname === "/walk-customer-details") {
		activeMenu = "Hotel Position > Customer Info > Rate Upgradation";
	} 

	const breadcrumbs = activeMenu.split(" > ");

	return (
		<div className="page-titles">
			<ol className="breadcrumb">
				{/* Mother menu item */}
				{/* <li className="breadcrumb-item">
					<Link to="/hotel-position">{motherMenu}</Link>
				</li> */}


				{breadcrumbs.map((crumb, index) => {
					const path = breadcrumbs
						.slice(0, index + 1)
						.join("/")
						.toLowerCase()
						.replace(/ /g, "-");

					return (
						<li
							key={index}
							className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? "active-orange" : ""
								}`}
						>
							{index === breadcrumbs.length - 1 ? (
								crumb
							) : (
								<Link to={`/${path}`}>{crumb}</Link>
							)}
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default PageTitle;
