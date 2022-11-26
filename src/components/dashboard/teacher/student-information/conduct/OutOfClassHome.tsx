import { gql, useQuery } from '@apollo/client'
import {
  MarkingPeriodEnum,
  findStudentOutOfClassByStudentIdAndMarkingPeriod,
  findStudentOutOfClassByStudentIdAndMarkingPeriodVariables,
} from '../../../../../schemaTypes'
import {
  capitalizer,
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../utils'

export type OutOfClassHomeProps = {
  studentId: string
  selectedMarkingPeriod: MarkingPeriodEnum
}

export const FIND_STUDENT_OUT_OF_CLASS_BY_STUDENT_AND_MARKING_PERIOD_QUERY = gql`
  query findStudentOutOfClassByStudentIdAndMarkingPeriod(
    $input: FindStudentOutOfClassByStudentIdAndMarkingPeriodInput!
  ) {
    findStudentOutOfClassByStudentIdAndMarkingPeriod(input: $input) {
      studentOutOfClassListForMarkingPeriod {
        student {
          _id
          firstName
          lastName
        }
        date
        departTime
        hasReturned
        outOfClassDestination
        returnTime
      }
    }
  }
`

export const OutOfClassHome = ({
  studentId,
  selectedMarkingPeriod,
}: OutOfClassHomeProps) => {
  const { loading, data } = useQuery<
    findStudentOutOfClassByStudentIdAndMarkingPeriod,
    findStudentOutOfClassByStudentIdAndMarkingPeriodVariables
  >(FIND_STUDENT_OUT_OF_CLASS_BY_STUDENT_AND_MARKING_PERIOD_QUERY, {
    variables: {
      input: { markingPeriod: selectedMarkingPeriod, studentId },
    },
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  // const { date, departTime, returnTime } =
  //   data?.findStudentOutOfClassByStudentIdAndMarkingPeriod
  //     .studentOutOfClassListForMarkingPeriod[0]!

  // const aTime = `${date}, ${'5:59:00 AM'}`
  // const bTime = `${date}, ${'7:05:59 AM'}`
  // const departingTime = new Date(aTime).getTime()
  // const returningTime = new Date(bTime).getTime()
  // const totalTime = (returningTime - departingTime) / (1000 * 60)
  // const totalTimeString =
  //   Math.floor(totalTime) + ':' + Math.round((totalTime % 1) * 60)

  const outOfClassObjectList =
    data?.findStudentOutOfClassByStudentIdAndMarkingPeriod.studentOutOfClassListForMarkingPeriod.map(
      (obj) => {
        const { date, departTime, returnTime, outOfClassDestination } = obj!

        const aTime = `${date}, ${departTime}`
        const bTime = `${date}, ${returnTime}`
        const departingTime = new Date(aTime).getTime()
        const returningTime = new Date(bTime).getTime()
        const totalTime = (returningTime - departingTime) / (1000 * 60)
        const totalTimeString =
          Math.floor(totalTime) + ':' + Math.round((totalTime % 1) * 60)
        return {
          date,
          destination: outOfClassDestination,
          timeGone: totalTimeString,
        }
      }
    )!
  return (
    <>
      {data?.findStudentOutOfClassByStudentIdAndMarkingPeriod
        .studentOutOfClassListForMarkingPeriod.length! > 0 ? (
        <div>
          {outOfClassObjectList.map((obj) => (
            <div>
              <div>Date: {obj.date}</div>
              <div>
                Destination:{' '}
                {underscoreEliminator(phraseCapitalizer(obj.destination))}
              </div>
              <div>Time Taken: {obj.timeGone}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Has not left class at all this marking period.</div>
      )}
    </>
  )
}
