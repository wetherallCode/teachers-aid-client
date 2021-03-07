import React, { FC, useState } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'

import { Lesson } from './Lesson'
import { LessonDetails } from './LessonDetails'
import './state-n-styles/LessonFinderCalendarStyleSheet.css'
import { useLessonFinderContextProvider } from './state-n-styles/LessonFinderContext'

export type LessonCalendarProps = {}

export const LessonCalendar: FC<LessonCalendarProps> = () => {
  const [value, setValue] = useState(new Date())
  const [state, event] = useLessonFinderContextProvider()

  const formatDate = (locale: string, date: Date) => {
    const formattedDate = date.toString().substr(0, 3)
    if (formattedDate === 'Mon') {
      return 'Monday'
    } else if (formattedDate === 'Tue') {
      return 'Tuesday'
    } else if (formattedDate === 'Wed') {
      return 'Wednesday'
    } else if (formattedDate === 'Thu') {
      return 'Thursday'
    } else if (formattedDate === 'Fri') {
      return 'Friday'
    } else if (formattedDate === 'Sat') {
      return 'Saturday'
    }
    return 'Sunday'
  }

  return (
    <div>
      {state.matches('idle') && (
        <StyledCalendar
          className='react-calendar'
          calendarType='US'
          value={value}
          tileClassName='tiles'
          tileContent={(date) => <Lesson date={date} />}
          view='month'
          formatShortWeekday={(locale, date) => formatDate('dd', date)}
        />
      )}
      {state.matches('lessonDetails') && <LessonDetails />}
    </div>
  )
}

const StyledCalendar = styled(Calendar)`
  width: 100vw;
  height: 100%;
  border: 1px solid var(--blue);
  background-color: var(--white);
`
