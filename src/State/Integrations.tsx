import { createContext, FC, useState, PropsWithChildren } from 'react'
import { IntegrationStatus } from '../Common/integrations'

export type IntegrationManagerContextType = {
  integrationStatus: IntegrationStatus
  updateIntegration: (integrationStatus: IntegrationStatus) => void
}

export const IntegrationManagerContext = createContext<IntegrationManagerContextType>({} as IntegrationManagerContextType)

export const IntegrationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [integrationStatus, setIntegration] = useState<IntegrationStatus>({ Xero: { connected: false }, myob: { connected: false }, qb: { connected: false } } as IntegrationStatus)
  const updateIntegration = (payload: IntegrationStatus) => {
    console.log('new Integration here', payload)
    setIntegration({ ...payload })
  }

  return (
    <IntegrationManagerContext.Provider
      value={{
        integrationStatus,
        updateIntegration,
      }}
    >
      {children}
    </IntegrationManagerContext.Provider>
  )
}
