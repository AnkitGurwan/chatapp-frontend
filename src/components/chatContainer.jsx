import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmojiPicker from 'emoji-picker-react';
import AuthContext from '../context/AuthContext';
import Robot from '../assets/robot.gif';
import { io } from "socket.io-client";
import { setAllChats } from '../state';
import './styles.css';
// require('dotenv').config()


const ChatContainer = () => {
    const { addMessage , getMessages } = useContext(AuthContext);
    const scrollRef = useRef();
    const friend = useSelector((state) => state.user.chat);
    const allChats = useSelector((state) => state.user.allChats);
    const Navigate = useNavigate();
    const [showEmojis, setShowEmojis] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [chat, setChat] = useState('');
    const socket = useRef();
    const dispatch = useDispatch();

    const onChangeHandler = (event) => {
        setChat(event.target.value);
      }
   

    const getItem = async () =>{
        if(friend)
        await getMessages(localStorage.getItem('_id'),friend._id);
        
    }

    useEffect(()=>{
        getItem();
        if(localStorage.getItem('_id')) setCurrentUser(true);
    },[]);

    useEffect(() => {
        const host = process.env.REACT_APP_HOST;
        if (currentUser) {
          socket.current = io(host);
          socket.current.emit("add-user", localStorage.getItem('_id'));
        }
      }, [currentUser]);

      useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
      }, [socket.current]);
    
      useEffect(() => {
        if(arrivalMessage)
        {
            const msgs = [...allChats];
            msgs.push(arrivalMessage);

            dispatch(setAllChats(msgs));
        }
        }, [arrivalMessage]);


      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [allChats]);


    const logOutHandler = async (event) => {
        event.preventDefault();
        localStorage.clear('isAvatarSet','_id');
        Navigate('/');

        toast.success('Logged Out Successfully.', {
        position: toast.POSITION.TOP_CENTER
    });
}

    const submitHandler = async (event) => {
        event.preventDefault();
        if(chat.length > 0)
        {
            await addMessage(localStorage.getItem('_id'),friend._id,chat);
        
            socket.current.emit("send-msg", {
                to: friend._id,
                from: localStorage.getItem('_id'),
                message:chat,
            });
        
            const msgs = [...allChats];
            msgs.push({ fromSelf: true, message: chat });
            dispatch(setAllChats(msgs));
            setChat('');  
        }      
    }

    const showEmojisFunc = async (event) => {
        event.preventDefault();
        setShowEmojis(!showEmojis);
        if(window.onclick && showEmojis)
            setShowEmojis(false);
    }

    
  return (
    <div>
        <div className='text-white w-full h-full'>
            <div className='flex h-1/5'>
                {friend?<div className='text-white flex pl-4 md:pl-8 py-1 '>
                    <img className='w-12 h-12 rounded-full p-1' src={friend.avatarPicture} alt='avatar'/>
                    <div className='flex justify-start items-center w-full font-bold text-lg capitalize mx-2 md:mx-4'>{friend?friend.userName:""}</div>
                </div>:""}
                <div className='flex justify-center absolute right-0 md:right-12 w-16 items-center p-3 font-semibold text-red-600 md:text-red-800 hover:text-red-600
                 cursor-pointer' onClick={logOutHandler}>
                    <span class="material-symbols-outlined font-bold text-3xl">
                    logout
                    </span>
                </div>
            </div>
            <hr/>
            
            
            <div className={" " + (friend?"container":"h-96 overflow-y-hidden mt-16")}>
                {allChats && friend? 
                allChats.map((chatInd,index)=>
                chatInd.fromSelf
                ?
                <div className='text-white flex justify-end ' ref={scrollRef} key={uuidv4()}>
                    <div className='bg-blue-900 py-1 md:py-2 px-3 md:px-4 flex justify-center items-center rounded-md md:rounded-lg my-2 md:my-1 mr-3 md:mr-4'>{chatInd.message}</div></div>
                :
                <div className='text-white flex justify-start ' ref={scrollRef} key={uuidv4()}><div className='bg-violet-900  py-1 md:py-2 px-3 md:px-4 flex justify-center items-center rounded-md md:rounded-lg my-2 md:my-1 ml-3 md:ml-4'>{chatInd.message}</div></div>
                )
                :
                <div className='flex h-full justify-center items-center text-white m-8'><img src={Robot} alt='Robot'/></div>}
            </div>

            {friend?<form onSubmit={submitHandler} className='absolute bottom-4 md:bottom-16 w-3/4 md:w-full flex items-center py-1 pl-2 md:pl-16'>
                <div className='p-1 text-2xl cursor-pointer' onClick={showEmojisFunc}>😆</div>
                <div className='w-full h-10 flex pl-1 md:pl-4'>
                    <input className='w-3/4 md:w-1/2 h-full rounded-l-full text-white bg-gray-600 outline-0 px-4 md:px-6 py-1 border-0' 
                    type='text' autoFocus value={chat} name='chat' placeholder='Type your message here..'
                     onChange={onChangeHandler}/>
                    <button type='submit' className='bg-violet-600 hover:bg-violet-700 w-12 md:w-24 h-10 cursor-pointer rounded-r-full flex justify-center items-center'>
                    <span class="material-symbols-outlined">
                    send
                    </span>
                    </button>
                </div>
                
            </form>:""}
            {showEmojis?<div className='fixed bottom-20 md:bottom-4 left-4 md:left-36 '>
                <EmojiPicker width={250} height={350} 
                onEmojiClick={(emojiObject)=> setChat((prevMsg)=> prevMsg + emojiObject.emoji)}/>
            </div>:""}
        
        </div>
    </div>
  )
}

export default ChatContainer