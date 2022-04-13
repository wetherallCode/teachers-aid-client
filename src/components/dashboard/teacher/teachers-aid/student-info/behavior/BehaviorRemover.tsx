import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findBehaviorsByStudentIdAndDate,
  findBehaviorsByStudentIdAndDateVariables,
} from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'
import {
  BehaviorItem,
  BehaviorItemContainer,
  BehaviorRemoverContainer,
  BehaviorRemoverTitleContainer,
} from '../../styles/studentInfoStyles'

export type BehaviorRemoverProps = { studentId: string }

export const FIND_BEHAVIORS_BY_STUDENT_ID_AND_DATE_QUERY = gql`
  query findBehaviorsByStudentIdAndDate(
    $input: FindBehaviorsByStudentIdAndDateInput!
  ) {
    findBehaviorsByStudentIdAndDate(input: $input) {
      behaviors {
        _id
        student {
          firstName
        }
        behavior
        responsibilityPoints
      }
    }
  }
`

export const BehaviorRemover = ({ studentId }: BehaviorRemoverProps) => {
  const { loading, data } = useQuery<
    findBehaviorsByStudentIdAndDate,
    findBehaviorsByStudentIdAndDateVariables
  >(FIND_BEHAVIORS_BY_STUDENT_ID_AND_DATE_QUERY, {
    variables: {
      input: { date: new Date().toLocaleDateString(), studentId: studentId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  // if (loading) return <div>Loading </div>
  return (
    <BehaviorRemoverContainer>
      <BehaviorRemoverTitleContainer>
        Today's Behavior
      </BehaviorRemoverTitleContainer>
      {loading ? (
        <div>Loading</div>
      ) : (
        <BehaviorItemContainer>
          {data?.findBehaviorsByStudentIdAndDate.behaviors.map((behavior) => (
            <BehaviorItem>
              <div>
                {phraseCapitalizer(underscoreEliminator(behavior.behavior))}
              </div>
              <button>Delete</button>
            </BehaviorItem>
          ))}
        </BehaviorItemContainer>
      )}
    </BehaviorRemoverContainer>
  )
}
