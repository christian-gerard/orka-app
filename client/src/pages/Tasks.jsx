
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


            </div>

        </div>
    )
}

export default Tasks