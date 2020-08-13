import React, { FC } from 'react'
import { noon, evening, time, militaryTime } from '../../utils'

export type GreetingsProps = {
  phrase: string
}

export const Greetings: FC<GreetingsProps> = ({ phrase }) => {
  return (
    <>
      {Date.parse(time) < Date.parse(noon)
        ? 'Good Morning'
        : Date.parse(time) > Date.parse(evening)
        ? 'Good Evening'
        : 'Good Afternoon'}
      , {phrase}
    </>
  )
}
