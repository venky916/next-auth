'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter,usePathname,useSearchParams } from 'next/navigation'
import Link from 'next/link';

function VerifyEmailPage() {
    // const router = useRouter();
    const searchParam:any = useSearchParams();
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {

        try {
             await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(false);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
        
        // console.log(searchParam);
        // // const { query} = searchParam.get("token") ;
        // const urlToken:any = searchParam.get("token");
        // setToken(urlToken) 
        
    }, [])
    
    useEffect(() => {
        setError(false);
        if (token?.length > 0) {
            verifyUserEmail();
        }
    },[token])


  return (
      <div className='flex flex-col items-center justify-center min-h-screen '>
          <h1 className='text-4xl'>Verify Email</h1>
          <h2 className='p-2 bg-orange-400 text-black'>{token ? `${token}` : "No Token"}</h2>
          {verified && (
              <div>
                  <h2>Verified</h2>
                  <Link href={'/login'}>Login</Link>
              </div>
          )}
          {error && (
              <div>
                  <h2>Error</h2>
              </div>
          )}
    </div>
  )
}

export default VerifyEmailPage