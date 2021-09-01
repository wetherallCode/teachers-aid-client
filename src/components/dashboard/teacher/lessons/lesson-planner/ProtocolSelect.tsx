import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'
import {
  DuringActivityContainer,
  DuringActivityTitle,
  DuringActivityBody,
  DuringActivitySelection,
} from './state-and-styles/lessonPlannerStyles'

export type ProtocolSelectProps = {
  protocolList: TextSectionProtocolsInput[]
  protocolSelectList: TextSectionProtocolsInput[]
  setProtocolSelectList: Dispatch<SetStateAction<TextSectionProtocolsInput[]>>
  selectAmount: number
}

export const ProtocolSelect: FC<ProtocolSelectProps> = ({
  protocolList,
  setProtocolSelectList,
  protocolSelectList,
}) => {
  return (
    <DuringActivityContainer>
      <DuringActivityTitle>Select from these Protocols</DuringActivityTitle>
      <DuringActivityBody>
        {protocolList.map((item, i) => {
          const selected = protocolSelectList.some(
            (protocol) => protocol.task === item.task
          )

          return (
            <DuringActivitySelection
              key={i}
              selected={selected}
              onClick={() => {
                if (!selected) {
                  setProtocolSelectList([...protocolSelectList, item])
                }
                if (selected) {
                  const index = protocolSelectList.findIndex(
                    (items) => items.task === item.task
                  )
                  setProtocolSelectList([
                    ...protocolSelectList.slice(0, index),
                    ...protocolSelectList.slice(index + 1),
                  ])
                }
              }}
            >
              {item.task}
            </DuringActivitySelection>
          )
        })}
      </DuringActivityBody>
    </DuringActivityContainer>
  )
}
