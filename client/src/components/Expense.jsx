
function Expense() {

    return(
        <div className='text-lg w-full h-[100px] flex flex-row border-b-[0.2px]'>
            <div className='w-[80%] border'>
                <p>Description of the expense</p>
            </div>

            <div className='w-[20%] border'>
                <p>$32,000.00</p>
            </div>

        </div>
    )
}

export default Expense