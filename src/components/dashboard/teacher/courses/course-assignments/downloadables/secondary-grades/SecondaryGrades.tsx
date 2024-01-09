import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useParams } from 'react-router'
import { useEnumContextProvider } from '../../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../../../contexts/UserContext'
import {
  findAssignmentsByCourseId_findAssignmentsByCourseId_assignments,
  findAssignmentsByCourseId_findAssignmentsByCourseId_assignments_hasOwner_hasAssignments,
  findStudentsByCourseForSecondaryGradeFinder,
  findStudentsByCourseForSecondaryGradeFinderVariables,
  MarkingPeriodEnum,
  me_me_Teacher,
} from '../../../../../../../schemaTypes'
import { MarkingPeriodSelectorSwitch } from '../../../../../../reusable-components/MarkingPeriodSelectorSwitch'
import { useAssignmentManagerContextProvider } from '../../state-styles/AssignmentManagerContext'
import { SecondaryGradeRows } from './SecondaryGradeRows'

export const FIND_STUDENTS_BY_COURSE_FOR_SECONDARY_GRADE_FINDER_QUERY = gql`
  query findStudentsByCourseForSecondaryGradeFinder(
    $input: FindStudentsByCourseInput!
  ) {
    findStudentsByCourse(input: $input) {
      students {
        _id
        firstName
        lastName
        schoolId
      }
    }
  }
`

export type SecondaryGradesProps = {
  // assignments: findAssignmentsByCourseId_findAssignmentsByCourseId_assignments_hasOwner_hasAssignments[]
}
export type AssignmentTypeProps = {
  NAME: string
  STUDENTID: string | null
  GRADE: string | number
  ABSENT: string
  EXEMPT: string
  INCOMPLETE: string
  MISSING: string
}

export const SecondaryGrades = ({}: SecondaryGradesProps) => {
  const [state, event] = useAssignmentManagerContextProvider()
  const { course } = useParams()

  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriod] = useMarkingPeriodContextProvider()

  const me: me_me_Teacher = useUserContextProvider()

  const { loading, data } = useQuery<
    findStudentsByCourseForSecondaryGradeFinder,
    findStudentsByCourseForSecondaryGradeFinderVariables
  >(FIND_STUDENTS_BY_COURSE_FOR_SECONDARY_GRADE_FINDER_QUERY, {
    variables: {
      input: { courseId: course! },
    },
    // onCompleted: (data) =>
    //   console.log(data.findStudentsByCourse.students.map((student) => student)),
    onError: (error) => console.error(error),
  })

  const [assignmentList, setAssignmentList] = useState<AssignmentTypeProps[]>(
    [],
  )

  const [courseName] = me.teachesCourses.filter(
    (courseToFind) => courseToFind._id === course,
  )

  const [markingPeriodSelect, setMarkingPeriodSelect] = useState<
    MarkingPeriodEnum | ''
  >('')
  // const [rosterList, setRosterList] = useState<any[]>([])
  const [createCSVToggle, setCreateCSVToggle] = useState(false)
  const headers = [
    { label: 'NAME', key: 'NAME' },
    { label: 'STUDENTID', key: 'STUDENTID' },
    { label: 'GRADE', key: 'GRADE' },
    { label: 'ABSENT', key: 'ABSENT' },
    { label: 'EXEMPT', key: 'EXEMPT' },
    { label: 'INCOMPLETE', key: 'INCOMPLETE' },
    { label: 'MISSING', key: 'MISSING' },
  ]
  // useEffect(() => {
  //   setAssignmentList([])
  // }, [markingPeriodSelect])

  if (loading) return <div>Loading </div>

  return (
    <>
      {/* <MarkingPeriodSelectorSwitch
        selectedMarkingPeriod={markingPeriodSelect}
        setSelectedMarkingPeriod={setMarkingPeriodSelect}
      /> */}
      <select onChange={(e: any) => setMarkingPeriodSelect(e.target.value)}>
        <option value={''}>Select</option>
        {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
          <option key={mp}>{mp}</option>
        ))}
      </select>
      {assignmentList.length > 0 && (
        <>
          {!createCSVToggle ? (
            <div>
              <button
                style={{
                  backgroundColor: 'var(--blue)',
                  color: 'var(--white)',
                  fontSize: '130%',
                }}
                onClick={() => setCreateCSVToggle(true)}
              >
                Load Import Grade Document
              </button>
            </div>
          ) : (
            <div>
              <CSVLink
                data={assignmentList}
                headers={headers}
                filename={
                  courseName.name +
                  '_' +
                  'Secondary_Grades' +
                  '_' +
                  markingPeriodSelect +
                  '_Marking_Period'
                }
                style={{
                  backgroundColor: 'var(--red)',
                  color: 'var(--white)',
                  fontSize: '140%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
                target="_blank"
                onClick={() => {
                  event({ type: 'IDLE' })
                  event({ type: 'RESET_ESSAYS' })
                }}
              >
                Download
              </CSVLink>
            </div>
          )}
        </>
      )}
      {markingPeriodSelect && (
        <div>
          {data?.findStudentsByCourse.students.map((student) => (
            <SecondaryGradeRows
              key={student._id!}
              student={student}
              classSize={data.findStudentsByCourse.students.length}
              markingPeriodSelect={markingPeriodSelect}
              setAssignmentList={setAssignmentList}
              assignmentList={assignmentList}
              createCSVToggle={createCSVToggle}
            />
          ))}
        </div>
      )}
    </>
  )
}
