import { createContext, useContext } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/client'

import { FullpageSpinner } from '../components/spinner'

const UserContext = createContext()

export function UserProvider(props) {
  const [session, loading] = useSession()

  if (loading) {
    return <FullpageSpinner h="100vh" />
  }

  if (!loading && !session && Router.pathname !== '/login') {
    Router.replace('/login')
    return null
  }

  return <UserContext.Provider {...props} value={{ user: session?.user }} />
}

export function useUser() {
  return useContext(UserContext)
}
