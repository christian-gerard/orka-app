

function Contact({id, first_name, last_name, email, phone_number, role, description, client}) {

    return (
        <div className='h-[150px] w-[300px] flex flex-col border'>
            <div className='px-2'>
                <p>{first_name ? first_name: "NONE"}</p>
            </div>

            <div className='px-2'>

            </div>

        </div>
    )
}

export default Contact