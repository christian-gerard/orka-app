import { useState, useContext } from 'react'
import Project from '../components/Project'
import CloseIcon from '@mui/icons-material/Close';

function Projects() {
    const [newProject, setNewProject] = useState(false)

    const handleNewProject = () => setNewProject(!newProject)

    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-center'>
                <p className=''>Projects</p>
                <div className='border bg-black' onClick={handleNewProject}>
                    <p className='text-lg text-white p-1'>+ New Project</p>
                </div>
            </div>



            {/* Projects */}
            <div className='h-[95%] w-full border scrollbar scrollbar-thumb-ocean overflow-scroll'>
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
            </div>

            {
                newProject ?

                <div className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur'>
                    <div className='bg-white border h-[700px] w-[350px] lg:h-[80%] lg:w-[40%]'>
                        <CloseIcon  style={{width: '40px', height: '40px'}} onClick={handleNewProject} />
                    </div>
                </div>

                :

                <>
                </>
            }


        </div>
    )
}
export default Projects