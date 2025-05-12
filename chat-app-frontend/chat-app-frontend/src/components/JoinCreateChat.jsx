import React from 'react'
import chatIcon from '../assets/chat.png'

const JoinCreateChat = () => {
  return (
    <div className='min-h-screen flex items-center justify-center border'>
        
    <div className='flex flex-col gap-5 border p-10 w-full max-w-md rounded bg-gray-700 shadow-lg'>
        <div>
            <img src={chatIcon} alt="chatIcon" className='w-24 mx-auto' />
        </div>
        <h1 className='text-2xl font-semibold text-center '>Join Room / Create Room</h1>
   {/* for Name */}
        <div>
            <label htmlFor="name" className='block font-medium mb-2'>Your Name</label>
            <input type="text" id='name' placeholder='Enter Your Name' 
            className='w-full px-4 py-2 border dark:bg-gray-600 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus::ring-blue-500' />
        </div>

         {/* for Room ID */}
         <div>
            <label htmlFor="roomId" className='block font-medium mb-2'>Your Room Id / New Room Id</label>
            <input type="text" id='roomId' placeholder='Enter Your Room Id' 
            className='w-full px-4 py-2 border dark:bg-gray-600 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* Button  */}
        <div className='flex gap-4 item-center justify-center m-4'>
        <button className='py-2 px-4 dark:border-gray-600 dark:bg-blue-600 hover:dark:bg-blue-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500' >Join Room</button>

            <button className='py-2 px-4 dark:border-gray-600 dark:bg-orange-600 hover:dark:bg-orange-800 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500' >Create Room</button>
        </div>
    </div>

    </div>
  )
}

export default JoinCreateChat