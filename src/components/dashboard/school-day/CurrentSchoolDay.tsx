import React, { FC } from 'react'
import { findCurrentSchoolDay_findSchoolDayByDate_schoolDay } from '../../../schemaTypes'

export type CurrentSchoolDayProps = {
  schoolDay: findCurrentSchoolDay_findSchoolDayByDate_schoolDay
}

export const CurrentSchoolDay = ({ schoolDay }: CurrentSchoolDayProps) => {
  return (
    <>
      <div>Current Day of School</div>
      <div> {schoolDay.schoolDayCount}</div>
      <div>School days left until Summer Break</div>
      <div>{180 - schoolDay.schoolDayCount}</div>

      {/* <div>Today's Date: {schoolDay.todaysDate}</div> */}
      {/* <div>
        Current Cohort Week:{' '}
        {schoolDay.cohortWeek === 'RED' ? 'Red Week' : 'White Week'}
      </div>
      <div>{schoolDay.currentSchoolDayType} Day</div> */}
    </>
  )
}
