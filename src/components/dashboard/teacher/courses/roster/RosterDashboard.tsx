import React, { FC } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { me_me_Teacher_teachesCourses } from '../../../../../schemaTypes'
import { AddStudents } from './add-students/AddStudents'
import { AddStudentsContextProvider } from './add-students/state-n-styles/AddStudentsContext'
import { AssignSeats } from './assign-seats/AssignSeats'
import { AssignSeatsContextProvider } from './assign-seats/state/AssignSeatsContext'
import {
  CourseName,
  RosterDashboardContainer,
  RosterNavigationContainer,
  RosterNavLink,
} from './RosterDashboardStyles'
import { ViewRoster } from './view-roster/ViewRoster'

export type RosterDashboardProps = {
  courseName: string
}

export const RosterDashboard = ({ courseName }: RosterDashboardProps) => {
  console.log(courseName)
  return (
    <RosterDashboardContainer>
      <RosterNavigationContainer>
        <CourseName>{courseName}</CourseName>
        <RosterNavLink to='add-students'>Add Students to Course</RosterNavLink>
        <RosterNavLink to='assign-seats'>Assign Seats</RosterNavLink>
        <RosterNavLink to='view-roster'>View Roster</RosterNavLink>
      </RosterNavigationContainer>
      <Routes>
        <Route
          path='add-students'
          element={
            <AddStudentsContextProvider>
              <AddStudents />
            </AddStudentsContextProvider>
          }
        />
        <Route path='assign-seats'>
          <AssignSeatsContextProvider>
            <AssignSeats />
          </AssignSeatsContextProvider>
        </Route>
        <Route path='view-roster' element={<ViewRoster />} />
      </Routes>
    </RosterDashboardContainer>
  )
}
