import { gql, useQuery } from '@apollo/client'
import {
  MarkingPeriodEnum,
  findResponsibilityPointsByStudentId,
  findResponsibilityPointsByStudentIdVariables,
  me_me_Student,
} from '../../../../../schemaTypes'
import { RESPONSIBILITY_POINTS_QUERY } from '../../../teacher/student-information/general-student-information/ResponsibilityPointsDisplay'

export type MyGradesResponsibilityPointsProps = {
  me: me_me_Student
  currentMarkingPeriod: MarkingPeriodEnum
}

// export const FIND_RESPONSIBLITY_POINTS_QUERY = gql`
//   query findResponsibilityPointsByStudentIdFor($input: FindResponsibilityPointsByStudentIdInput!) {
//     findResponsibilityPointsByStudentId(input: $input){
//     responsibilityPoints {
//       markingPeriod
//     respob
//     }}
//   }
// `

export const MyGradesResponsibilityPoints = ({
  me,
  currentMarkingPeriod,
}: MyGradesResponsibilityPointsProps) => {
  const { loading, data } = useQuery<
    findResponsibilityPointsByStudentId,
    findResponsibilityPointsByStudentIdVariables
  >(RESPONSIBILITY_POINTS_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },

    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const [points] =
    data?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
      (p) => p.markingPeriod === currentMarkingPeriod
    )!
  return (
    <div style={{}}>
      <div>Responsibility Points</div>
      <div>{points.responsibilityPoints}</div>
    </div>
  )
}
