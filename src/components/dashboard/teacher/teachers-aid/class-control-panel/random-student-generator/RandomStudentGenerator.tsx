import React, { FC, useState, useCallback } from 'react'
import {
  RandomStudentGeneratorContainer,
  RandomStudentGeneratorButton,
} from '../../styles/classControlPanelStyles'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useRollingArray } from '../../../../../../hooks/useRollingArray'

export type RandomStudentGeneratorProps = { presentStudentList: string[] }

export const RandomStudentGenerator = ({
  presentStudentList,
}: RandomStudentGeneratorProps) => {
  const [state, event] = useTeachersAidContextProvider()

  // const presentStudentList = state.context
  // 	.courseInfo!.assignedSeats.filter(
  // 		(seat) =>
  // 			seat.student &&
  // 			!seat.student.hasAbsences
  // 				.map((absence) => absence.dayAbsent)
  // 				.includes(new Date().toLocaleDateString())
  // 	)
  // 	.map((student) => student.student?._id)

  const [selectedStudents, registerNewStudent] = useRollingArray(
    Math.floor(presentStudentList.length * 0.6),
  )

  const randomCurrentStudent =
    presentStudentList[
      Math.floor(Math.random() * presentStudentList.length + 1)
    ]

  const [currentStudent, setCurrentStudent] = useState(randomCurrentStudent!)

  // Math.floor(Math.random() * presentStudentList.length + 1)
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
    const availableStudents = presentStudentList.filter(
      (student) => !selectedStudents.includes(student),
    )

    const randomStudent =
      availableStudents[Math.floor(Math.random() * availableStudents.length)]
    // Add the new student to our rolling array
    registerNewStudent(randomStudent)
    // Update the react component;
    setCurrentStudent(randomStudent!)
  }, [selectedStudents, presentStudentList, registerNewStudent])

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
