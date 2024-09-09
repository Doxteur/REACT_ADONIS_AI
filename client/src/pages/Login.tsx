import { PrettyLogin } from '@/components/pretty-login'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

function Login() {
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    console.log("JD",user);
  }, [user])

  return (
    <div>
      <PrettyLogin />
    </div>
  )
}

export default Login
