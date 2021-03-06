import { useState } from 'react'

export const useCheckBox = (initialList: any[]) => {
  const [list, setList] = useState<any[]>(initialList)

  const handleChange = (e: any) => {
    const eventValue = e.target.value
    const periodIndex = list.findIndex((i) => i === eventValue)

    if (periodIndex > -1) {
      setList((list) => [
        ...list.slice(0, periodIndex),
        ...list.slice(periodIndex + 1),
      ])
    } else {
      setList((list) => [...list, eventValue])
    }
  }

  const resetList = () => setList([])

  return [list, handleChange, resetList] as const
}
