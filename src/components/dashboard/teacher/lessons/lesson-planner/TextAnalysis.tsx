import { gql, useMutation } from '@apollo/client'
import {
  CreateTextAnalysis,
  CreateTextAnalysisVariables,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { date } from '../../../../../utils'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

export type TextAnalysisProps = { courseList: any[] }

export const CREATE_TEXT_ANALYSIS_MUTATION = gql`
  mutation CreateTextAnalysis($input: CreateTextAnalysisInput!) {
    createTextAnalysis(input: $input) {
      textAnalyses {
        _id
      }
    }
  }
`
export const TextAnalysis = ({ courseList }: TextAnalysisProps) => {
  const me: me_me_Teacher = useUserContextProvider()
  const [state, event] = useLessonPlannerContextProvider()

  const [createTextAnalyses] = useMutation<
    CreateTextAnalysis,
    CreateTextAnalysisVariables
  >(CREATE_TEXT_ANALYSIS_MUTATION, {
    variables: {
      input: {
        assignedCourseIds: courseList,
        associatedLessonId: '',
        dueDate: state.context.date,
        hasAssignerId: me._id!,
        assignedDate: state.context.date,
        markingPeriod: state.context.markingPeriod,
        maxPoints: 0,
        readings: {
          readingPages:
            state.context.startingPage + ' - ' + state.context.endingPage,
          readingSections:
            state.context.startingSection + ' - ' + state.context.endingSection,
        },
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <div>Text Analysis</div>
    </>
  )
}
