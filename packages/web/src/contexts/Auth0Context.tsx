import {useAuth0} from '@auth0/auth0-react'
import React from 'react'

interface AuthProviderProps {
  children?: string
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const {isLoading} = useAuth0()
  return <>{children}</>
}
