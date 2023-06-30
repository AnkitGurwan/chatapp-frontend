import React , { useState } from "react";
import AuthContext from "./AuthContext";
import { useDispatch } from "react-redux";
import { setLogin , setAllUsers , setOwner, setAllChats } from "../state";


const AuthState = (props) => {

    const url = "http://localhost:5000";
    const dispatch = useDispatch();
    const [specificPosts,setSpecificPosts]=useState([]);
    const [specificDetails,setSpecificDetails]=useState([]);


    const loginUser = async ( userName , password) => {
        const response = await fetch (`${url}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userName,password})
        });
        const json = await response.json();
        console.log("jsonn",json)
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
        console.log(json)
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
        console.log("j",json)
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
        console.log("jj",json)
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
        console.log("jj",json);
        
        return response.status;
    }

    const getMessages = async (from,to) => {
        console.log("a")
        const response = await fetch (`${url}/chat/getmsg`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ from , to})
        });
        console.log("b")
        const json = await response.json();   
        console.log("json",json)
        dispatch(setAllChats(json));     
        return response.status;
    }
    

return (<AuthContext.Provider value={{ loginUser,registerUser,setAvatar,getAllUsers,getOwner,addMessage,getMessages}}>
    {props.children}
</AuthContext.Provider>
)
}
export default AuthState;