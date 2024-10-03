

function Account({name, users}){
    return(
        <div className='flex flex-col justify-center'>
            <div className='rounded-[100%] h-[100px] w-[100px] border bg-ocean'></div>
            <p className='w-full text-center text-xl'>{name ? name : 'Unnamed'} ({users ? users.length : "0"})</p>
        </div>
    )
}

export default Account