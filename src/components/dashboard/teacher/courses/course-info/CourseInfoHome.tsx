import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findCourseInfoByCourseIdForCourseInfo,
  findCourseInfoByCourseIdForCourseInfo_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasAssignments_Essay,
  findCourseInfoByCourseIdForCourseInfoVariables,
} from '../../../../../schemaTypes'

export type CourseInfoHomeProps = {
  courseId: string
}
export const GET_COURSE_INFO_QUERY_FOR_COURSE_INFO = gql`
  query findCourseInfoByCourseIdForCourseInfo(
    $input: FindCourseInfoByCourseIdInput!
  ) {
    findCourseInfoByCourseId(input: $input) {
      courseInfo {
        course {
          name
          hasStudents {
            _id
            hasAbsences {
              dayAbsent
            }
            hasAssignments {
              dueDate
              missing
              ... on Essay {
                _id
                finalDraft {
                  submitted
                  submittedFinalDraft {
                    graded
                  }
                }
                hasOwner {
                  _id
                  firstName
                  lastName
                }
              }
              ... on ReadingGuide {
                completed
                hasOwner {
                  _id
                  firstName
                  lastName
                }
              }
            }
            hasTodaysAssignments {
              missing
              ... on Essay {
                _id
                finalDraft {
                  submitted
                  submittedFinalDraft {
                    graded
                  }
                }
                hasOwner {
                  _id
                  firstName
                  lastName
                }
              }
              ... on ReadingGuide {
                completed
                hasOwner {
                  _id
                  firstName
                  lastName
                }
              }
            }
            hasTodaysBehaviors {
              behavior {
                behaviorCategory
                behaviorName
                behaviorQuality
              }
              responsibilityPoints
              student {
                _id
                lastName
                firstName
              }
            }
            hasBehaviors {
              behavior {
                behaviorCategory
                behaviorName
                behaviorQuality
              }
              responsibilityPoints
              student {
                _id
                lastName
                firstName
              }
            }
            hasTodaysProtocols {
              completed
              student {
                _id
                lastName
                firstName
              }
            }
            hasProtocols {
              completed
              student {
                _id
                lastName
                firstName
              }
            }
          }
        }
      }
    }
  }
`
export const CourseInfoHome = ({ courseId }: CourseInfoHomeProps) => {
  const { loading, data } = useQuery<
    findCourseInfoByCourseIdForCourseInfo,
    findCourseInfoByCourseIdForCourseInfoVariables
  >(GET_COURSE_INFO_QUERY_FOR_COURSE_INFO, {
    variables: {
      input: { courseId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const { hasStudents } = data?.findCourseInfoByCourseId.courseInfo.course!

  const studentsWithHomework = hasStudents.filter((student) =>
    student.hasTodaysAssignments.filter((assignment) => !assignment.missing),
  )

  const studentsWithHomeworkAnyDay = hasStudents
    .map((student) => student.hasAssignments)
    .map((s) =>
      s.filter((s) => s.__typename === 'Essay' && s.dueDate === '1/5/2024'),
    )
  const list: any[] = []

  studentsWithHomeworkAnyDay.forEach((a) => {
    if (a.filter((a) => !a.missing).length > 0) {
      const thing = a.filter((a) => !a.missing)
      list.push(...thing)
    }
  })
  console.log(list.map((assignment) => assignment.hasOwner))
  return (
    <div>
      <div>Course Information</div>
      <div>
        {list.map((a) => {
          console.log(a)
          return (
            <div key={a._id}>
              {a.hasOwner.lastName}, {a.hasOwner.firstName}
            </div>
          )
        })}
      </div>
    </div>
  )
}
