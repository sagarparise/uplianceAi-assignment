import React, { useState } from 'react'
import './login.scss'
import { Form, Input, Button } from "antd";
import login from '../.././assets/login.png'
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
function LoginForm() {
  const navigate = useNavigate()
 const[loading, setLoading] = useState(false)

  const handleLogin = async(val) => {
    setLoading(true)
    const email = val.email;
    const password = val.password;
    if(!email || !password) {
      toast.warning("All fields are necessary", {
        position: "top-right",
      });
      setLoading(false)
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!", {
        position: "top-right",
      });
      setLoading(false)
      navigate('/dashboard');
    } catch (error) {
      setLoading(false)
      toast.error(`${error}`, {
        position: "top-right",
      });
    }
   
  };
  return (
    <div className='login-container'>
    
      
    <div className="login-form-container">
   <Form layout="vertical" className='forms' onFinish={handleLogin}>
   <div className="head flex justify-center items-center flex-col gap-4">
              <img src={login} alt="" className=" w-12" />
            <p>
           Login on <span>Upliance.ai</span>
            </p>
            </div>
    

     <Form.Item
       label="Email"
       name="email"
       
     >
       <Input type="email" placeholder="JohnDoe@gmail.com"  variant="borderless"/>
     </Form.Item>

     <Form.Item
       label="Password"
       name="password"
   
     >
       <Input.Password type="password" placeholder="Example@123" variant="borderless"/>
     </Form.Item>
     
     <Button htmlType='submit' type="primary" className="btn" block loading={loading} disabled={loading}>Submit</Button>

   </Form>
   <div className="btn-container">
       <p> Don't Have An Account ? <span className="click" onClick={()=> navigate('/')}>Click Here</span></p>
    </div>
 </div>
 </div>
  )
}

export default LoginForm