import NavBar from "../components/NavBar";
import PropTypes from 'prop-types'

const DashboardLayout = ({ children }) => {
  let desktopMainContainerStyle = " lg:grid lg:grid-cols-[1fr_75px] lg:overflow-hidden dir-rtl lg:outline-gray-borders lg:outline-2 lg:outline lg:rounded-xl lg:pt-0"
  let desktopNavBarContainerStyle = "lg:w-[75px] lg:h-[calc(100vh-1rem)] lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl dir-ltr lg:left-0"
  let desktopContentContainerStyle = "lg:h-[calc(100vh-1rem)] lg:overflow-y-auto lg:p-7 lg:rounded-none lg:rounded-tr-xl lg:rounded-br-xl dir-ltr lg:border-l-2 lg:border-l-gray-borders lg:mt-0"
  return (
    <div
      className={` relative sm:overflow-x-hidden m-2 pt-[80px] ${desktopMainContainerStyle}`}>
      {/* left nav bar */}
      <div
        className={`bg-gray-primary w-full h-[70px] box-border top-0 rounded-lg absolute ${desktopNavBarContainerStyle}`}>
        <NavBar />
      </div>
      {/* content container */}
      <div className={`bg-black-primary w-full overflow-x-hidden box-border rounded-lg h-max text-white p-3 ${desktopContentContainerStyle}`}>
        {children}
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.any
}

export default DashboardLayout;
