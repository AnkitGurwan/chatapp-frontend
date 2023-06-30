import React from 'react';
import Contacts from '../components/contacts';
import ChatContainer from '../components/chatContainer';


const Chat = () => {
  return (
    <div className='bg-gray-800 h-full w-full flex items-center'>
      <div className='bg-gray-900 w-full h-full md:h-4/5 mx-0 md:mx-12 rounded-md flex'>
        <div className='w-1/4'>
          <div className='w-full text-white h-20 flex flex-col md:flex-row items-center justify-center md:justify-start pt-3 pb-3 pl-4 md:pl-8'>
            <img className='w-9 md:w-12 h-9 md:h-12 ml-3 md:ml-0 mr-3 ' src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/7f913a147340051.62c08f2907fd7.png" alt='logo'/>
            <div className='text-lg md:text-2xl font-bold '>Snappy</div></div>
          <div className='w-full'><Contacts/></div>
        </div>
        
        <div className="w-3/4 bg-black">
          <ChatContainer/>
        </div>
      </div>
    </div>
  )
}

export default Chat