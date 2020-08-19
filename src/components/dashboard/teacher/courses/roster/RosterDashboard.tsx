import React, { FC } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { AddStudents } from './add-students/AddStudents'
import { AddStudentsContextProvider } from './add-students/state/AddStudentsContext'
import { AssignSeats } from './assign-seats/AssignSeats'
import { AssignSeatsContextProvider } from './assign-seats/state/AssignSeatsContext'
import { ViewRoster } from './view-roster/ViewRoster'

export type RosterDashboardProps = {}

export const RosterDashboard: FC<RosterDashboardProps> = () => {
  return (
    <>
      <Link to='add-students'>Add Students to Course</Link>
      <Link to='assign-seats'>Assign Seats</Link>
      <Link to='view-roster'>View Roster</Link>
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
    </>
  )
}
