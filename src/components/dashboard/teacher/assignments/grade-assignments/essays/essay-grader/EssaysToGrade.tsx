import React, { FC, useState, useEffect } from 'react'
import {
  findEssaysToGradeById,
  findEssaysToGradeByIdVariables,
  me_me_Teacher,
  findEssaysToGradeById_findEssaysToGradeById_essays,
  MarkingPeriodEnum,
} from '../../../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../../../contexts/UserContext'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { useMarkingPeriodContextProvider } from '../../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useEnumContextProvider } from '../../../../../../../contexts/EnumContext'
import { TitleContainer } from '../../state-n-styles/GradeEssayContainerStyles'
import { useGradeEssayContainerContextProvider } from '../../state-n-styles/GradeEssayContainerContext'

export type EssaysToGradeProps = {
  courseId: string
}

export const FIND_ESSAYS_TO_GRADE_BY_ID_QUERY = gql`
  query findEssaysToGradeById($input: FindEssaysToGradeByIdInput!) {
    findEssaysToGradeById(input: $input) {
      essays {
        _id
        late
        assigned
        markingPeriod
        readings {
          readingSections
        }
        hasOwner {
          _id
          firstName
          lastName
          inCourses {
            _id
          }
        }
        finalDraft {
          returned
          submitted
          submittedFinalDraft {
            draftNumber
            graded
          }
        }
      }
    }
  }
`

export const EssaysToGrade: FC<EssaysToGradeProps> = ({ courseId }) => {
  const [, event] = useGradeEssayContainerContextProvider()
  const [essayList, setEssayList] = useState<
    findEssaysToGradeById_findEssaysToGradeById_essays[]
  >([])
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriodToGrade, setMarkingPeriodToGrade] = useState(
    markingPeriodState.context.currentMarkingPeriod
  )
  const [resubmittedEssayList, setResubmittedEssayList] = useState<
    findEssaysToGradeById_findEssaysToGradeById_essays[]
  >([])

  const me: me_me_Teacher = useUserContextProvider()

  const { loading, data } = useQuery<
    findEssaysToGradeById,
    findEssaysToGradeByIdVariables
  >(FIND_ESSAYS_TO_GRADE_BY_ID_QUERY, {
    variables: {
      input: { teacherId: me._id! },
    },
    onCompleted: (data) => {},
    pollInterval: 10000,
    onError: (error) => console.error(error),
  })

  useEffect(() => {
    setEssayList(
      data?.findEssaysToGradeById.essays.filter(
        (essay) =>
          essay.hasOwner.inCourses.some((course) => course._id === courseId) &&
          essay.finalDraft?.submittedFinalDraft.length! === 1
      )!
    )
    setResubmittedEssayList(
      data?.findEssaysToGradeById.essays.filter(
        (essay) =>
          essay.hasOwner.inCourses.some((course) => course._id === courseId) &&
          essay.finalDraft?.submittedFinalDraft.length! > 1
      )!
    )
  }, [data, courseId])

  if (loading) return <div>Loading </div>

  const essaysSubmittedOnTime =
    essayList !== undefined &&
    essayList.filter(
      (essay) =>
        essay.late === false && essay.markingPeriod === markingPeriodToGrade
    )
  const lateEssays =
    essayList !== undefined &&
    essayList.filter(
      (essay) =>
        essay.late === true && essay.markingPeriod === markingPeriodToGrade
    )

  return (
    <>
      <TitleContainer>
        <div>Essays To Grade</div>
      </TitleContainer>
      <select
        value={markingPeriodToGrade}
        onChange={(e: any) => setMarkingPeriodToGrade(e.target.value)}
      >
        {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
          <option key={mp} value={mp}>
            {mp}
          </option>
        ))}
      </select>
      <div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: '10px' }}>
        {essaysSubmittedOnTime &&
          essaysSubmittedOnTime.map((essay) => (
            <Link to={essay._id!} key={essay._id!}>
              {essay.hasOwner.lastName}, {essay.hasOwner.firstName}:{' '}
              {essay.readings.readingSections}
            </Link>
          ))}
      </div>
      <div>Late Essays</div>
      <div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: '10px' }}>
        {lateEssays &&
          lateEssays.map((essay) => (
            <Link to={essay._id!} key={essay._id!}>
              {essay.hasOwner.lastName}, {essay.hasOwner.firstName}:{' '}
              {essay.readings.readingSections}
            </Link>
          ))}
      </div>
      <div>Resubmissions</div>
      <div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: '10px' }}>
        {resubmittedEssayList !== undefined &&
          resubmittedEssayList
            .filter((essay) => essay.markingPeriod === markingPeriodToGrade)
            .map((essay) => (
              <Link to={essay._id!} key={essay._id!}>
                {essay.hasOwner.lastName}, {essay.hasOwner.firstName}:{' '}
                {essay.readings.readingSections}
              </Link>
            ))}
      </div>
    </>
  )
}
