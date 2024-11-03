

function Settings() {

    return (
        <div className='h-full w-full overflow-scroll scrollbar scrollbar-thumb-ocean overflow-scroll'>
            <p className='text-4xl'>Settings</p>
            <div className='my-8 w-full'>



            </div>

            <div className='my-8 w-full'>
                <p className='text-2xl'>User</p>



                <div className='flex flex-row justify-between my-2'>

                    <div className='text-xl flex flex-col'>
                        <p>Dark Mode</p>
                        <p className='text-sm italic'>Description of what the setting is </p>
                    </div>

                    <div>
                        <button className='border bg-black text-white h-full items-center p-1 rounded-lg'>Setting</button>
                    </div>

                </div>

                <div className='flex flex-row justify-between my-2'>

                    <div className='text-xl flex flex-col'>
                        <p>Account</p>
                        <p className='text-sm italic'>Description of what the setting is </p>
                    </div>

                    <div>
                        <button className='border bg-black text-white h-full items-center p-1 rounded-lg'>Setting</button>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Settings