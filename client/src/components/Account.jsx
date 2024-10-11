

function Account({name, users}){
    return(
        <div className='flex flex-col justify-center items-center'>
            <div className='rounded-[100%] size-[100px] border bg-ocean'></div>
            <p className='text-lg mt-2'>{name ? name : 'Unnamed'} </p>
            <p>({users ? users.length : "0"} Active Users)</p>
        </div>
    )
}

export default Account