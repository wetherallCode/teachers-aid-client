import React, { FC, useState } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import './LessonCalendarStyleSheet.css'
export type LessonCalendarProps = {}

export const LessonCalendar: FC<LessonCalendarProps> = () => {
  const [value, onChange] = useState(new Date())
  console.log(value.toLocaleDateString())

  return (
    <div>
      <StyledCalendar
        calendarType='US'
        value={value}
        tileClassName='tiles'
        tileContent={
          <div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        }
      />
    </div>
  )
}

const StyledCalendar = styled(Calendar)`
  width: 100vw;
  height: 100vh;
`
