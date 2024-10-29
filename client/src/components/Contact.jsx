

function Contact({id, first_name, last_name, email, phone_number, role, description, client}) {

    return (
        <div className='h-[150px] w-[300px] flex flex-col border'>
            <div className='px-2 text-2xl bg-ocean text-white p-1 w-full'>
                <p>{first_name ? first_name: ""} {last_name ? last_name: ""}</p>
            </div>

            <div className='px-2'>
            <p>{role ? role : ""}</p>
            <p className='hover:bg-ocean hover:text-white'>{email ? email : ""}</p>
            <p className='hover:bg-ocean hover:text-white'>{phone_number ? phone_number: ""}</p>
            <p>{description ? description : ""}</p>

            </div>

        </div>
    )
}

export default Contact