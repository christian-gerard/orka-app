
function Task() {
    return (
        <div className='p-1 m-2 border flex flex-row justify-between items-center h-[40px]'>
            <div className='w-[50%] flex flex-row items-center'>
                <p className='bg-ocean border border-black text-white p-[0.1em]'>Project</p>
                <p>Description</p>

            </div>

            <div className='w-[50%] flex flex-row justify-end'>
                <p>Category</p>
                <p>Deadline</p>
                <input type='checkbox' className='"peer w-[25px] h-[25px] appearance-none border-2 border-ocean bg-ocean checked:bg-white' />
            </div>
        </div>
    )
}
export default Task