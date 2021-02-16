import React, { FC, useEffect } from 'react'
import { capitalizer, date } from '../../../../utils'
import { TeachersAidContainer } from './styles/teachersAidContainerStyles'
import {
  StudentInfoContainer,
  StudentInfoDisplay,
  StudentNameContainer,
  StudentControlPanel,
} from './styles/studentInfoStyles'
import { ClassControlPanelContainer } from './styles/classControlPanelStyles'
import {
  SeatingChartContainer,
  StartingDisplay,
} from './styles/seatingChartStyles'
import { gql } from '@apollo/client'
import { StudentInfo } from './student-info/StudentInfo'
import { ClassControlPanel } from './class-control-panel/center-console/ClassControlPanel'
import { RandomStudentGenerator } from './class-control-panel/random-student-generator/RandomStudentGenerator'
import { useTeachersAidContextProvider } from './state/TeachersAidContext'
import { me_me_Teacher } from '../../../../schemaTypes'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { TimerPresets } from './class-control-panel/timer/TimerPresets'
import { Greetings } from '../../../home/Greetings'
import { MainScreenDisplay } from './main-screen/MainScreenDisplay'

export type TeachersAidProps = {}

export const COURSE_QUERY = gql`
  query findCourseById($input: FindCourseByIdInput!) {
    findCourseById(input: $input) {
      course {
        hasStudents {
          firstName
        }
      }
    }
  }
`

export const TeachersAid: FC<TeachersAidProps> = () => {
  const [state, event] = useTeachersAidContextProvider()

  const me: me_me_Teacher = useUserContextProvider()
  const title = capitalizer(me.title)
  // const [courseToLoad] =
  //   me.__typename === 'Teacher' &&
  //   me.teachesCourses.filter(
  //     (course) =>
  //       Date.parse(time) >
  //         Date.parse(timeFinder(course.hasCourseInfo.startsAt)) &&
  //       Date.parse(time) < Date.parse(timeFinder(course.hasCourseInfo.endsAt))
  //   )

  useEffect(() => {
    const presentStudents = state.context.courseInfo.course.hasStudents
      // .filter((desk) => desk.student !== null)
      .filter((student) => {
        return !student?.hasAbsences.some((day) => day.dayAbsent === date)
      })
      .map((student) => student?._id) as string[]

    event({
      type: 'SET_PRESENT_STUDENTS',
      payload: presentStudents,
    })
  }, [state.context.courseInfo.assignedSeats])

  return (
    <>
      {/* {macBookPro && ( */}

      <TeachersAidContainer>
        <SeatingChartContainer>
          {!state.context.courseInfo._id ? (
            <StartingDisplay>
              <Greetings phrase={`${title}. ${me.lastName}!`} />
            </StartingDisplay>
          ) : (
            <MainScreenDisplay />
          )}
        </SeatingChartContainer>
        <StudentInfoContainer>
          {state.context.studentId ? (
            <StudentInfo />
          ) : (
            <>
              <StudentInfoDisplay>
                <StudentNameContainer />
              </StudentInfoDisplay>
              <StudentControlPanel></StudentControlPanel>
            </>
          )}
        </StudentInfoContainer>
        <ClassControlPanelContainer>
          <RandomStudentGenerator />
          <ClassControlPanel />
          <TimerPresets />
        </ClassControlPanelContainer>
      </TeachersAidContainer>
    </>
  )
}
