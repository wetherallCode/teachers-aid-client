import { useState } from 'react'

export const useCheckBox = () => {
  const [list, setList] = useState<string[]>([])

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
  return [list, handleChange] as const
}
