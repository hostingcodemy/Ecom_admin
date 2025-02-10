import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoAlertCircleSharp } from "react-icons/io5";
import LogoutPage from './Logout';
import { IMAGES } from "../../constant/theme";
import { ThemeContext } from "../../../context/ThemeContext";
import { GrNotes } from "react-icons/gr";
import profile from './../../../assets/images/profile/17.jpg';
import { MdNotifications } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";


const NotificationBlog = ({ classChange }) => {
	return (
		<>
			<li>
				<div className="timeline-panel">
					<div className="media me-2">
						<img alt="images" width={50} src={IMAGES.Avatar} />
					</div>
					<div className="media-body">
						<h6 className="mb-1">Dr sultads Send you Photo</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}>KG</div>
					<div className="media-body">
						<h6 className="mb-1">Resport created successfully</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}><i className="fa fa-home" /></div>
					<div className="media-body">
						<h6 className="mb-1">Reminder : Treatment Time!</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
		</>
	);
};

const Header = ({ onNote }) => {
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []);

	const { background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if (background.value === 'dark') {
			changeBackground({ value: "light", label: "Light" });
		} else {
			changeBackground({ value: "dark", label: "Dark" });
		}
	};

	return (
		<div className={`header ${headerFix ? "is-fixed" : ""}`}>
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse"
						style={{
							// backgroundColor: "blue",
							display: "flex",
							justifyContent: "flex-end"
						}}
					>
						<Dropdown as="li" className="nav-item header-search searchIcon"
							style={{
								backgroundColor: "white",
								borderRadius: "2vw",
								fontSize: "1vw",
								width: "16.5vw",
								overflow: "hidden",
								marginRight: "1vw",
							}}>
							<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a" style={{
								display: "flex",
								justifyContent: "space-between", alignItems: "center", padding: "0.2vw"
							}}>
								<input type="text" style={{ border: "none", padding: "0.5vw", }} className="searchIcon" placeholder="Enter what you want" />

								<IoSearchOutline size={35} style={{ backgroundColor: "blue", padding: "0.5vw", borderRadius: "2vw", color: "white" }} />
							</Dropdown.Toggle>
						</Dropdown>
						<ul className="navbar-nav"
							style={{
								display: "flex",
								alignItems: "center",
								// gap: "0.5vw"
							}}>
							<Dropdown as="li" className="nav-item dropdown notification_dropdown">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<MdNotifications size={35}
										style={{
											position: "relative",
											color: "#ff8f53"
										}}
									/>
									<span className="notification"
										style={{
											position: "absolute",
											top: "40%",
											left: "45%",
											fontSize: "0.8vw",
											fontWeight: "400",
											color: "white"
										}}
									>3</span>

								</Dropdown.Toggle>
								<Dropdown.Menu align="end" className="mt-2 dropdown-menu dropdown-menu-end">
									<div className="widget-media dz-scroll p-3 height380">
										<ul className="timeline">
											<NotificationBlog classChange='media-info' />
											<NotificationBlog classChange='media-success' />
											<NotificationBlog classChange='media-danger' />
											<NotificationBlog classChange='media-info' />
										</ul>
										<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
											<div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
										</div>
										<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
											<div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }} />
										</div>
									</div>
									<Link className="all-notification" to="#">
										See all notifications <i className="ti-arrow-right" />
									</Link>
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown as="li" className="nav-item header-notes">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<GrNotes size={25}
										style={{ color: "#ebcc34" }}
									/>
								</Dropdown.Toggle>
							</Dropdown>
							<Dropdown as="li" className="nav-item header-alert">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<IoAlertCircleSharp size={32}
										style={{ color: "#f5623d" }}
									/>
								</Dropdown.Toggle>
							</Dropdown>
							<Dropdown as="li" className="nav-item header-task">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<FaTasks size={28}
										style={{ color: "#17cf57" }}
									/>
								</Dropdown.Toggle>
							</Dropdown>
							<Dropdown as="li" className="nav-item header-profile">
								<Dropdown.Toggle className="nav-link i-false p-0" as="div">
									<CgProfile size={30} style={{ marginLeft: "1.5vw", color: "grey" }} />
								</Dropdown.Toggle>
								<Dropdown.Menu align="end">
									<Link to={"/app-profile"} className="dropdown-item ai-icon ">
										<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
										</svg>
										<span className="ms-2">Profile </span>
									</Link>
									<LogoutPage />
								</Dropdown.Menu>
							</Dropdown>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header;
