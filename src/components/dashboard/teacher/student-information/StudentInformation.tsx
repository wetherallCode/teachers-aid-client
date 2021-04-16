import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useToggle } from '../../../../hooks'
import { findAllStudentsForStudentInformation } from '../../../../schemaTypes'
import { apostopheRemover } from '../../../../utils'
import { InformationDisplay } from './InformationDisplay'
import { useStudentInformationContextProvider } from './state-n-styles/StudentInformationContext'
import {
  SelectStudentTitle,
  StudentInformationContainer,
  StudentInformationTitlePageHeader,
  StudentNameListContainer,
  StudentNameSelectContainer,
  StudentNameSelectorContainer,
  StudentSelectInput,
} from './state-n-styles/studentInformationStyles'

export type StudentInformationProps = {}

export const FIND_ALL_STUDENTS_QUERY = gql`
  query findAllStudentsForStudentInformation {
    findAllStudents {
      students {
        _id
        firstName
        lastName
        inCourses {
          name
        }
      }
    }
  }
`

export const StudentInformation = ({}: StudentInformationProps) => {
  const [state, event] = useStudentInformationContextProvider()
  const [studentName, setStudentName] = useState('')
  const [studentList, toggleStudentList] = useToggle(false)
  const { loading, data } = useQuery<findAllStudentsForStudentInformation>(
    FIND_ALL_STUDENTS_QUERY,
    {
      onCompleted: (data) => {},
      onError: (error) => console.error(error),
    }
  )
  const studentSearchList = data?.findAllStudents.students.filter((student) => {
    return (
      student.inCourses.some((course) => course.name !== 'Cohort Class') &&
      apostopheRemover(student.firstName.trim())
        .substr(0, studentName.length)
        .toLowerCase() ===
        studentName.trim().substr(0, studentName.length).toLowerCase()
    )
  })!

  if (loading) return <div>Loading </div>

  return (
    <StudentInformationContainer>
      <StudentNameSelectContainer>
        <StudentNameSelectorContainer>
          <SelectStudentTitle>Select Student</SelectStudentTitle>
          <StudentSelectInput
            value={studentName}
            autoFocus
            onFocus={() => toggleStudentList()}
            onBlur={(e: any) => (e.target.value = '')}
            onChange={(e: any) => {
              setStudentName(e.target.value)
            }}
          />
        </StudentNameSelectorContainer>

        {studentName.length > 0 && studentList && (
          <StudentNameListContainer>
            {studentSearchList?.map((student) => (
              <div
                onClick={() => {
                  toggleStudentList()
                  setStudentName('')
                  event({ type: 'SET_STUDENT', payload: student })
                }}
                key={student._id}
              >
                {student.firstName + ' ' + student.lastName}
              </div>
            ))}
          </StudentNameListContainer>
        )}
      </StudentNameSelectContainer>

      {state.context.student ? (
        <InformationDisplay />
      ) : (
        <StudentInformationTitlePageHeader>
          Student Information
        </StudentInformationTitlePageHeader>
      )}
    </StudentInformationContainer>
  )
}
