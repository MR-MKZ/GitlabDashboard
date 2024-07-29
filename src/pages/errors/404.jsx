import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";

export default function PageNotFound() {
    return (
        <div className={"p-11 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center justify-center w-full"}>
            <span className="text-gray-500 text-9xl sm:text-[11rem] transition-all">404</span>
            <p className="text-white text-sm sm:text-base transition-all">Oops something went wrong</p>
            <Link to={'/'}>
                <Button color={'gray'}>
                    <HiOutlineHome size={20} className="mr-2" />
                    Back to home
                </Button>
            </Link>
        </div>
    )
}