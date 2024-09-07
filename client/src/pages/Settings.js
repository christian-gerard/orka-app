import SettingsIcon from '@mui/icons-material/Settings';

function Settings() {

    return (
        <>
            {/* Page Header */}

                <div className='flex flex-row items-center h-[5%]'>
                    <SettingsIcon fontSize='small' />
                    <p className='text-lg ml-2'>Settings</p>
                </div>




            {/* Settings */}
            <div className='border border-[0.2px] h-[100%] overflow-y-scroll h-[95%]'>
                <p>Account Information</p>
                <p>Manage Users</p>

            </div>
        
        
        </>
    )
}

export default Settings