import { useState } from 'react'

export const useOnOff = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue)

  const on = () => setValue((c) => c === true)
  const off = () => setValue((c) => c === false)

  return [value, on, off] as const
}
