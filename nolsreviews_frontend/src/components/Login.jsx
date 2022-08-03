import React from 'react';
import { GoogleLogin, googleLogout} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client.js';


const Login = () => {
  const navigate = useNavigate();
  const Credentialresponse = (response)=>{
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl} = response.profileObj;

    const doc = { 
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true });
      }
      );
    
    };
  return (
    //background
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
        src={shareVideo}
        type="video/mp4"
        Loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2x1">
          <div>
            {/* {user ? (
              <div>Logged In</div>
              ) : ( */}
                <GoogleLogin
                onSuccess={Credentialresponse => {
               console.log(Credentialresponse);
                }}
               onError={() => {
              console.log('Login Failed')
               }}
                />
              {/* )
            } */}
          </div>
          </div>
        </div>
        </div>         
    </div>
  )
}

export default Login