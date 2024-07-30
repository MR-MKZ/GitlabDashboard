import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'flowbite-react';


const CustomLink = ({ to, icon, text, disabled, tooltipContent, tooltipPosition }) => {
    return (
        <Link to={!disabled && to} className={`p-2 ${!disabled ? "hover:bg-gray-borders" : "cursor-default"} transition-all duration-300 block w-max mx-auto rounded-md`}>
            <Tooltip content={tooltipContent} placement={tooltipPosition} className='ml-2 bg-red-400' arrow={false}>
                {icon}
                {text}
            </Tooltip>
        </Link>
    );
};


CustomLink.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    tooltipContent: PropTypes.string,
    tooltipPosition: PropTypes.string
};

export default CustomLink;
