import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import {
  studentReturnedToClassVariables,
  studentReturnedToClass,
  findCourseByIdForTeachersAid_findCourseById_course_hasCourseInfo_assignedSeats_student,
  findStudentOutOfClassByPeriodNameAndDateForStudentStatusDisplay,
  findStudentOutOfClassByPeriodNameAndDateForStudentStatusDisplayVariables,
} from '../../../../../../schemaTypes'

export type StatusProps = {
  courseId: string
  students: (findCourseByIdForTeachersAid_findCourseById_course_hasCourseInfo_assignedSeats_student | null)[]
}

export const FIND_STUDENTS_OUT_OF_CLASS_QUERY = gql`
  query findStudentOutOfClassByPeriodNameAndDateForStudentStatusDisplay(
    $input: FindStudentOutOfClassByPeriodNameAndDateInput!
  ) {
    findStudentOutOfClassByPeriodNameAndDate(input: $input) {
      studentsOutOfClass {
        _id
        date
        departTime
        hasReturned
        markingPeriod
        outOfClassDestination
        returnTime
        student {
          _id
          firstName
          lastName
        }
      }
    }
  }
`

export const STUDENT_RETURNED_MUTATION = gql`
  mutation studentReturnedToClass($input: StudentReturnedToClassInput!) {
    studentReturnedToClass(input: $input) {
      returned
    }
  }
`

export const Status = ({ courseId, students }: StatusProps) => {
  const { loading, data } = useQuery<
    findStudentOutOfClassByPeriodNameAndDateForStudentStatusDisplay,
    findStudentOutOfClassByPeriodNameAndDateForStudentStatusDisplayVariables
  >(FIND_STUDENTS_OUT_OF_CLASS_QUERY, {
    variables: {
      input: { courseId, date: new Date().toLocaleDateString() },
    },
    // onCompleted: (data) => console.log(data),
    pollInterval: 1000,
    onError: (error) => console.error(error),
  })
  const [studentReturnedToClass] = useMutation<
    studentReturnedToClass,
    studentReturnedToClassVariables
  >(STUDENT_RETURNED_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  const studentsCurrentlyOutOfClass =
    data?.findStudentOutOfClassByPeriodNameAndDate.studentsOutOfClass.filter(
      (outOfClassInstance) => !outOfClassInstance.hasReturned
    )!

  const studentsReturnedToClass =
    data?.findStudentOutOfClassByPeriodNameAndDate.studentsOutOfClass.filter(
      (outOfClassInstance) => outOfClassInstance.hasReturned
    )!
  if (loading) return <div>Loading </div>
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 5fr 5fr',
        height: '100%',
      }}
    >
      <div>Student Status Display</div>
      <div>
        <div>Out of Class</div>
        {studentsCurrentlyOutOfClass.map((outOfClassInstance) => (
          <div>
            <div>
              {outOfClassInstance.student.firstName}{' '}
              {outOfClassInstance.student.lastName}
            </div>
            <div>{outOfClassInstance.outOfClassDestination}</div>
            <button
              onClick={() =>
                studentReturnedToClass({
                  variables: {
                    input: { outOfClassId: outOfClassInstance._id! },
                  },
                })
              }
            >
              Returned
            </button>
          </div>
        ))}
      </div>
      <div>
        <div>Returned</div>
        {studentsReturnedToClass.map((outOfClassInstance) => (
          <div>
            <div>
              {outOfClassInstance.student.firstName}{' '}
              {outOfClassInstance.student.lastName}
            </div>
            <div>{outOfClassInstance.outOfClassDestination}</div>
            {/* <button
            onClick={() =>
              studentReturnedToClass({
                variables: {
                  input: { outOfClassId: outOfClassInstance._id! },
                },
              })
            }
          >
            Returned
          </button> */}
          </div>
        ))}
      </div>
    </div>
  )
}

// export type StudentStatusDisplayProps = {
//   courseId: string
//   students: (findCourseByIdForTeachersAid_findCourseById_course_hasCourseInfo_assignedSeats_student | null)[]
// }

// export const StudentStatusDisplay = ({
//   courseId,
//   students,
// }: StudentStatusDisplayProps) => {
//   const { loading, data } = useQuery<
//     findStudentOutOfClassByPeriodNameAndDateForStudentStatusDisplay,
//     findStudentOutOfClassByPeriodNameAndDateForStudentStatusDisplayVariables
//   >(FIND_STUDENTS_OUT_OF_CLASS_QUERY, {
//     variables: {
//       input: { courseId, date: new Date().toLocaleDateString() },
//     },
//     // onCompleted: (data) => console.log(data),
//     pollInterval: 1000,
//     onError: (error) => console.error(error),
//   })
//   const [studentReturnedToClass] = useMutation<
//     studentReturnedToClass,
//     studentReturnedToClassVariables
//   >(STUDENT_RETURNED_MUTATION, {
//     onCompleted: (data) => console.log(data),
//     refetchQueries: [],
//   })

//   const studentsCurrentlyOutOfClass =
//     data?.findStudentOutOfClassByPeriodNameAndDate.studentsOutOfClass.filter(
//       (outOfClassInstance) => !outOfClassInstance.hasReturned
//     )!

//   const studentsReturnedToClass =
//     data?.findStudentOutOfClassByPeriodNameAndDate.studentsOutOfClass.filter(
//       (outOfClassInstance) => outOfClassInstance.hasReturned
//     )!
//   if (loading) return <div>Loading </div>
//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateRows: '1fr 5fr 5fr',
//         height: '100%',
//       }}
//     >
//       <div>Student Status Display</div>
//       <div>
//         <div>Students Out of Class</div>
//         {studentsCurrentlyOutOfClass.map((outOfClassInstance) => (
//           <div>
//             <div>
//               {outOfClassInstance.student.firstName}{' '}
//               {outOfClassInstance.student.lastName}
//             </div>
//             <div>{outOfClassInstance.outOfClassDestination}</div>
//             <button
//               onClick={() =>
//                 studentReturnedToClass({
//                   variables: {
//                     input: { outOfClassId: outOfClassInstance._id! },
//                   },
//                 })
//               }
//             >
//               Returned
//             </button>
//           </div>
//         ))}
//       </div>
//       <div>
//         <div>Returned Students</div>
//         {studentsReturnedToClass.map((outOfClassInstance) => (
//           <div>
//             <div>
//               {outOfClassInstance.student.firstName}{' '}
//               {outOfClassInstance.student.lastName}
//             </div>
//             <div>{outOfClassInstance.outOfClassDestination}</div>
//             {/* <button
//               onClick={() =>
//                 studentReturnedToClass({
//                   variables: {
//                     input: { outOfClassId: outOfClassInstance._id! },
//                   },
//                 })
//               }
//             >
//               Returned
//             </button> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
