
function User({id, first_name, last_name, email}) {

    return (
        <div className='flex flex-row border items-center justify-between'>


            <div className='w-[40%] px-2 text-base bold flex flex-nowrap flex-row justify-end'>
                <p className='truncate'>{first_name ? first_name : "XYZ Testing"} {last_name}</p>
            </div>
            <div className='w-[60%] px-2 bg-black text-white '>
                <p className='truncate'>{email ? email : 'test@email.com'}</p>
            </div>


        </div>
    )
}

export default User