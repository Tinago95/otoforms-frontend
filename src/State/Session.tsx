import { createContext, FC, useState, PropsWithChildren } from 'react'
import { Session } from '../Common/session'

export type SessionManagerContextType = {
  session: Session
  updateSession: (session: Session) => void
}

export const SessionManagerContext = createContext<SessionManagerContextType>({} as SessionManagerContextType)

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session>({} as Session)

  const updateSession = (payload: Session) => {
    console.log('new Session here', payload)
    setSession({ ...payload })
  }

  return (
    <SessionManagerContext.Provider
      value={{
        session,
        updateSession,
      }}
    >
      {children}
    </SessionManagerContext.Provider>
  )
}
