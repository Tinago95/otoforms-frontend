export interface IShiftsTableSchema {
  tenantId?: string
  itemId?: string
  status?: string
  timeStamp?: number
  location?: string
  startTime?: string
  finishTime?: string
  assignee?: Assignee
  organisation: string
  notes?: string
  date?: string
}

interface Assignee {
  id: string
  name: string
  surname: string
}
