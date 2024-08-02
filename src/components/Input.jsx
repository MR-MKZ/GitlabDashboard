import PropTypes from 'prop-types'

export default function Input({type, placeholder, id, icon, required = false, value, onChange}) {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                {icon}
            </div>
            <input type={type} id={id}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-secondary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={placeholder} autoComplete={"off"} required={required} onChange={onChange} value={value} />
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    icon: PropTypes.element,
    required: PropTypes.bool,
    value: PropTypes.any
}
