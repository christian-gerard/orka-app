
function Expense({id, description, amount, note, project, status, type}) {

    return(
        <div className='text-lg w-full flex flex-row border-b-[0.2px]'>

            <div className='w-[80%] border-r-[0.2px] flex flex-row justify-between'>
                <div>
                    <p>{description}</p>
                </div>

                <div className='flex flex-row'>
                    <p className='bg-gray text- mr-2'>{status}</p>
                    <p className='mr-2 bg-ocean text-white'>{type}</p>
                </div>
            </div>
            <div className='w-[20%]'>
                <p>${amount}</p>
            </div>

        </div>
    )
}

export default Expense