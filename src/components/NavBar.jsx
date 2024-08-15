import {
    MdOutlineSpaceDashboard,
    MdOutlineLogout,
    MdOutlineSettings,
    // MdOutlineInsertChart,
} from "react-icons/md";
import { GoIssueOpened } from "react-icons/go";
import { BiTask } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
// import PropTypes from "prop-types"

const CustomLink = React.lazy(() => import('./CustomLink'));


export default function NavBar() {

    const location = useLocation()

    /**
     * check if current page is the entered path or not
     * @param {string} path 
     * @returns {string} icon color
     */
    const currentNavTab = (path) => {
        return location.pathname === path ? "white" : "gray"
    }

    const burgerContainer = {
        hidden: { opacity: 0, top: "-100%" },
        visible: {
            opacity: 1,
            top: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const burgerItem = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };


    const [showBurgerMenu, setshowBurgerMenu] = useState(false);

    return (
        <>
            {/* Desktop sidebar */}
            <div className={`hidden lg:block`}>
                <img src="./assets/images/gitlab-logo.png" className="w-14 mx-auto mt-2" alt="Gitlab Logo" />
                <nav className="mt-5">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <CustomLink to={"/"} icon={<MdOutlineSpaceDashboard color={currentNavTab("/")} size={25} />} tooltipContent={"Dashboard"} tooltipPosition={"right"} />
                        </li>
                        <li>
                            <CustomLink to={"/tasks"} icon={<BiTask color={currentNavTab("/tasks")} size={25} />} disabled={false} tooltipContent={"Tasks"} tooltipPosition={"right"} />
                        </li>
                        <li>
                            <CustomLink to={"/issues"} icon={<GoIssueOpened color={currentNavTab("/issues")} size={25} />} disabled={true} tooltipContent={"Issues"} tooltipPosition={"right"} />
                        </li>
                        {/* <li>
                            <CustomLink to={"/schedule"} icon={<MdOutlineCalendarToday color={currentNavTab("/schedule")} size={25} />} disabled={true} tooltipContent={"Schedule"} tooltipPosition={"right"} />
                        </li> */}
                    </ul>
                </nav>
            </div>
            <hr className="mt-5 border-t-gray-borders border-t-2 hidden lg:block" />
            <div className="hidden lg:flex flex-col gap-2 mt-5">
                {/* <div>
                    <CustomLink to={"/statistics"} icon={<MdOutlineInsertChart color={currentNavTab("/statistics")} size={25} />} disabled={true} tooltipContent={"Statistics"} tooltipPosition={"right"} />
                </div> */}
                <div>
                    <CustomLink to={"/settings"} icon={<MdOutlineSettings color={currentNavTab("/settings")} size={25} />} disabled={true} tooltipContent={"Settings"} tooltipPosition={"right"} />
                </div>
                <div>
                    <CustomLink to={"/auth/logout"} icon={<MdOutlineLogout color={currentNavTab("/auth/logout")} size={25} />} disabled={false} tooltipContent={"Logout"} tooltipPosition={"right"} />
                </div>
            </div>
            {/* Mobile / Tablet hamburger menu */}
            <div className="lg:hidden flex justify-between items-center h-full w-full p-2">
                <div className="flex text-lg items-center">
                    <img src="./assets/images/gitlab-logo.png" className="w-16" alt="" />
                </div>
                <p className="text-white">Gitlab Dashboard</p>
                <div onClick={
                    () => setshowBurgerMenu(true)
                } className={`w-max h-full flex flex-col gap-2 items-center justify-center aspect-square hover:bg-gray-borders transition-all duration-300 rounded-md`}>
                    <RxHamburgerMenu size={30} color="white" />
                </div>
            </div>
            <motion.div
                variants={burgerContainer}
                initial={false}
                animate={showBurgerMenu ? "visible" : "hidden"}
                className="lg:hidden flex flex-col p-5 gap-5 bg-black-secondary h-screen fixed z-10 top-0 left-0 w-screen overflow-x-hidden"

            >
                <div className="mx-auto w-full flex text-lg items-center justify-center">
                    <img src="./assets/images/gitlab-logo.png" className="w-20" alt="Gitlab Dashboard logo" />
                    <div onClick={() => setshowBurgerMenu(false)} className={`w-max p-2 absolute right-4 top-8 flex items-center justify-center aspect-square hover:bg-gray-borders transition-all duration-300 rounded-md`}>
                        <IoMdClose size={35} color="white" />
                    </div>
                </div>
                <ul className="flex flex-col gap-5 items-start w-full">
                    <motion.li
                        variants={burgerItem}
                        className="w-full"
                    >
                        <CustomLink to={"/"} icon={<MdOutlineSpaceDashboard color={currentNavTab("/")} size={25} />} text={"Dashboard"} tooltipActive={false} />
                    </motion.li>
                    <motion.li
                        variants={burgerItem}
                        className="w-full"
                    >
                        <CustomLink to={"/tasks"} icon={<BiTask color={currentNavTab("/tasks")} size={25} />} disabled={false} text={"Tasks"} tooltipActive={false} />
                    </motion.li>
                    <motion.li
                        variants={burgerItem}
                        className="w-full"
                    >
                        <CustomLink to={"/issues"} icon={<GoIssueOpened color={currentNavTab("/issues")} size={25} />} disabled={true} text={"Issues"} tooltipActive={false} />
                    </motion.li>
                    <motion.li
                        variants={burgerItem}
                        className="w-full"
                    >
                        <CustomLink to={"/auth/logout"} icon={<MdOutlineLogout color={currentNavTab("/auth/logout")} size={25} />} disabled={false} text={"Logout"} tooltipActive={false} />
                    </motion.li>
                </ul>
            </motion.div>
        </>
    )
}