import React, { FC } from 'react'
import { findCurrentSchoolDay_findSchoolDayByDate_schoolDay } from '../../../schemaTypes'

export type CurrentSchoolDayProps = {
  schoolDay: findCurrentSchoolDay_findSchoolDayByDate_schoolDay
}

export const CurrentSchoolDay: FC<CurrentSchoolDayProps> = ({ schoolDay }) => {
  return (
    <>
      <div>Current School Day</div>
      <div>Current Day of School: {schoolDay.schoolDayCount}</div>
      <div>
        Current Cohort Week:{' '}
        {schoolDay.cohortWeek === 'RED' ? 'Red Week' : 'White Week'}
      </div>
      <div>{schoolDay.currentSchoolDayType} Day</div>
    </>
  )
}
