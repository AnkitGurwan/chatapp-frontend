import React, { useContext , useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";


const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [effect, setEffect] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
});

  const onChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const registerSubmitHandler = async (event) => {
    setEffect(true);
    event.preventDefault();
    const x = await registerUser(user.userName,user.email,user.password,user.confirmPassword);
  
    if(x === 201){
      setEffect(false);
      toast.success('Registered Successfully', {
      position: toast.POSITION.TOP_CENTER
    });
      Navigate('/setavatar');
      setUser({userName:"", email:"", password:"" , confirmPassword:""});  
    }
    else if(x === 400){
      setEffect(false);
      toast.error('Email already exists.', {
      position: toast.POSITION.TOP_CENTER
    });
    }
    else if(x === 401){
      setEffect(false);
      toast.error('Username already exists.', {
      position: toast.POSITION.TOP_CENTER
    }); 
    }
    else {
      setEffect(false);
      toast.error('Cannot Register at the moment.', {
      position: toast.POSITION.TOP_CENTER
    });
    }
  }
  return (
    <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
      <div className='py-8 w-4/5 md:w-1/3 px-10 bg-gray-900 rounded-lg'>
        <div className='text-white pl-1 flex flex-col'>
          <div className='flex items-center mb-4'>
            <img className='w-12 h-12 mr-3' src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/7f913a147340051.62c08f2907fd7.png" alt='logo'/>
            <div className='text-3xl font-bold'>Snappy</div>
          </div>
        </div>
        <form className='bg-gray-900 py-3' onSubmit={registerSubmitHandler}>
          <div className='py-2 w-full'>
            <input type='text' className='w-full h-10 px-3 rounded-md text-sm text-white capitalize outline-0 bg-gray-800 border-2 border-blue-600' autoFocus required autoComplete='off' name='userName' placeholder='Username' value={user.userName} onChange={onChangeHandler}/>
          </div>
          <div className='py-2'>
            <input type='email' className='w-full h-10 px-3 rounded-md text-sm text-white outline-0 bg-gray-800 border-2 border-blue-600' required name='email' placeholder='Email' value={user.email} onChange={onChangeHandler}/>
          </div>
          <div className='py-2'>
            <input type='password' className='w-full h-10 px-3 rounded-md text-sm text-white outline-0 bg-gray-800 border-2 border-blue-600' required name='password' placeholder='Password' value={user.password} onChange={onChangeHandler}/>
          </div>
          <div className='py-2'>
            <input type='password' className='w-full h-10 px-3 rounded-md text-sm text-white outline-0 bg-gray-800 border-2 border-blue-600' required name='confirmPassword' value={user.confirmPassword} placeholder='Confirm Password' onChange={onChangeHandler}/>
          </div>
          {effect?<div className='flex justify-center items-center mt-4 mb-1 h-10 rounded-md bg-violet-600'><Spinner/><div className='text-white mx-2'>Loading..</div></div>:<button type='submit' className='bg-violet-600 text-white w-full rounded-sm h-10 mt-4 mb-1 text-center text-md font-bold'>Register</button>}
        </form>
        <div className='text-white text-sm font-medium mt-2 flex px-2 items-center'>
          <div className='pr-2'>Already have an account ?</div><Link to={`/`} className='text-blue-500 text-lg'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register;