import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  createStudentOutOfClassVariables,
  createStudentOutOfClass,
  MarkingPeriodEnum,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student,
  studentReturnedToClassVariables,
  studentReturnedToClass,
} from '../../../../../../schemaTypes'
import { STUDENT_RETURNED_MUTATION } from '../../main-screen/status/Status'
import {
  StudentBehaviorButton,
  StudentBehaviorButtonContainer,
  StudentBehaviorContainer,
  StudentBehaviorTitle,
} from '../../styles/studentInfoStyles'

export type StudentStatusProps = {
  student: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student
  markingPeriod: MarkingPeriodEnum
}

export const CREATE_STUDENT_OUT_OF_CLASS_MUTATION = gql`
  mutation createStudentOutOfClass($input: CreateStudentOutOfClassInput!) {
    createStudentOutOfClass(input: $input) {
      studentOutOfClass {
        _id
      }
    }
  }
`

export const StudentStatus = ({
  student,
  markingPeriod,
}: StudentStatusProps) => {
  const { outOfClassDestinationEnum } = useEnumContextProvider()

  const [createStudentOutOfClass] = useMutation<
    createStudentOutOfClass,
    createStudentOutOfClassVariables
  >(CREATE_STUDENT_OUT_OF_CLASS_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })
  const [studentReturnedToClass] = useMutation<
    studentReturnedToClass,
    studentReturnedToClassVariables
  >(STUDENT_RETURNED_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })
  const isStudentOutOfClass = student.hasStatus.filter(
    (status) => !status.hasReturned
  )
  const studentOutOfClass = isStudentOutOfClass.length === 1
  const outOfClassObject = student.hasStatus.find(
    (status) => !status.hasReturned
  )
  console.log(outOfClassObject)
  return (
    <StudentBehaviorContainer>
      <StudentBehaviorTitle>Student Status</StudentBehaviorTitle>
      {!studentOutOfClass ? (
        <StudentBehaviorButtonContainer>
          {outOfClassDestinationEnum.map((destination: any) => (
            <StudentBehaviorButton
              goodBehavior={true}
              key={destination}
              onClick={() =>
                createStudentOutOfClass({
                  variables: {
                    input: {
                      date: new Date().toLocaleDateString(),
                      markingPeriod,
                      outOfClassDestination: destination,
                      studentId: student._id!,
                    },
                  },
                })
              }
            >
              {destination}
            </StudentBehaviorButton>
          ))}
        </StudentBehaviorButtonContainer>
      ) : (
        <StudentBehaviorButtonContainer>
          <StudentBehaviorButton
            goodBehavior={true}
            // key={destination}
            onClick={() =>
              studentReturnedToClass({
                variables: {
                  input: {
                    outOfClassId: outOfClassObject?._id!,
                  },
                },
              })
            }
          >
            Returned
          </StudentBehaviorButton>
        </StudentBehaviorButtonContainer>
      )}
    </StudentBehaviorContainer>
  )
}
