import Task from '../components/Task'

function Tasks(){
    return(
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-bottom'>
                <p className=''>Tasks</p>
                <div>
                    <p>Add Task</p>
                </div>
            </div>

            {/* main body */}
            <div className='h-[95%] w-full flex flex-col gap-4 border scrollbar-thin scrollbar-thumb-ocean overflow-scroll'>

                <div>
                    <div>
                        Not Started
                    </div>

                    <div>
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </div>
                </div>

                <div>
                    <div>
                        Doing
                    </div>

                    <div>
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </div>
                </div>

                <div>
                    <div>
                        Blocked
                    </div>

                    <div>
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Tasks