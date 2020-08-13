import React, { FC, useState, useCallback } from 'react'
import {
  RandomStudentGeneratorContainer,
  RandomStudentGeneratorButton,
} from '../../styles/classControlPanelStyles'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useRollingArray } from '../../../../../../hooks/useRollingArray'

export type RandomStudentGeneratorProps = {}

export const RandomStudentGenerator: FC<RandomStudentGeneratorProps> = () => {
  const [state, event] = useTeachersAidContextProvider()

  const eligibleStudentList = state.context.courseInfo.assignedSeats
    .filter(
      (seat) =>
        seat.student &&
        !seat.student.hasAbsences
          .map((absence) => absence.dayAbsent)
          .includes(new Date().toLocaleDateString())
    )
    .map((student) => student.student?._id)

  const [selectedStudents, registerNewStudent] = useRollingArray(
    Math.floor(eligibleStudentList.length * 0.6)
  )

  const randomCurrentStudent =
    eligibleStudentList[
      Math.floor(Math.random() * eligibleStudentList.length + 1)
    ]

  const [currentStudent, setCurrentStudent] = useState(randomCurrentStudent!)

  // Math.floor(Math.random() * eligibleStudentList.length + 1)
  //   useEffect(() => {
  //     if (currentStudent === undefined) {
  //       selectNewStudent()
  //       event({
  //         type: 'SET_STUDENT_ID',
  //         payload: currentStudent,
  //       })
  //     }
  //   }, [currentStudent])

  const selectNewStudent = useCallback(() => {
    // Rather than randomising until we get a new student, instead
    // generate the list of available students by excluding the
    // recently called students.
    const availableStudents = eligibleStudentList.filter(
      (student) => !selectedStudents.includes(student)
    )

    const randomStudent =
      availableStudents[Math.floor(Math.random() * availableStudents.length)]
    // Add the new student to our rolling array
    registerNewStudent(randomStudent)
    // Update the react component;
    setCurrentStudent(randomStudent!)
  }, [selectedStudents, eligibleStudentList, registerNewStudent])

  return (
    <RandomStudentGeneratorContainer>
      <RandomStudentGeneratorButton
        onClick={() => {
          selectNewStudent()
          event({
            type: 'SET_STUDENT_ID',
            payload: currentStudent,
          })
        }}
      >
        Random Student
      </RandomStudentGeneratorButton>
    </RandomStudentGeneratorContainer>
  )
}
