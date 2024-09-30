import Project from '../components/Project'

function Projects() {
    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-center'>
                <p className=''>Projects</p>
                <div className='border bg-black'>
                    <p className='text-lg text-white p-1'>+ New Project</p>
                </div>
            </div>



            {/* Projects */}
            <div className='h-[95%] w-full border overflow-scroll-y'>
            </div>



        </div>
    )
}
export default Projects