import React, { FC } from 'react'
import { findCurrentSchoolDay_findSchoolDayByDate_schoolDay } from '../../../schemaTypes'

export type CurrentSchoolDayProps = {
  schoolDay: findCurrentSchoolDay_findSchoolDayByDate_schoolDay
}

export const CurrentSchoolDay: FC<CurrentSchoolDayProps> = ({ schoolDay }) => {
  console.log(schoolDay.todaysDate)
  return (
    <>
      <div>Current School Day</div>
      <div>Current Day of School: {schoolDay.schoolDayCount}</div>
      <div>
        Day's of School left until Summer Break :{' '}
        {180 - schoolDay.schoolDayCount}
      </div>
      <div>Today's Date: {schoolDay.todaysDate}</div>
      {/* <div>
        Current Cohort Week:{' '}
        {schoolDay.cohortWeek === 'RED' ? 'Red Week' : 'White Week'}
      </div>
      <div>{schoolDay.currentSchoolDayType} Day</div> */}
    </>
  )
}
