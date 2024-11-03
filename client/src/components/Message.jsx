import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Message({user, time_sent, message, user_name}) {
    const { user: currentUser } = useContext(UserContext)
    const outgoing = user === currentUser.id


    function formatDate(isoString) {
        const date = new Date(isoString);

        // Get month and day, and format them as MM-DD
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Get hours and minutes
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Determine AM or PM
        const amPm = hours >= 12 ? 'pm' : 'am';

        // Convert 24-hour time to 12-hour time
        hours = hours % 12 || 12;

        // Format as "MM-DD HH:MM am/pm"
        return `${month}-${day} ${hours}:${minutes} ${amPm}`;
    }

    return(
        <div className={`p-2 flex ${outgoing ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${outgoing && 'items-end'}`}>
                <p>{user_name}</p>
                <div className={`${outgoing ? 'bg-ocean text-white' : 'bg-white'} border`}>
                    <p className='p-1 flex flex-wrap truncate'>{message}</p>
                </div>
                <p className={`text-xs`}>{formatDate(time_sent)}</p>
            </div>
        </div>
    )
}

export default Message