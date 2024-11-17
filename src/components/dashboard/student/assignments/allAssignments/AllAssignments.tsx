import { useQuery } from '@apollo/client'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { FIND_STUDENT_GRADES_QUERY } from '../../../../../hooks/useCalculateGrades'
import {
  findAllMarkingPeriodGrades,
  findAllMarkingPeriodGradesVariables,
  me_me_Student,
} from '../../../../../schemaTypes'
import {
  AllAssignmentsMainContainer,
  AssignmentDisplayCategoryDisplay,
  AssignmentDisplayContainer,
  AssignmentDisplayTitle,
  AssignmentTypeSelect,
  AssignmentsContainer,
  IndividualAssignment,
} from '../state-n-styles/assignmentsStyles'
import { useStudentAssignmentContextProvider } from '../state-n-styles/StudentAssignmentContext'
import { useState } from 'react'
import { phraseCapitalizer, underscoreEliminator } from '../../../../../utils'

export type AllAssignmentsProps = {}

export const AllAssignments = ({}: AllAssignmentsProps) => {
  const me: me_me_Student = useUserContextProvider()
  const [state] = useStudentAssignmentContextProvider()
  const [categoryState, setCategoryState] = useState<
    'Essay' | 'ReadingGuide' | 'Quiz' | 'TextAnalysis'
  >('Essay')

  const { loading, data } = useQuery<
    findAllMarkingPeriodGrades,
    findAllMarkingPeriodGradesVariables
  >(FIND_STUDENT_GRADES_QUERY, {
    variables: {
      input: {
        markingPeriod: state.context.selectedMarkingPeriod,
        studentId: me._id!,
      },
    },
    onCompleted: (data) => {},
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading....</div>

  const assignments = [...data?.findAllMarkingPeriodGrades.assignments!]
  const essays = assignments.filter(
    (assignment) =>
      (assignment.__typename === 'Essay' &&
        Date.parse(new Date().toLocaleString()) >
          Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`) &&
        !assignment.exempt) ||
      (assignment.__typename === 'Essay' && assignment.finalDraft?.returned),
  )
  const readingGuides = assignments.filter(
    (assignment) =>
      assignment.__typename === 'ReadingGuide' &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`) &&
      !assignment.exempt,
  )

  const textAnalysis = assignments.filter(
    (assignment) =>
      assignment.__typename === 'TextAnalysis' &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`) &&
      !assignment.exempt,
  )

  const quizzes = assignments.filter(
    (assignment) => assignment.__typename === 'Quiz' && !assignment.exempt,
  )

  const dateSort = (a: any, b: any) => (a.dueDate > b.dueDate ? 1 : 0)

  const contractedTitle = (str: string, length: number) =>
    str.length < length ? str : str.slice(0, length) + '...'

  return (
    <AllAssignmentsMainContainer>
      <AssignmentDisplayTitle>
        <div>Assignments</div>
      </AssignmentDisplayTitle>
      <AssignmentTypeSelect>
        <div
          onClick={() => setCategoryState('Essay')}
          style={
            categoryState === 'Essay' ? { textDecoration: 'underline' } : {}
          }
        >
          Essays
        </div>
        <div
          onClick={() => setCategoryState('ReadingGuide')}
          style={
            categoryState === 'ReadingGuide'
              ? { textDecoration: 'underline' }
              : {}
          }
        >
          Reading Guides
        </div>
        <div
          onClick={() => setCategoryState('Quiz')}
          style={
            categoryState === 'Quiz' ? { textDecoration: 'underline' } : {}
          }
        >
          Quizzes
        </div>
        <div
          onClick={() => setCategoryState('TextAnalysis')}
          style={
            categoryState === 'TextAnalysis'
              ? { textDecoration: 'underline' }
              : {}
          }
        >
          Text Analysis
        </div>
      </AssignmentTypeSelect>
      <AssignmentDisplayContainer>
        <AssignmentDisplayCategoryDisplay>
          <div style={{}}>Name</div>
          <div>DueDate</div>
          <div>Score</div>
          {categoryState === 'ReadingGuide' && <div>Effort</div>}
        </AssignmentDisplayCategoryDisplay>
        <>
          {categoryState === 'Essay' && (
            <AssignmentsContainer>
              {essays.sort(dateSort).map((essay, i: number) => {
                return (
                  <IndividualAssignment
                    style={
                      i % 2 === 0
                        ? { background: 'var(--white)' }
                        : { background: 'var(--grey)' }
                    }
                    key={essay.dueDate}
                  >
                    <div>
                      {essay.__typename === 'Essay' &&
                        contractedTitle(essay.readings.readingSections, 55)}
                    </div>
                    <div>{essay.dueDate}</div>
                    {essay.__typename === 'Essay' &&
                    essay.finalDraft &&
                    !essay.finalDraft.returned ? (
                      <div>Pending</div>
                    ) : essay.exempt ? (
                      <div>Exempt</div>
                    ) : essay.missing ? (
                      <div style={{ color: 'var(--red)' }}>Missing</div>
                    ) : (
                      <div>
                        {(essay.score.earnedPoints / essay.score.maxPoints) *
                          100}
                        %
                      </div>
                    )}
                  </IndividualAssignment>
                )
              })}
            </AssignmentsContainer>
          )}
          {categoryState === 'ReadingGuide' && (
            <AssignmentsContainer>
              {readingGuides.sort(dateSort).map((rg, i: number) => {
                return (
                  <IndividualAssignment
                    style={
                      i % 2 === 0
                        ? { background: 'var(--white)' }
                        : { background: 'var(--grey)' }
                    }
                    key={rg.dueDate}
                  >
                    <div>
                      {rg.__typename === 'ReadingGuide' &&
                        contractedTitle(rg.readings.readingSections, 40)}
                    </div>
                    <div>{rg.dueDate}</div>
                    {rg.exempt ? (
                      <div>Exempt</div>
                    ) : rg.missing ? (
                      <div style={{ color: 'var(--red)' }}>Missing</div>
                    ) : (
                      <>
                        <div>
                          {(rg.score.earnedPoints / rg.score.maxPoints) * 100}%
                        </div>
                      </>
                    )}
                    {rg.missing ? (
                      <div></div>
                    ) : (
                      <div>
                        {rg.__typename === 'ReadingGuide' &&
                          phraseCapitalizer(underscoreEliminator(rg.effort))}
                      </div>
                    )}
                  </IndividualAssignment>
                )
              })}
            </AssignmentsContainer>
          )}
          {categoryState === 'Quiz' && (
            <AssignmentsContainer>
              {quizzes.sort(dateSort).map((quiz, i: number) => {
                console.log(quiz)
                return (
                  <IndividualAssignment
                    style={
                      i % 2 === 0
                        ? { background: 'var(--white)' }
                        : { background: 'var(--grey)' }
                    }
                    key={quiz.dueDate}
                  >
                    <div>
                      {quiz.__typename === 'Quiz' &&
                        quiz.readings.readingSections}
                    </div>
                    <div>{quiz.dueDate}</div>
                    {quiz.exempt ? (
                      <div>Exempt</div>
                    ) : quiz.missing ? (
                      <div style={{ color: 'var(--red)' }}>Missing</div>
                    ) : (
                      <div>
                        {(
                          (quiz.score.earnedPoints / quiz.score.maxPoints) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    )}
                  </IndividualAssignment>
                )
              })}
            </AssignmentsContainer>
          )}
          {categoryState === 'TextAnalysis' && (
            <AssignmentsContainer>
              {textAnalysis.sort(dateSort).map((textAnalysis, i: number) => {
                console.log(textAnalysis)
                return (
                  <IndividualAssignment
                    style={
                      i % 2 === 0
                        ? { background: 'var(--white)' }
                        : { background: 'var(--grey)' }
                    }
                    key={textAnalysis.dueDate}
                  >
                    <div>
                      {textAnalysis.__typename === 'TextAnalysis' &&
                        textAnalysis.readings.readingSections}
                    </div>
                    <div>{textAnalysis.dueDate}</div>
                    {textAnalysis.exempt ? (
                      <div>Exempt</div>
                    ) : textAnalysis.missing ? (
                      <div style={{ color: 'var(--red)' }}>Missing</div>
                    ) : (
                      <div>
                        {(
                          (textAnalysis.score.earnedPoints /
                            textAnalysis.score.maxPoints) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    )}
                  </IndividualAssignment>
                )
              })}
            </AssignmentsContainer>
          )}
        </>
      </AssignmentDisplayContainer>
    </AllAssignmentsMainContainer>
  )
}
