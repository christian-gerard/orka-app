
function Dashboard() {
    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex items-center bg-ocean'>
                <p className=''>Dashboard</p>
            </div>

            {/* Top Half :: 45%*/}
            <div className='h-[45%] w-full bg-white border'>
                {/* Outstanding Tasks */}
                <div>

                </div>

            </div>

            {/* Bottom Half 50% */}
            <div className='h-[50%] w-full flex flex-row'>
                {/* Clients */}
                <div className='w-[50%] h-full border'>

                </div>
                {/* Projects */}
                <div className='w-[50%] h-full border'>

                </div>
            </div>



        </div>
    )
}

export default Dashboard