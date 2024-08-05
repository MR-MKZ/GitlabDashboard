import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'flowbite-react';


export default function CustomLink({ to, icon, text, disabled, tooltipContent, tooltipPosition, tooltipActive = true }) {

    const isDesktop = () => window.innerWidth >= 1024;

    return (
        <Link to={!disabled && to} className={`p-2 ${!disabled ? "hover:bg-gray-borders text-white" : "cursor-default text-gray-400"} transition-all duration-300 block ${isDesktop() ? "w-max" : "w-full"} mx-auto rounded-md`}>
            {tooltipActive ? (
                <Tooltip content={tooltipContent} placement={tooltipPosition} className='ml-2' arrow={false}>
                    {icon}
                    {text}
                </Tooltip>
            ) : (
                <div content={tooltipContent} className='flex gap-3'>
                    {icon}
                    {text}
                </div>
            )}
        </Link>
    );
}


CustomLink.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    tooltipContent: PropTypes.string,
    tooltipPosition: PropTypes.string,
    tooltipActive: PropTypes.bool
};