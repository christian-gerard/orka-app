import Task from '../components/Task'


function Dashboard() {
    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex items-center'>
                <p className=''>Dashboard</p>
            </div>

            {/* Top Half :: 45%*/}
            <div className='h-[45%] w-full border'>


                <p>Outstanding Tasks</p>
                <div className=''>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </div>



            </div>

            {/* Bottom Half 50% */}
            <div className='h-[50%] w-full flex flex-row'>
                {/* Clients */}
                <div className='w-[50%] h-full border'>
                    <p>Clients</p>

                </div>
                {/* Projects */}
                <div className='w-[50%] h-full border'>
                    <p>Projects</p>

                </div>
            </div>



        </div>
    )
}

export default Dashboard