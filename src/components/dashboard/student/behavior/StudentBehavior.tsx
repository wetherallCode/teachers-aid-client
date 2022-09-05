import { useQuery } from '@apollo/client'
import React from 'react'
import {
  BehaviorQualityEnum,
  findBehaviorsByStudentIdAndDate,
  findBehaviorsByStudentIdAndDateVariables,
  me_me,
  me_me_Student,
} from '../../../../schemaTypes'
import { FIND_BEHAVIORS_BY_STUDENT_ID_AND_DATE_QUERY } from '../../teacher/teachers-aid/student-info/behavior/BehaviorRemover'
import {
  BehaviorItem,
  BehaviorItemContainer,
  BehaviorItemTitle,
  StudentBehaviorContainer,
  StudentBehaviorContentContainer,
  StudentBehaviorTitle,
  TotalPointsForTheDayContainer,
} from './studentBehaviorStyles'

export type StudentBehaviorProps = { me: me_me }

export const StudentBehavior = ({ me }: StudentBehaviorProps) => {
  const { loading, data } = useQuery<
    findBehaviorsByStudentIdAndDate,
    findBehaviorsByStudentIdAndDateVariables
  >(FIND_BEHAVIORS_BY_STUDENT_ID_AND_DATE_QUERY, {
    variables: {
      input: { date: new Date().toLocaleDateString(), studentId: me._id! },
    },
    fetchPolicy: 'network-only',
    // onCompleted: (data) =>
    //   console.log(
    //     data.findBehaviorsByStudentIdAndDate.behaviors[0].responsibilityPoints
    //   ),
    onError: (error) => console.error(error),
  })
  const totalPoints =
    data?.findBehaviorsByStudentIdAndDate.behaviors.length! > 0 &&
    data?.findBehaviorsByStudentIdAndDate.behaviors
      .map((behavior) => behavior.responsibilityPoints)
      .reduce((a, i) => a + i)

  return (
    <StudentBehaviorContainer>
      <StudentBehaviorTitle>How did I do today?</StudentBehaviorTitle>
      <StudentBehaviorContentContainer>
        <BehaviorItemContainer>
          <BehaviorItemTitle>Positive Behaviors</BehaviorItemTitle>
          <ul>
            {data?.findBehaviorsByStudentIdAndDate.behaviors
              .filter(
                (b) =>
                  b.behavior.behaviorQuality === BehaviorQualityEnum.POSITIVE
              )
              .map((b) => (
                <BehaviorItem key={b._id}>
                  <div>{b.behavior.behaviorName}</div>
                  {/* <div>{b.responsibilityPoints.toFixed(1)}</div> */}
                </BehaviorItem>
              ))}
          </ul>
        </BehaviorItemContainer>
        <BehaviorItemContainer style={{ color: 'var(--red)' }}>
          <BehaviorItemTitle>Negative Behaviors</BehaviorItemTitle>
          <ul>
            {data?.findBehaviorsByStudentIdAndDate.behaviors
              .filter(
                (b) =>
                  b.behavior.behaviorQuality === BehaviorQualityEnum.NEGATIVE
              )
              .map((b) => (
                <BehaviorItem key={b._id}>
                  <div>{b.behavior.behaviorName}</div>
                  {/* <div>{b.behavior.points}</div> */}
                </BehaviorItem>
              ))}
          </ul>
        </BehaviorItemContainer>
      </StudentBehaviorContentContainer>
      <TotalPointsForTheDayContainer>
        Total Points for the day: {totalPoints ? totalPoints : 'None so far'}
      </TotalPointsForTheDayContainer>
    </StudentBehaviorContainer>
  )
}
