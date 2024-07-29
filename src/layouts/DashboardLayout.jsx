import { motion } from "framer-motion"
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DashboardLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <Outlet />
    </motion.div>
  )
}

export default DashboardLayout;
