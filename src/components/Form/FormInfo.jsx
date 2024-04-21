
import React, { useState } from "react";
import './form.scss'
import { Form, Input, Button, InputNumber,Select } from "antd";
import login from '../.././assets/login.png'
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth, db } from "../../firebase";
import {doc, setDoc} from 'firebase/firestore'
function FormInfo() {
  const navigate = useNavigate()
 const[loading, setLoading]= useState(false)
  const selectBefore = (
    <Select
      defaultValue="add"
      style={{
        width: 70,
      }}
    >
      <Option value="add">+91</Option>
     
    </Select>
  );

  const handleForm = async (val)=>{
    setLoading(true)

    const name = val.fullName;
    const email = val.email;
    const phone = val.number;
    const password = val.password;
    const address = val.address;

    if(!val.fullName || !val.email || !val.address || !val.number || !val.password)
    {
      toast.warning("All fields are necessary", {
        position: "top-right",
      });
      setLoading(false)

      return;
    }
   console.log(name, email, password,phone, address)

    try {
      const result= await createUserWithEmailAndPassword(auth,email, password)
      const user = result.user;
      console.log(user)

      await updateProfile(user, {
        displayName: name,
        phoneNumber: phone,
      
      })

      //create a doc with userId

      const docRef = doc(db, 'users',user.uid);

      const data = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        uid: user.uid
      }

      setDoc(docRef, data);

      toast.success("Logged in successfully!", {
        position: "top-right",
      });
      setLoading(false);
      navigate('/dashboard')

    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error(`${error}`, {
        position: "top-right",
      });
    }


   
  }

  return (
    <div className="main-container">
        <div className="form-container">
          <Form layout="vertical" onFinish={handleForm}>
            <div className="head flex justify-center items-center flex-col gap-4">
              <img src={login} alt="" className=" w-12" />
            <p>
            Sign Up on <span>Upliance.ai</span>
            </p>
            </div>
            <Form.Item label="Full Name" name="fullName">
              <Input type="text" placeholder="John Doe" variant="borderless" />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input type="text" placeholder="Address" variant="borderless" />
            </Form.Item>

            <Form.Item label="Email Id" name="email">
              <Input
                type="email"
                placeholder="JohnDoe@gmail.com"
                variant="borderless"
              />
            </Form.Item>
            <Form.Item label="Phone Number" name="number">
              <InputNumber         
                placeholder="Phone Number"
                variant="borderless"
                maxLength={10}
                addonBefore={selectBefore}
              />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password
                type="password"
                placeholder="Example@123"
                variant="borderless"
              />
            </Form.Item>
            <Button
              type="primary"
                htmlType="submit"
              className="btn"
              block
              loading={loading}
              disabled={loading}
            
            >
              
            Submit
            </Button>
          </Form>

          <div className="btn-container">
            <p>
             Have An Account Already?{" "}
              <span className="click" onClick={() => navigate("/login")}>
                Click Here
              </span>
            </p>
          </div>
        </div>
      </div>
  )
}

export default FormInfo