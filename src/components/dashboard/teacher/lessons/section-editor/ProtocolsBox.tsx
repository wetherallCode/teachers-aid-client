import React, { FC, Dispatch, SetStateAction, useState, useEffect } from 'react'
import {
  Boxes,
  BoxTitle,
  ListItem,
  AddRemoveButtons,
  ListItemContainer,
} from './sectionEditorStyles'
import { useSectionEditorContextProvider } from './sectionEditorContext'
import { MutationFunctionOptions } from '@apollo/client'
import {
  updateTextSection,
  updateTextSectionVariables,
} from '../../../../../schemaTypes'

export type ProtocolsBoxProps = {
  setCurrentIndexForItem: Dispatch<SetStateAction<number>>
  toggleProtocolItemInputs: Dispatch<SetStateAction<boolean>>
  updateTextSection: (
    options?:
      | MutationFunctionOptions<updateTextSection, updateTextSectionVariables>
      | undefined
  ) => void
}

export const ProtocolsBox: FC<ProtocolsBoxProps> = ({
  setCurrentIndexForItem,
  toggleProtocolItemInputs,
  updateTextSection,
}) => {
  const [state, event] = useSectionEditorContextProvider()

  useEffect(() => {
    updateTextSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.hasProtocols])

  const [index, setIndex] = useState(-1)

  function handleAdd(index: number) {
    setCurrentIndexForItem(index)
  }

  function handleRemove(index: number) {
    event({
      type: 'SET_PROTOCOLS_LIST',
      payload: [
        ...state.context.hasProtocols.slice(0, index),
        ...state.context.hasProtocols.slice(index + 1),
      ],
    })
  }

  return (
    <>
      <Boxes onMouseOut={() => setIndex(-1)}>
        <BoxTitle>Protocols</BoxTitle>
        {state.context.hasProtocols.length > 0 ? (
          <div>
            {state.context.hasProtocols.map((p, i) => (
              <ListItemContainer key={p.task} onMouseOver={() => setIndex(i)}>
                <ListItem>{p.task}</ListItem>
                <AddRemoveButtons>
                  <div
                    hidden={i !== index || undefined}
                    onClick={() => {
                      toggleProtocolItemInputs(true)
                      handleAdd(i)
                    }}
                  >
                    +
                  </div>
                  <div
                    hidden={i !== index || undefined}
                    onClick={() => handleRemove(index)}
                  >
                    -
                  </div>
                </AddRemoveButtons>
              </ListItemContainer>
            ))}
          </div>
        ) : (
          <div
            onClick={() => {
              toggleProtocolItemInputs(true)
              handleAdd(0)
            }}
          >
            Add a Protocol
          </div>
        )}
      </Boxes>
    </>
  )
}
