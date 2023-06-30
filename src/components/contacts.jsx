import React, { useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from "../state";


const Contacts = () => {
  const { getAllUsers , getOwner , getMessages} = useContext(AuthContext);
  const usersAll = useSelector((state) => state.user.allUsers);
  const owner = useSelector((state) => state.user.owner);
  const dispatch = useDispatch();
  

  const getItem = async ()=>{
        await getAllUsers(localStorage.getItem("_id"));
        await getOwner(localStorage.getItem('_id'));
        console.log("usersall",owner);
  }

  useEffect(()=>{
    getItem();
  },[]);

  const clickHandler = async (e) => {
    e.preventDefault();
    const element=e.target.id;
    console.log("jjkk",element)
    console.log("jjk",usersAll[element])
    dispatch(setChat(usersAll[element]));
    if(element)
    await getMessages(localStorage.getItem('_id'),usersAll[element]._id);
    
  }

  return (
    <div className='my-2 ml-0 md:ml-2'>
      <div className='overflow-y-scroll h-96 md:h-72'>
        {usersAll.map((user,index)=>
        <div key={index} className='absolute text-white flex flex-col md:flex-row mx-2 mb-2 p-2 md:p-3 bg-gray-500 cursor-pointer hover:bg-gray-600'  onClick={clickHandler}>
            <img id={index} className='flex justify-center mx-auto w-10 h-10 rounded-full' name={index} src={user.avatarPicture} alt='avatar'/>
            <div id={index} className='flex justify-center md:justify-start items-center w-full text-center mt-2 md:mt-0 leading-4 font-medium md:font-semibold text-sm md:text-lg capitalize ml-0 md:ml-4' name={index}>{user.userName}</div>
            {user.isUserOnline?
            <div className='w-2 h-2 rounded-full bg-green-600 relative top-2 right-2'></div>
            :
            <div className='w-2 h-2 rounded-full bg-red-600 relative top-2 right-2'></div>
            }
        </div>      
        )}
      </div>
      <div className='text-white flex flex-col md:flex-row mt-12 md:mt-4 ml-0 md:ml-16 p-2 bg-violet-600'>
            <img className='w-12 h-12 md:h-12 rounded-full mx-auto md:ml-3' src={owner?owner.avatarPicture:""} alt='avatar'/>
            <div className='text-center md:text-start  md:ml-6 my-auto w-full font-bold text-xl capitalize leading-6'>{owner?owner.userName:""}</div>
      </div>
    </div>
  )
}

export default Contacts;