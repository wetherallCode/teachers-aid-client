import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findReadingGuideById,
  findReadingGuideByIdVariables,
} from '../../../../../schemaTypes'
import { ReadingGuideStart } from './ReadingGuideStart'
import { CompleteReadingGuide } from './CompleteReadingGuide'
import { useReadingGuideToCompleteContextProvider } from './state/ReadingGuideToCompleteContext'
import { VocabList } from './VocabList'
import { ReadingGuideHelp } from './ReadingGuideHelp'

export type ReadingGuideToCompleteProps = {}

export const FIND_READING_GUIDE_BY_ID_QUERY = gql`
  query findReadingGuideById($input: FindReadingGuideByIdInput!) {
    findReadingGuideById(input: $input) {
      readingGuide {
        _id
        readings {
          readingPages
          readingSections
        }
        dueDate
        dueTime
        lessonInfo {
          vocabList {
            word
            definition
          }
          assignedSectionIdList
        }
        readingGuideFinal {
          howIsSectionOrganized
          whyWasSectionOrganized
          majorIssue
          majorSolution
          clarifyingQuestions
        }
      }
    }
  }
`

export const ReadingGuideToComplete: FC<ReadingGuideToCompleteProps> = () => {
  const { readingGuideToComplete } = useParams()
  const [state, event] = useReadingGuideToCompleteContextProvider()

  const { loading, data } = useQuery<
    findReadingGuideById,
    findReadingGuideByIdVariables
  >(FIND_READING_GUIDE_BY_ID_QUERY, {
    variables: {
      input: { readingGuideId: readingGuideToComplete },
    },
    onCompleted: (data) =>
      event({ type: 'SET_READING_GUIDE_ID', payload: readingGuideToComplete }),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      {state.context.updateReadingGuideInputs.readingGuideId && (
        <>
          <div>Reading Guide</div>
          {!data?.findReadingGuideById.readingGuide.readingGuideFinal ? (
            <ReadingGuideStart
              readingGuideInfo={data?.findReadingGuideById.readingGuide!}
              readingGuideToComplete={readingGuideToComplete}
            />
          ) : (
            <>
              <CompleteReadingGuide
                readingGuideInfo={data?.findReadingGuideById.readingGuide!}
              />
              <VocabList
                words={
                  data.findReadingGuideById.readingGuide.lessonInfo.vocabList
                }
              />
              <ReadingGuideHelp />
            </>
          )}
        </>
      )}
    </>
  )
}
