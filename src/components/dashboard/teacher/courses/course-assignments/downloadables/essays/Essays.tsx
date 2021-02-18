import { gql, useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useParams } from 'react-router'
import { useUserContextProvider } from '../../../../../../../contexts/UserContext'
import {
  findEssaysByAssociatedLessonId,
  findEssaysByAssociatedLessonIdVariables,
  findLessonsByUnit,
  findLessonsByUnitVariables,
  findUnits,
  me_me_Teacher,
} from '../../../../../../../schemaTypes'
import { FIND_LESSONS_BY_UNIT_QUERY } from '../../../../assignments/create-assignments/create-essay/EssayLessonSelect'
import { FIND_UNITS_QUERY } from '../../../../lessons/lesson-planner/UnitAssigner'
import { useAssignmentManagerContextProvider } from '../../state-styles/AssignmentManagerContext'
import { EssayRows } from './EssayRows'

export type EssaysProps = {}

export const FIND_ESSAYS_BY_LESSON_ID_QUERY = gql`
  query findEssaysByAssociatedLessonId(
    $input: FindEssaysByAssociatedLessonIdInput!
  ) {
    findEssaysByAssociatedLessonId(input: $input) {
      essays {
        _id
        readings {
          readingSections
        }
        hasOwner {
          _id
          firstName
          lastName
          schoolId
        }
        score {
          earnedPoints
        }
        finalDraft {
          returned
          submitted
        }
        exempt
      }
    }
  }
`

export const Essays: FC<EssaysProps> = () => {
  const { course } = useParams()
  const me: me_me_Teacher = useUserContextProvider()
  const [courseName] = me.teachesCourses.filter(
    (courseToFind) => courseToFind._id === course
  )
  const [assignmentList, setAssignmentList] = useState<any[]>([])
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
  const [state, event] = useAssignmentManagerContextProvider()
  const { data: units } = useQuery<findUnits, findUnits>(FIND_UNITS_QUERY, {
    onCompleted: (data) => console.log(data.findUnits.units),
    onError: (error) => console.error(error),
  })

  const { data: lessons } = useQuery<
    findLessonsByUnit,
    findLessonsByUnitVariables
  >(FIND_LESSONS_BY_UNIT_QUERY, {
    variables: {
      input: { unitId: state.context.unitId, courseId: course },
    },
    onCompleted: (lessons) => console.log(lessons),
    onError: (error) => console.error(error),
  })

  const { loading, data: essays } = useQuery<
    findEssaysByAssociatedLessonId,
    findEssaysByAssociatedLessonIdVariables
  >(FIND_ESSAYS_BY_LESSON_ID_QUERY, {
    variables: {
      input: { associatedLessonId: state.context.lessonId },
    },
    pollInterval: 1000,
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const essayTitle = essays?.findEssaysByAssociatedLessonId.essays.map(
    (essay) => essay.readings.readingSections
  )

  if (loading) return <div>Loading </div>

  return (
    <>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            event({ type: 'SET_UNIT_ID', payload: e.target.value })
          }
        }}
      >
        <option value='none'>Select a Unit</option>
        {units?.findUnits.units.map((unit) => (
          <option key={unit._id!} value={unit._id!}>
            {unit.unitName}
          </option>
        ))}
      </select>
      {state.context.unitId && (
        <select
          onChange={(e: any) => {
            if (e.target.value !== 'none')
              event({ type: 'SET_LESSON_ID', payload: e.target.value })
          }}
        >
          <option value='none'>Select a Lesson</option>
          {lessons?.findLessonsByUnit.lessons.map((lesson) => (
            <option key={lesson._id!} value={lesson._id!}>
              {lesson.lessonName}
            </option>
          ))}
        </select>
      )}
      {!createCSVToggle && assignmentList.length > 0 && (
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
      )}
      {createCSVToggle && assignmentList.length > 0 && (
        <CSVLink
          data={assignmentList}
          headers={headers}
          filename={
            essayTitle![0].split('-').join(' ').split(' ').join('_') +
            '_' +
            courseName.name
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
          target='_blank'
          onClick={() => {
            event({ type: 'IDLE' })
            event({ type: 'RESET_ESSAYS' })
          }}
        >
          Download
        </CSVLink>
      )}
      {essays && (
        <>
          {loading ? (
            <div>loading</div>
          ) : (
            <div>
              {essays.findEssaysByAssociatedLessonId.essays.map((essay) => (
                <EssayRows
                  key={essay._id}
                  essay={essay}
                  setAssignmentList={setAssignmentList}
                  createCSVToggle={createCSVToggle}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
