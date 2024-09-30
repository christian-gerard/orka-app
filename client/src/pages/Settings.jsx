

function Settings() {

    return (
        <div className='h-full w-full overflow-scroll scrollbar scrollbar-thumb-ocean overflow-scroll'>
            <p className='text-4xl'>Settings</p>
            <div className='my-4 w-full'>
                <p className='text-2xl'>General</p>

                <div className='flex flex-row justify-between my-2'>
                    <div className='text-xl flex flex-col'>
                        <p>Setting</p>
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