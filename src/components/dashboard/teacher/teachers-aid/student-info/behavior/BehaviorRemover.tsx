import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import {
  findBehaviorsByStudentIdAndDate,
  findBehaviorsByStudentIdAndDateVariables,
  removeStudentBehaviorVariables,
  removeStudentBehavior,
  MarkingPeriodEnum,
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
  RemoveBehaviorButton,
} from '../../styles/studentInfoStyles'

export type BehaviorRemoverProps = {
  studentId: string
  currentMarkingPeriod: MarkingPeriodEnum
}

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

export const REMOVE_STUDENT_BEHAVIOR_MUTATION = gql`
  mutation removeStudentBehavior($input: RemoveStudentBehaviorInput!) {
    removeStudentBehavior(input: $input) {
      removed
    }
  }
`

export const BehaviorRemover = ({
  studentId,
  currentMarkingPeriod,
}: BehaviorRemoverProps) => {
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
  const [removeStudentBehavior] = useMutation<
    removeStudentBehavior,
    removeStudentBehaviorVariables
  >(REMOVE_STUDENT_BEHAVIOR_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      'findBehaviorsByStudentIdAndDate',
      'findStudentInfoByStudentId',
    ],
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
              <RemoveBehaviorButton
                onClick={() =>
                  removeStudentBehavior({
                    variables: {
                      input: {
                        markingPeriod: currentMarkingPeriod,
                        studentBehaviorId: behavior._id!,
                      },
                    },
                  })
                }
              >
                Delete
              </RemoveBehaviorButton>
            </BehaviorItem>
          ))}
        </BehaviorItemContainer>
      )}
    </BehaviorRemoverContainer>
  )
}
