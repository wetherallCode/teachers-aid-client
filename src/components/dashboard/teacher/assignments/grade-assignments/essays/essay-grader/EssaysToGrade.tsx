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
import {
  CourseEssaysToGradeContainer,
  EssayList,
  EssayListContainer,
  EssayListItem,
  EssaySelect,
  EssayStatusSelect,
  EssayStatusSelector,
  EssayTitle,
  MarkingPeriodSelector,
  OrderSwitchContainer,
} from '../../state-n-styles/GradeEssayContainerStyles'
import { useGradeEssayContainerContextProvider } from '../../state-n-styles/GradeEssayContainerContext'
import { useToggle } from '../../../../../../../hooks'
import {
  CurrentMarkingPeriodContainer,
  MarkingPeriodSelectorBack,
  MarkingPeriodSelectorContainer,
  MarkingPeriodSelectorForward,
} from '../../../article-reviews/state-styles/articleReviewStyles'
import { sortByLetter } from '../../../../../../../utils'

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
  const [state, event] = useGradeEssayContainerContextProvider()
  const [orderBy, switchOrder] = useToggle(false)
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
    onCompleted: (data) => {
      console.log(data)
    },
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

  const sortingFn = () => {
    if (state.context.orderBy === 'LAST_NAME') {
      return sortByLetter
    }
  }

  const essaysSubmittedOnTime =
    essayList !== undefined &&
    essayList.filter(
      (essay) =>
        essay.late === false && essay.markingPeriod === markingPeriodToGrade
    )
  const onTimeEssaysToGrade =
    essayList !== undefined &&
    essayList.some(
      (essay) => !essay.late && essay.markingPeriod === markingPeriodToGrade
    )

  const lateEssays =
    essayList !== undefined &&
    essayList.filter(
      (essay) =>
        essay.late === true && essay.markingPeriod === markingPeriodToGrade
    )

  const lateEssaysToGrade =
    essayList !== undefined &&
    essayList.some(
      (essay) => essay.late && essay.markingPeriod === markingPeriodToGrade
    )

  const index = markingPeriodEnum.findIndex(
    (c: MarkingPeriodEnum) => c === markingPeriodToGrade
  )

  return (
    <CourseEssaysToGradeContainer>
      <EssayTitle>
        <div>Essays To Grade</div>
      </EssayTitle>
      <MarkingPeriodSelector>
        <MarkingPeriodSelectorContainer>
          {index > 0 && (
            <MarkingPeriodSelectorBack
              onClick={() => {
                setMarkingPeriodToGrade(markingPeriodEnum[index - 1])
              }}
            >
              &lt;
            </MarkingPeriodSelectorBack>
          )}
          <CurrentMarkingPeriodContainer>
            <div>{markingPeriodToGrade}</div>
          </CurrentMarkingPeriodContainer>
          {index < 3 && (
            <MarkingPeriodSelectorForward
              onClick={() =>
                setMarkingPeriodToGrade(markingPeriodEnum[index + 1])
              }
            >
              &gt;
            </MarkingPeriodSelectorForward>
          )}
        </MarkingPeriodSelectorContainer>
      </MarkingPeriodSelector>
      <EssayStatusSelector>
        <EssayStatusSelect
          toGradeIndicator={onTimeEssaysToGrade}
          onClick={() => event({ type: 'ONTIME' })}
        >
          Current
        </EssayStatusSelect>
        <EssayStatusSelect
          toGradeIndicator={lateEssaysToGrade}
          onClick={() => event({ type: 'LATE' })}
        >
          Late
        </EssayStatusSelect>
        <EssayStatusSelect
          toGradeIndicator={
            resubmittedEssayList && resubmittedEssayList.length > 0
          }
          onClick={() => event({ type: 'RESUBMITTED' })}
        >
          Resubmitted
        </EssayStatusSelect>
      </EssayStatusSelector>
      <EssayListContainer>
        {state.matches('essayTypes.onTime') && (
          <EssayList>
            {essaysSubmittedOnTime &&
              essaysSubmittedOnTime.map((essay) => (
                <EssayListItem key={essay._id!}>
                  <EssaySelect to={essay._id!} key={essay._id!}>
                    {essay.hasOwner.lastName}, {essay.hasOwner.firstName}:{' '}
                    {essay.readings.readingSections}
                  </EssaySelect>
                </EssayListItem>
              ))}
          </EssayList>
        )}

        {state.matches('essayTypes.late') && (
          <EssayList>
            {lateEssays &&
              lateEssays.map((essay) => (
                <EssayListItem key={essay._id!}>
                  <EssaySelect to={essay._id!} key={essay._id!}>
                    {essay.hasOwner.lastName}, {essay.hasOwner.firstName}:{' '}
                    {essay.readings.readingSections}
                  </EssaySelect>
                </EssayListItem>
              ))}
          </EssayList>
        )}

        {state.matches('essayTypes.resubmitted') && (
          <EssayList>
            {resubmittedEssayList !== undefined &&
              resubmittedEssayList
                .filter((essay) => essay.markingPeriod === markingPeriodToGrade)
                .map((essay) => (
                  <EssayListItem key={essay._id!}>
                    <EssaySelect to={essay._id!} key={essay._id!}>
                      {essay.hasOwner.lastName}, {essay.hasOwner.firstName}:{' '}
                      {essay.readings.readingSections}
                    </EssaySelect>
                  </EssayListItem>
                ))}
          </EssayList>
        )}
      </EssayListContainer>
      <OrderSwitchContainer>
        <div
          onClick={() => event({ type: 'SET_ORDER_BY', payload: 'LAST_NAME' })}
        >
          Order By Student
        </div>
        <div onClick={() => event({ type: 'SET_ORDER_BY', payload: 'DATE' })}>
          Order By Date
        </div>
      </OrderSwitchContainer>
    </CourseEssaysToGradeContainer>
  )
}
