import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'

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
  selectAmount,
}) => {
  const [selectCounter, setSelectCounter] = useState(0)
  return (
    <div>
      <div>Protocols</div>
      <div>
        {protocolList.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              if (selectCounter < selectAmount) {
                setProtocolSelectList([...protocolSelectList, item])
                setSelectCounter(selectCounter + 1)
              }
              if (selectCounter === selectAmount && selectAmount === 1) {
                setProtocolSelectList([item])
              }
            }}
          >
            {item.task}
          </div>
        ))}
      </div>
    </div>
  )
}
