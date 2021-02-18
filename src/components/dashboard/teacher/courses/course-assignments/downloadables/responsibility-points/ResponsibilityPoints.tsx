import { gql, useQuery } from '@apollo/client'
import React, { FC, Fragment, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useParams } from 'react-router'
import { useEnumContextProvider } from '../../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../../../contexts/UserContext'
import {
  me_me_Teacher,
  findResponsibilityPointsByCourse,
  findResponsibilityPointsByCourseVariables,
  MarkingPeriodEnum,
} from '../../../../../../../schemaTypes'

import { ResponsibilityPointRows } from './ResponsibilityPointRows'

export type ResponsibilityPointsProps = {}

export const FIND_RESPONSIBILITY_POINTS_BY_COURSE_QUERY = gql`
  query findResponsibilityPointsByCourse(
    $input: FindResponsibilityPointsByCourseInput!
  ) {
    findResponsibilityPointsByCourse(input: $input) {
      responsibilityPointList {
        student {
          _id
          firstName
          lastName
          schoolId
        }
        responsibilityPoints
        markingPeriod
      }
    }
  }
`

export const ResponsibilityPoints: FC<ResponsibilityPointsProps> = () => {
  const { course } = useParams()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriod] = useMarkingPeriodContextProvider()
  const me: me_me_Teacher = useUserContextProvider()

  const [courseName] = me.teachesCourses.filter(
    (courseToFind) => courseToFind._id === course
  )

  const [markingPeriodSelect, setMarkingPeriodSelect] = useState(
    markingPeriod.context.currentMarkingPeriod
  )
  const [rosterList, setRosterList] = useState<any[]>([])
  const [csvToggle, setCsvToggle] = useState(false)
  console.log(csvToggle)
  const { loading, data } = useQuery<
    findResponsibilityPointsByCourse,
    findResponsibilityPointsByCourseVariables
  >(FIND_RESPONSIBILITY_POINTS_BY_COURSE_QUERY, {
    variables: {
      input: { courseId: course },
    },
    pollInterval: 1000,
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const responsibilityPointList = data?.findResponsibilityPointsByCourse.responsibilityPointList.filter(
    (rp) => rp.markingPeriod === markingPeriodSelect
  )
  const title = 'responsibility_points'
  const headers = [
    { label: 'NAME', key: 'NAME' },
    { label: 'STUDENTID', key: 'STUDENTID' },
    { label: 'GRADE', key: 'GRADE' },
    { label: 'ABSENT', key: 'ABSENT' },
    { label: 'EXEMPT', key: 'EXEMPT' },
    { label: 'INCOMPLETE', key: 'INCOMPLETE' },
    { label: 'MISSING', key: 'MISSING' },
  ]
  return (
    <>
      <div>Responsibility Points</div>
      <select onChange={(e: any) => setMarkingPeriodSelect(e.target.value)}>
        {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
          <option key={mp} value={mp}>
            {mp}
          </option>
        ))}
      </select>
      {csvToggle && rosterList.length > 0 ? (
        <CSVLink
          data={rosterList}
          headers={headers}
          filename={title + '_' + courseName.name}
          target='_blank'
          style={{
            marginRight: '2%',
            textDecoration: 'none',
            color: 'var(--blue)',
          }}
        >
          Download
        </CSVLink>
      ) : (
        <div
          onClick={() => setCsvToggle(true)}
          style={{
            marginRight: '2%',
            textDecoration: 'none',
            color: 'var(--blue)',
            cursor: 'pointer',
          }}
        >
          Load CSV
        </div>
      )}
      {responsibilityPointList?.map((student) => (
        <Fragment key={student.student._id}>
          <ResponsibilityPointRows
            student={student}
            setRosterList={setRosterList}
          />
        </Fragment>
      ))}
    </>
  )
}
