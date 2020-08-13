import { useState } from 'react'

export const useRollingArray = (maxLength: number) => {
  const [arr, setArr] = useState<any>([])
  return [
    arr,
    // Function to add a new student
    (student: any) => {
      // We can't mutate the state, so we must return a new array.
      // [student, ...arr] adds the new student to the front, and
      // slice(0, length) pops any extras off the end
      setArr([student, ...arr].slice(0, maxLength))
    },
  ]
}
