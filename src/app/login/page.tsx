"use client"
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      router.push('/profile');
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true);
    }
  }, [user])
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <label htmlFor="email">Email</label>
      <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email" id='email' value={user.email} onChange={(event) => setUser({
          ...user,
          email :event.target.value
        })
      }
      placeholder='email'
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password" id='password' value={user.password} onChange={(event) => setUser({
          ...user,
          password :event.target.value
        })
      }
      placeholder='password'
      />
      <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No Login" : "Login"}</button>
      <Link href={'/signup'}>Visit signUp Page</Link>
    </div>
  )
}

export default LoginPage