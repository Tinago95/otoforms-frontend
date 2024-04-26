import { createContext, FC, useState, PropsWithChildren } from 'react'
import { IEmployee } from '../Common/person'
import { IShiftsTableSchema } from '../Common/shiftmanager'

export type ShiftManagerContextType = {
  shifts: IShiftsTableSchema[]
  deleteItem: (itemId: string) => void
  createItem: (payload: IShiftsTableSchema) => void
  updateShifts: (payload: IShiftsTableSchema[]) => void
}
export type AllocationType = {
  status: 'allocated' | 'unallocated' | 'unavailable'
  employee: IEmployee
}
export const ShiftManagerContext = createContext<ShiftManagerContextType>({} as ShiftManagerContextType)

export const ShiftsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [shifts, setShifts] = useState<IShiftsTableSchema[]>([])

  const createItem = async (payload: IShiftsTableSchema) => {
    setShifts([...shifts, payload])
    console.log('items->', shifts)
  }
  const deleteItem = async (itemId: string) => {
    const subList = shifts.filter((item) => {
      return item.itemId !== itemId
    })
    setShifts([...subList])
  }

  const updateShifts = (payload: IShiftsTableSchema[]) => {
    console.log('payload', payload)
    setShifts([...payload])
  }

  return (
    <ShiftManagerContext.Provider
      value={{
        updateShifts,
        deleteItem,
        createItem,
        shifts,
      }}
    >
      {children}
    </ShiftManagerContext.Provider>
  )
}
