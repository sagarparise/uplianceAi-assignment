import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import login from "../.././assets/login.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
function DashPage() {
  const [user] = useAuthState(auth);
  const[loading, setLoading] = useState(false)
  const [profileInfo, setProfileInfo] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    userData();
  }, [user]);


console.log(user)


  const userData = async () => {
  if(user){
    setLoading(true)
    try {
      const docRef = doc(db, "users", user.uid);
      const currUser = await getDoc(docRef);
      console.log(currUser);
      if (currUser.exists()) {
        console.log(currUser.data());
        setProfileInfo(currUser.data());
        setLoading(false)
      }  
     } catch (error) {
       setLoading(false)
      toast.error(`${error}`, {
        position: "top-right",
      });
     }
  }
  };


  if(!user){
    navigate('/')
  }
  return (
    <div className="w-full h-screen bg-slate-100">
      <Header />
     {
      loading ? <>
      <Spin fullscreen />
      </> : <>
       <div className="p-10 flex justify-center items-center">
        {profileInfo && (
          <div className="card w-[350px] h-[400px] p-4 rounded-lg shadow-md border flex justify-start items-center flex-col">
            <img src={login} className="w-14" alt="" />
            <h1 className=" py-3 font-semibold uppercase text-xl">
              {profileInfo.name}
            </h1>
            <div className=" flex flex-col gap-1 ">
              <div className=" flex items-center gap-2">
                <h2 className=" py-3 font-semibold text-md w-[85px] flex justify-between">Email <span>:</span> </h2>
                <p className=" flex-1">{profileInfo.email}</p>
              </div>

              <div className=" flex items-center gap-2">
                <h2 className=" py-3 font-semibold text-md w-[85px] flex justify-between">Phone No <span>:</span></h2>
                <p className=" flex-1">{profileInfo.phone}</p>
              </div>

              <div className=" flex items-center gap-2">
                <h2 className=" py-3 font-semibold text-md w-[85px] flex justify-between">Address <span>:</span></h2>
                <p className=" flex-1">{profileInfo.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </>
     }
    </div>
  );
}

export default DashPage;
 