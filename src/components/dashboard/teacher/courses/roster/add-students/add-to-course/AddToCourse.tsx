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
import { useAddStudentsContextProvider } from '../state/AddStudentsContext'

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

export const AddToCourse: FC<AddToCourseProps> = ({ course }) => {
  const [state, event] = useAddStudentsContextProvider()

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
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  const [addStudentsToCourse] = useMutation<
    addStudentsToCourse,
    addStudentsToCourseVariables
  >(ADD_STUDENTS_TO_COURSE_MUTATION, {
    variables: { input: state.context.addStudentToCourse },
    onCompleted: (data) => initializeStudent(),
    refetchQueries: [],
  })

  const { loading, data } = useQuery<findAllStudents>(FIND_ALL_STUDENTS_QUERY, {
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const studentsNotInCourse = data?.findAllStudents.students.filter(
    (student) =>
      // student.inCourses.some((courses) => courses._id! !== course._id) ||
      student.inCourses.length === 0 ||
      student.inCourses.some((thisCourse) => thisCourse._id === course._id)
    // &&
    // student.inCourses.some(
    //   (studentdsCourses) =>s
    //     !studentdsCourses.hasCourseInfo.courseType.includes(
    //       course.hasCourseInfo.courseType
    //     )
    // )
  )
  const studentsToAdd = data?.findAllStudents.students.filter((student) =>
    state.context.addStudentToCourse.studentIds.includes(student._id!)
  )

  return (
    <>
      <div onClick={() => event({ type: 'IDLE' })}>Back</div>
      <div>Add To Course</div>
      <div>
        {studentsToAdd?.map((student, i: number) => (
          <div key={i}>
            <div>
              {i}: {student.lastName}, {student.firstName}
            </div>
            <div
              onClick={() => event({ type: 'REMOVE_STUDENT_IDS', payload: i })}
            >
              -
            </div>
          </div>
        ))}
      </div>
      <div>Add Addtional Students</div>
      <select
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
      </select>
      <button onClick={() => addStudentsToCourse()}>Add to Course</button>
    </>
  )
}
