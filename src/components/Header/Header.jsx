import React from 'react'
import { Tooltip } from 'antd'
import {LogoutOutlined} from '@ant-design/icons'
import { auth } from '../../firebase';
import {signOut} from 'firebase/auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Header() {

 const navigate = useNavigate()

 const logoutUser = async()=>{
  try {
    await signOut(auth);
    navigate('/login');
    toast.success('Logged out successfully',{
      position: "top-right",
    });
  } catch (error) {
    toast.error( `${error.message}` ,{
      position: "top-right",
    });
  }
 }
  return (
    <div className=' w-full h-14 bg-[--blue] px-6 flex justify-between items-center'>
      <h2 className=' font-semibold text-2xl text-[--white]'>Upliance.Ai</h2>
     <Tooltip title='Logout'>
     <div className=' p-2 text-2xl text-[--white] rounded-full hover:cursor-pointer'onClick={logoutUser} >
     <LogoutOutlined />
     </div>
     </Tooltip>
    </div>
  )
}

export default Header