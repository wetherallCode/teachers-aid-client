import React, { FC } from 'react'
import { ProtocolResponseClassList } from '../../teachers-aid/main-screen/protocol-response-classlist/ProtocolResponseClassList'

export type TasksProps = {}

export const Tasks: FC<TasksProps> = () => {
  return (
    <>
      <ProtocolResponseClassList />
    </>
  )
}
