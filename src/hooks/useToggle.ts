import { useState } from 'react'

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue((c) => (c = !c))
  }
  return [value, toggle] as const
}
