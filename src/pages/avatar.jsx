import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { useSelector } from "react-redux";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";


const Register = () => {
    const {setAvatar} = useContext(AuthContext);
    const Navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [click, setClick] = useState(true);
    const user = useSelector((state) => state.user.user);


    useEffect(() => {
        if(user)
        {
            const data = [];
            for (let i = 0; i < 4; i++) {
            data.push(`https://api.multiavatar.com/${Math.round(Math.random()*20)}.png`);
            }
            setAvatars(data);
            setLoading(false);
        }
        else 
        {
            Navigate('/');
            toast.error('Please login to set Avatar.', {
                position: toast.POSITION.TOP_CENTER
            });
        } 
      },[]);

    const clickHandler = async (event) => {
        event.preventDefault();
       
            const selectedAvatar = event.target.src;
            event.target.classList.add('scale-110')
            event.target.classList.add('bg-green-600')
            event.target.classList.add('p-2')
            event.target.classList.add('rounded');
            toast.success('Avatar selected successfully.', {
                position: toast.POSITION.TOP_CENTER
            });
            setClick(false);  

            await (setAvatar(user.userName,selectedAvatar));
            setTimeout(()=> {
                Navigate('/chat');
            }, 2000); 
    }

    const clic2 = () =>{}
   
    
    return (
        <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
            <div className='mb-24'>
                <div className='text-white text-2xl md:text-4xl text-bold px-4 md:px-0 py-8'>Please select an Avatar :</div>
                <div className='flex'>
                {avatars.map((avatarUrl, index) => {
                return (
                    <img
                    key={index}
                        className='h-16 md:h-28 w-16 md:w-28 m-3 md:m-4 cursor-pointer hover:scale-110'
                        src={avatarUrl}
                        alt="avatar"
                        onClick={click?clickHandler:clic2}
                    />
              );
            })}
                </div>
            </div>
        </div>
  )
}

export default Register;