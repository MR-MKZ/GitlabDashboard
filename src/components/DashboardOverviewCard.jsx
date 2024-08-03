import PropTypes from 'prop-types'

export default function DashboardOverviewCard({ icon, overviewData, overviewTitle }) {
    return (
        <div className='bg-gray-primary border border-gray-borders rounded-lg p-5 grid grid-cols-[48px_1fr] gap-3 h-[90px]'>
            <div className='rounded-md bg-blue-primary flex items-center justify-center'>
                {icon}
            </div>
            <div>
                <p className='text-xl'>{overviewData}</p>
                <p className='text-sm text-gray-400'>{overviewTitle}</p>
            </div>
        </div>
    )
}

DashboardOverviewCard.propTypes = {
    icon: PropTypes.element,
    overviewData: PropTypes.any,
    overviewTitle: PropTypes.string
}