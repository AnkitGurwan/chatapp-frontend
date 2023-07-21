import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";
import _ from 'lodash';
import { useSelector } from 'react-redux';

const Register = () => {
    const { loginUser } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [effect, setEffect] = useState(false);
    
    const [user, setUser] = useState({
      userName: "",
      password: ""
  });

    const getItem = async () => {
      await loginUser("user@gmail.incom","password12");

    }
    useEffect(()=>{
      getItem();
    },[])

  const onChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const loginSubmitHandler = async (event) => {
    setEffect(true);
    event.preventDefault();
    const x = await loginUser(_(user.userName),user.password);
  
    if(x === 200){
      setEffect(false);
      toast.success('Login Success', {
      position: toast.POSITION.TOP_CENTER
    });
    
      if(localStorage.getItem("isAvatarSet"))
        Navigate('/chat');
      else Navigate('/setavatar');

      setUser({userName:"",password:""});  
    }
    else if(x === 402){
      setEffect(false);
      toast.error('User does not exist.', {
      position: toast.POSITION.TOP_CENTER
    });
    }
    else {
      setEffect(false);
      toast.error('Invalid creadentials.', {
      position: toast.POSITION.TOP_CENTER
    });
    }
  }

  return (
    <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
      <div className='py-8 w-3/4 md:w-1/4 px-8 bg-gray-900 rounded-lg'>
        <div className='text-white pl-1 flex flex-col'>
          <div className='flex items-center mb-4'>
            <img className='w-12 h-12 mr-3' src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/7f913a147340051.62c08f2907fd7.png" alt='logo'/>
            <div className='text-3xl font-bold'>Snappy</div>
          </div>
        </div>
        <form className='bg-gray-900 py-3' onSubmit={loginSubmitHandler}>
          <div className='py-2 w-full'>
            <input type='text' className='w-full h-10 px-3 rounded-md text-sm text-white capitalize outline-0 bg-gray-800 border-2 border-blue-600' autoFocus required autoComplete='off' name='userName' placeholder='Username' value={user.userName} onChange={onChangeHandler}/>
          </div>
          <div className='py-2'>
            <input type='password' className='w-full h-10 px-3 rounded-md text-sm text-white outline-0 bg-gray-800 border-2 border-blue-600' required name='password' placeholder='Password' value={user.password} onChange={onChangeHandler}/>
          </div>
          
          {effect?<div className='flex justify-center items-center mt-4 mb-1 h-10 rounded-md bg-violet-600'><Spinner/><div className='text-white mx-2'>Loading..</div></div>:<button type='submit' className='bg-violet-600 text-white w-full rounded-sm h-10 mt-4 mb-1 text-center text-md font-bold'>Login</button>}
        </form>
        <div className='text-white text-sm font-medium mt-2 flex px-2 items-center'>
          <div className='pr-2'>Does not have an account ?</div><Link to={`/register`} className='text-blue-500 text-lg'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Register