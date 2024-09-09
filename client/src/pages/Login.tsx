import { PrettyLogin } from '@/components/pretty-login'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

function Login() {

  return (
    <div>
      <PrettyLogin />
    </div>
  )
}

export default Login
