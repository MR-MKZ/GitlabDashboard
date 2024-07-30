import "../assets/css/NavBar.css"
import {
    MdOutlineSpaceDashboard,
    MdOutlineEmail,
    MdOutlineNotifications,
    MdOutlineCalendarToday,
    MdOutlineSettings,
    MdOutlineInsertChart
} from "react-icons/md";
import CustomLink from "./CustomLink"
import { useLocation } from "react-router-dom";
// import { Tooltip } from "flowbite-react";

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

    return (
        <>
            <div className={`hidden lg:block`}>
                <img src="./src/assets/images/gitlab-logo.png" className="w-14 mx-auto mt-2" alt="" />
                <nav className="flex flex-col gap-2 mt-5">
                    <ul>
                        <CustomLink to={"/"} icon={<MdOutlineSpaceDashboard color={currentNavTab("/")} size={25} />} tooltipContent={"Home"} tooltipPosition={"right"} />
                    </ul>
                    <ul>
                        <CustomLink to={"/inbox"} icon={<MdOutlineEmail color={currentNavTab("/inbox")} size={25} />} disabled={true} tooltipContent={"Inbox"} tooltipPosition={"right"} />
                    </ul>
                    <ul>
                        <CustomLink to={"/notifications"} icon={<MdOutlineNotifications color={currentNavTab("/notifications")} size={25} />} disabled={true} tooltipContent={"Notifications"} tooltipPosition={"right"} />
                    </ul>
                    <ul>
                        <CustomLink to={"/schedule"} icon={<MdOutlineCalendarToday color={currentNavTab("/schedule")} size={25} />} disabled={true} tooltipContent={"Schedule"} tooltipPosition={"right"} />
                    </ul>
                </nav>
            </div>
            <hr className="mt-5 border-t-gray-borders border-t-2 hidden lg:block" />
            <div className="hidden lg:flex flex-col gap-2 mt-5">
                <div>
                    <CustomLink to={"/statistics"} icon={<MdOutlineInsertChart color={currentNavTab("/statistics")} size={25} />} disabled={true} tooltipContent={"Statistics"} tooltipPosition={"right"} />
                </div>
                <div>
                    <CustomLink to={"/settings"} icon={<MdOutlineSettings color={currentNavTab("/settings")} size={25} />} disabled={true} tooltipContent={"Settings"} tooltipPosition={"right"} />
                </div>
            </div>
        </>
    )
}
