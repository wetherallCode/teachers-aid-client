import React, { FC, useEffect, useState } from 'react'

import { useLessonPlannerContextProvider } from './lessonPlannerContext'
import { findTextSectionsById } from '../../../../../schemaTypes'

export type PagesProps = {
  data: findTextSectionsById
}

export const Pages: FC<PagesProps> = ({ data }) => {
  const [startPage, setStartPage] = useState<number[]>([])
  const [endPage, setEndPage] = useState<number[]>([])
  const [state, event] = useLessonPlannerContextProvider()

  useEffect(() => {
    data?.findTextSectionsById.textSections.forEach((section) => {
      setStartPage((list) => [...list, section.pageNumbers.startingPage])
      setEndPage((list) => [...list, section.pageNumbers.endingPage])
    })
  }, [data])
  useEffect(() => {
    event({ type: 'SET_STARTING_PAGE', payload: startPage[0] })
    event({ type: 'SET_ENDING_PAGE', payload: endPage[endPage.length - 1] })
  }, [startPage, endPage, event])

  return (
    <>
      <div>Starting Page: {state.context.startingPage}</div>
      <div>Ending Page: {state.context.endingPage}</div>
    </>
  )
}
