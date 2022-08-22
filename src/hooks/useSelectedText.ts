import { useState } from 'react'

export const useSelectedText = () => {
  const [text, setText] = useState('')
  // make text null at init

  const select = () => {
    const selected = window.getSelection() as Selection
    console.log(selected)
    setText(selected.toString())
  }
  const reset = () => {
    window.getSelection()?.empty()
    window.getSelection()?.removeAllRanges()
    setText('')
  }

  const disable = () => null
  return [select, text, reset, disable] as const
}
