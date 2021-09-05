import React, { FC, useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addStudentsToCourse,
  addStudentsToCourseVariables,
  findAllStudents,
  findCourseByIdForStudentRegistration_findCourseById_course,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initializeStudent,
  initializeStudentVariables,
} from '../../../../../../../schemaTypes'
import { useAddStudentsContextProvider } from '../state-n-styles/AddStudentsContext'
import {
  AdditionalStudentSelect,
  AddStudentContainer,
  BottomButton,
  BottomButtonContainer,
  InformationDetailInputContainer,
  PageTitle,
  RegisterStudentContainer,
} from '../state-n-styles/addStudentsStyles'
import { useNavigate } from 'react-router'

export type AddToCourseProps = {
  course: findCourseByIdForStudentRegistration_findCourseById_course
}

export const ADD_STUDENTS_TO_COURSE_MUTATION = gql`
  mutation addStudentsToCourse($input: AddStudentsToCourseInput!) {
    addStudentsToCourse(input: $input) {
      students {
        _id
        userName
        #   inCourses {
        #     name
        #     hasLessons {
        #       lessonName
        #     }
        #   }
      }
    }
  }
`

export const FIND_ALL_STUDENTS_QUERY = gql`
  query findAllStudents {
    findAllStudents {
      students {
        _id
        firstName
        lastName
        inCourses {
          _id
          hasCourseInfo {
            courseType
          }
        }
      }
    }
  }
`
export const INITIALIZE_STUDENT_MUTATION = gql`
  mutation initializeStudent($input: InitializeStudentsInput!) {
    initializeStudents(input: $input) {
      students {
        _id
      }
    }
  }
`

export const AddToCourse = ({ course }: AddToCourseProps) => {
  const [state, event] = useAddStudentsContextProvider()
  const navigate = useNavigate()

  useEffect(() => {
    event({ type: 'SET_COURSE_ID', payload: course._id! })
  }, [course, event])

  const [initializeStudent] = useMutation<
    initializeStudent,
    initializeStudentVariables
  >(INITIALIZE_STUDENT_MUTATION, {
    variables: {
      input: {
        courseId: state.context.addStudentToCourse.courseId,
        studentIds: state.context.addStudentToCourse.studentIds,
      },
    },
    onCompleted: (data) => {
      console.log(data.initializeStudents.students.length)
      navigate(`/dashboard/courses/${course._id}/roster/add-students`)
      for (const student of state.context.addStudentToCourse.studentIds) {
        const studentIndex =
          state.context.addStudentToCourse.studentIds.findIndex(
            (i) => i === student
          )
        console.log(studentIndex)
        event({ type: 'REMOVE_STUDENT_IDS', payload: studentIndex })
      }
      event({ type: 'IDLE' })
    },
    refetchQueries: ['findAllStudents'],
  })
  console.log(state.context.addStudentToCourse.studentIds)
  const [addStudentsToCourse] = useMutation<
    addStudentsToCourse,
    addStudentsToCourseVariables
  >(ADD_STUDENTS_TO_COURSE_MUTATION, {
    variables: { input: state.context.addStudentToCourse },
    onCompleted: () => {
      initializeStudent()
    },
    refetchQueries: ['findAllUsers'],
  })

  const { loading, data } = useQuery<findAllStudents>(FIND_ALL_STUDENTS_QUERY, {
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const studentsNotInCourse = data?.findAllStudents.students.filter(
    (student) => student.inCourses.length === 0
  )!

  const studentsToAdd = data?.findAllStudents.students.filter((student) =>
    state.context.addStudentToCourse.studentIds.includes(student._id!)
  )

  // console.log(studentsToAdd)
  return (
    <AddStudentContainer>
      <PageTitle>Add To Course</PageTitle>
      <div>
        <div>
          {studentsToAdd?.map((student, i: number) => (
            <InformationDetailInputContainer key={i}>
              <div>
                {i + 1}. {student.lastName}, {student.firstName}
              </div>
              <div
                onClick={() =>
                  event({ type: 'REMOVE_STUDENT_IDS', payload: i })
                }
              >
                Delete
              </div>
            </InformationDetailInputContainer>
          ))}
        </div>
      </div>
      <div>
        <PageTitle>Add Additional Students</PageTitle>
        <br />
        <AdditionalStudentSelect
          onChange={(e: any) =>
            event({ type: 'ADD_STUDENT_IDS', payload: e.target.value })
          }
        >
          <option value='none'>Select a Student</option>
          {studentsNotInCourse?.map((student) => (
            <option key={student._id!} value={student._id!}>
              {student.lastName}, {student.firstName}
            </option>
          ))}
        </AdditionalStudentSelect>
      </div>

      <BottomButtonContainer>
        <BottomButton onClick={() => event({ type: 'IDLE' })}>
          Back
        </BottomButton>
        <BottomButton onClick={() => addStudentsToCourse()}>
          Add to Course
        </BottomButton>
      </BottomButtonContainer>
    </AddStudentContainer>
  )
}
