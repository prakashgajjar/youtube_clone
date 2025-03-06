import React, { useEffect } from 'react'
import axios from 'axios'
import { useAppContext } from '../../Hooks/AppContext'
const AuthUser = () => {
    const getUserAuth = async ()=>{

        try {
            const responce = await axios.get('http://localhost:3000/auth/user',{
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if(responce.status === 200) {
                setAuth(true);
                setUserDetail(responce.data.user);
            }else{
                console.error('Error fetching user', responce.message)
            }
        } catch (error) {
            console.error(error);
        }

    }
    const {setAuth , setUserDetail} = useAppContext();
    useEffect(()=>{
        getUserAuth()
    },[])
  return (
    <div></div>
  )
}

export default AuthUser