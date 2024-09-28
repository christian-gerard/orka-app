

function Accounts() {

    const renderAccounts = () => {
        return <h1>RENDER ACCOUNTS HERE</h1>
    }

    return(
        <div className='h-full w-full bg-ocean '>
            <div>
                <p className='text-3xl'>Account Selection</p>
                <p></p>
            </div>

            <div>
                {
                    renderAccounts()
                }
            </div>

        </div>
    )
}

export default Accounts