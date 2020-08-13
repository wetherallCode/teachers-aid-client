import React, { FC } from 'react'
import {
  capitalizer,
  noon,
  evening,
  time,
  timeFinder,
  militaryTime,
} from '../../../../utils'
import Timer from 'react-compound-timer'
import { TeachersAidContainer } from './styles/teachersAidContainerStyles'
import { StudentInfoContainer } from './styles/studentInfoStyles'
import {
  ClassControlPanelContainer,
  PanelDisplay,
} from './styles/classControlPanelStyles'
import {
  SeatingChartContainer,
  StartingDisplay,
} from './styles/seatingChartStyles'
import { gql } from '@apollo/client'
import { SeatingChart } from './seating-chart/SeatingChart'
import { StudentInfo } from './student-info/StudentInfo'
import { ClassControlPanel } from './class-control-panel/center-console/ClassControlPanel'
import { RandomStudentGenerator } from './class-control-panel/random-student-generator/RandomStudentGenerator'

import { useTeachersAidContextProvider } from './state/TeachersAidContext'
import { me_me_Teacher } from '../../../../schemaTypes'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { TimerPresets } from './class-control-panel/timer/TimerPresets'
import { Greetings } from '../../../home/Greetings'

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
  const [state] = useTeachersAidContextProvider()
  const me: me_me_Teacher = useUserContextProvider()
  const title = capitalizer(me.title)
  const [courseToLoad] =
    me.__typename === 'Teacher' &&
    me.teachesCourses.filter(
      (course) =>
        Date.parse(time) >
          Date.parse(timeFinder(course.hasCourseInfo.startsAt)) &&
        Date.parse(time) < Date.parse(timeFinder(course.hasCourseInfo.endsAt))
    )

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
            <SeatingChart />
          )}
        </SeatingChartContainer>
        <StudentInfoContainer>
          <StudentInfo />
        </StudentInfoContainer>
        <ClassControlPanelContainer>
          <PanelDisplay>
            <RandomStudentGenerator />
            <ClassControlPanel />
            <TimerPresets />
          </PanelDisplay>
        </ClassControlPanelContainer>
      </TeachersAidContainer>
    </>
  )
}
