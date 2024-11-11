import { gql, useMutation } from '@apollo/client'
import {
  exemptTextAnalysisById,
  exemptTextAnalysisByIdVariables,
} from '../../../../../../../schemaTypes'

export type IndividualTextAnalysisButtonsProps = {
  textAnalysisId: string
  exempt: boolean
}

export const EXEMPT_TEXT_ANALYSIS_MUTATION = gql`
  mutation exemptTextAnalysisById($input: ExemptTextAnalysisByIdInput!) {
    exemptTextAnalysisById(input: $input) {
      updated
    }
  }
`

export const IndividualTextAnalysisButtons = ({
  textAnalysisId,
  exempt,
}: IndividualTextAnalysisButtonsProps) => {
  const [exemptTextAnalysis] = useMutation<
    exemptTextAnalysisById,
    exemptTextAnalysisByIdVariables
  >(EXEMPT_TEXT_ANALYSIS_MUTATION, {
    variables: { input: { textAnalysisId } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findTextAnalysesByCourseIdAndDueDate'],
  })

  return (
    <>
      <div>
        <button
          style={
            exempt
              ? {
                  backgroundColor: 'var(--grey)',
                  color: 'var(--blue)',
                  borderRadius: '5px',
                  width: '100%',
                }
              : {
                  backgroundColor: 'var(--blue)',
                  color: 'var(--white)',
                  borderRadius: '5px',
                  width: '100%',
                }
          }
          onClick={() => exemptTextAnalysis()}
        >
          {exempt ? 'Exempt' : 'Not Exempt'}
        </button>
      </div>
    </>
  )
}
