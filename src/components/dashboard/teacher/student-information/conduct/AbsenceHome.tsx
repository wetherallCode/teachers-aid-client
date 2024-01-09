import { gql, useQuery } from '@apollo/client'
import {
  MarkingPeriodEnum,
  findStudentAbsencesAndLatenesses,
  findStudentAbsencesAndLatenessesVariables,
  LatenessTypeEnum,
} from '../../../../../schemaTypes'

export type AbsenceHomeProps = {
  studentId: string
  selectedMarkingPeriod: MarkingPeriodEnum
}

export const FIND_STUDENT_ABSENCES_AND_LATENESSES_QUERY = gql`
  query findStudentAbsencesAndLatenesses($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        _id
        hasLatnesses {
          dayLate
          latenessType
          markingPeriod
        }
        hasAbsences {
          dayAbsent
          markingPeriod
        }
      }
    }
  }
`

export const AbsenceHome = ({
  studentId,
  selectedMarkingPeriod,
}: AbsenceHomeProps) => {
  const { loading, data } = useQuery<
    findStudentAbsencesAndLatenesses,
    findStudentAbsencesAndLatenessesVariables
  >(FIND_STUDENT_ABSENCES_AND_LATENESSES_QUERY, {
    variables: {
      input: { studentId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const absences = data?.findStudentById.student.hasAbsences.filter(
    (abs) => abs.markingPeriod === selectedMarkingPeriod,
  )!
  const excusedLatenesses = data?.findStudentById.student.hasLatnesses.filter(
    (abs) =>
      abs.markingPeriod === selectedMarkingPeriod &&
      abs.latenessType === LatenessTypeEnum.EXCUSED,
  )!
  const unexcusedLatenesses = data?.findStudentById.student.hasLatnesses.filter(
    (abs) =>
      abs.markingPeriod === selectedMarkingPeriod &&
      abs.latenessType === LatenessTypeEnum.UNEXCUSED,
  )!
  return (
    <div>
      <div>
        <div>Absences</div>
        {absences.length > 0 ? (
          <div>
            {absences.map((abs) => (
              <div>
                <div>Date: {abs.dayAbsent}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Perfect Attendance</div>
        )}
      </div>
      <div>
        <div>Excused Latenesses</div>
        {excusedLatenesses.length > 0 ? (
          <div>
            {excusedLatenesses.map((lateness) => (
              <div>
                <div>Date: {lateness.dayLate}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Never had an excused lateness</div>
        )}
      </div>
      <div>
        <div>Unexcused Latenesses</div>
        {unexcusedLatenesses.length > 0 ? (
          <div>
            {unexcusedLatenesses.map((lateness) => (
              <div>
                <div>Date: {lateness.dayLate}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Never had an unexcused lateness</div>
        )}
      </div>
    </div>
  )
}
