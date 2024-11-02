import { useState } from 'react'

function Message({outgoing, user, message}) {

    return(
        <div className={`p-2 flex ${outgoing ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${outgoing && 'items-end'}`}>
                <p>User Name</p>
                <div className={`${outgoing ? 'bg-ocean text-white' : 'bg-white'} border`}>
                    <p className='p-1 flex flex-wrap truncate'>{message}</p>
                </div>
                <p className={`text-xs`}>time stamp</p>
            </div>
        </div>
    )
}

export default Message