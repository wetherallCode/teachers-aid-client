import { useMutation, useQuery } from '@apollo/client'
import {
  assignTextAnalyses,
  assignTextAnalysesVariables,
  checkQuizQuestionsForTextSections,
  checkQuizQuestionsForTextSectionsVariables,
  CreateTextAnalysis,
  CreateTextAnalysisVariables,
  findLessonById,
  findLessonById_findLessonById_lesson,
  findLessonByIdVariables,
  me_me_Teacher,
} from '../../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'
import { ASSIGN_TEXTANALYSIS_QUERY } from './TextAnalysisAssigner'
import { FIND_LESSON_BY_ID_QUERY } from '../../../../assignments/create-assignments/create-essay/EssayLessonInfo'
import { CREATE_TEXT_ANALYSIS_MUTATION } from '../../../../lessons/lesson-planner/TextAnalysis'
import { useUserContextProvider } from '../../../../../../../contexts/UserContext'
import { CHECK_QUIZ_QUESTIONS_QUERY } from '../../../../assignments/create-assignments/create-readingGuide/CreateReadingGuide'

export type TextAnalysisCreatorProps = {
  presentStudentList: string[]
  lesson: findLessonById_findLessonById_lesson
}

export const TextAnalysisCreator = ({
  presentStudentList,
  lesson,
}: TextAnalysisCreatorProps) => {
  const [state, event] = useTeachersAidContextProvider()
  const me: me_me_Teacher = useUserContextProvider()
  const todaysDate = new Date().toLocaleDateString()
  // lesson.assignedSectionIdList

  const { loading, data: quizQuestionIdData } = useQuery<
    checkQuizQuestionsForTextSections,
    checkQuizQuestionsForTextSectionsVariables
  >(CHECK_QUIZ_QUESTIONS_QUERY, {
    variables: {
      input: { textSectionIds: lesson.assignedSectionIdList },
    },
    // onCompleted: (data) =>
    onError: (error) => console.error(error),
  })

  const [createTextAnalyses] = useMutation<
    CreateTextAnalysis,
    CreateTextAnalysisVariables
  >(CREATE_TEXT_ANALYSIS_MUTATION, {
    variables: {
      input: {
        assignedCourseIds: [state.context.courseInfo?.course._id!],
        associatedLessonId: state.context.associatedLessonId,
        dueDate: todaysDate,
        hasAssignerId: me._id!,
        assignedDate: todaysDate,
        markingPeriod: lesson.assignedMarkingPeriod!,
        maxPoints:
          quizQuestionIdData?.checkQuizQuestionsForTextSections.textSectionIds
            .length!,
        readings: {
          readingPages:
            lesson.pageNumbers.startingPage +
            ' - ' +
            lesson.pageNumbers.endingPage,
          readingSections:
            lesson.assignedSections.startingSection +
            ' - ' +
            lesson.assignedSections.endingSection,
        },
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findTextAnalysesByCourseIdAndDueDate'],
  })

  if (loading) return <div>Loading </div>
  return (
    <div
      style={{
        display: 'grid',
        height: '100%',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          width: '100%',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <div style={{ fontSize: '3vh' }}>Text Analysis Creator</div>
        <br />
        <br />
        <button
          style={{
            backgroundColor: 'var(--blue)',
            color: 'var(--white)',
            width: '45%',
            fontSize: '3vh',
            borderRadius: '5px',
          }}
          onClick={() => createTextAnalyses()}
        >
          Create Text Analyses
        </button>
      </div>
    </div>
  )
}
