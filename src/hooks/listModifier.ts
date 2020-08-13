import { useState } from 'react'

export const useListModifier = (initialList: any[]) => {
  const [item, setItem] = useState<any>()
  const [list, setList] = useState(initialList)

  const deleteItem = (index: number) => {
    setList((list) => [...list.slice(0, index), ...list.slice(index + 1)])
  }

  const addItem = (item: any) => setItem(item)

  return [list, deleteItem, addItem]
}
