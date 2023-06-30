import React , { useState } from "react";
import AuthContext from "./AuthContext";
import { useDispatch } from "react-redux";
import { setLogin , setAllUsers , setOwner, setAllChats } from "../state";


const AuthState = (props) => {

    const url = "https://chatapp-xxrn.onrender.com";
    const dispatch = useDispatch();


    const loginUser = async ( userName , password) => {
        const response = await fetch (`${url}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userName,password})
        });
        const json = await response.json();
        if(json.user)
        {
            localStorage.setItem("isAvatarSet",json.user.isAvatarSet);
            localStorage.setItem("_id",json.user._id);
        }
        dispatch(setLogin(json));
        
        return response.status;
    }

    const registerUser = async ( userName , email, password) => {
        const response = await fetch (`${url}/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userName,email,password})
        });
        const json = await response.json();
        dispatch(setLogin(json));
        if(json.user)
        {
            localStorage.setItem("isAvatarSet",json.user.isAvatarSet);
            localStorage.setItem("_id",json.user._id);
        }
        
        return response.status;
    }

    const setAvatar = async (userName,urlPicture) => {
        const response = await fetch (`${url}/user/setavatar`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userName,urlPicture})
        });
        const json = await response.json();
        
        return response.status;
    }

    const getAllUsers = async (id) => {
        const response = await fetch (`${url}/user/all/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const json = await response.json();
        dispatch(setAllUsers(json));
        
        return response.status;
    }

    const getOwner = async (id) => {
        const response = await fetch (`${url}/user/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const json = await response.json();
        dispatch(setOwner(json));
        
        return response.status;
    }

    const addMessage = async (from,to,message) => {
        const response = await fetch (`${url}/chat/addmsg`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ from , to , message})
        });

        const json = await response.json();
        
        return response.status;
    }

    const getMessages = async (from,to) => {
        const response = await fetch (`${url}/chat/getmsg`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ from , to})
        });
        const json = await response.json();   
        dispatch(setAllChats(json));     
        return response.status;
    }
    

return (<AuthContext.Provider value={{ loginUser,registerUser,setAvatar,getAllUsers,getOwner,addMessage,getMessages}}>
    {props.children}
</AuthContext.Provider>
)
}
export default AuthState;