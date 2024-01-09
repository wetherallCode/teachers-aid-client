import React from 'react'
import { useToggle } from '../../../../../../hooks'
import { FindTextSectionById_findTextSectionById_textSection } from '../../../../../../schemaTypes'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'

export type EditSectionInfoProps = {
  textSection: FindTextSectionById_findTextSectionById_textSection
}

export const EditSectionInfo = ({ textSection }: EditSectionInfoProps) => {
  const [state, event] = useSectionEditorContextProvider()
  const [header, toggleHeader] = useToggle(false)

  return (
    <>
      <div onClick={toggleHeader}>
        {!header ? (
          <div>{textSection.header}</div>
        ) : (
          <label htmlFor="set header">
            <input
              autoFocus={true}
              onBlur={toggleHeader}
              onKeyDown={(e: any) => {
                if (e.keyCode === 13) {
                  toggleHeader()
                }
              }}
              type="text"
              value={state.context.header}
              onChange={(e: any) => {
                event({ type: 'SET_HEADER', header: e.target.value })
              }}
            />
          </label>
        )}
      </div>
      <div>
        Order:{' '}
        {state.context.orderNumber === null
          ? 'none'
          : state.context.orderNumber}{' '}
        <input
          onChange={(e) => {
            event({ type: 'SET_ORDER_NUMBER', payload: +e.target.value })
          }}
        />
      </div>
      <div>Pages: </div>
      <div>Starting Page:</div>
      <label htmlFor="set page numbers">
        <input
          type="text"
          onChange={(e: any) =>
            event({
              type: 'SET_PAGE_NUMBERS',
              payload: {
                ...state.context.pageNumbers,
                startingPage: Number(e.target.value),
              },
            })
          }
        />
      </label>
      <div>Ending Page: </div>
      <label htmlFor="set page numbers">
        <input
          type="text"
          onChange={(e: any) =>
            event({
              type: 'SET_PAGE_NUMBERS',
              payload: {
                ...state.context.pageNumbers,
                endingPage: Number(e.target.value),
              },
            })
          }
        />
      </label>
    </>
  )
}
