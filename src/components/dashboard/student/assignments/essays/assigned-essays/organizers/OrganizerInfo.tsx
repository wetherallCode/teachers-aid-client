import React, { useEffect } from 'react'
import { useStudentEssayContextProvider } from '../state-and-styles/StudentEssayContext'
import { DevelopingOrganizer } from './developing/DevelopingOrganizer'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOrganizer,
  setOrganizerVariables,
  findEssayById_findEssayById_essay_workingDraft_organizer,
  findEssayQuestionById,
  findEssayQuestionByIdVariables,
  findEssayById_findEssayById_essay_topic,
  WritingLevelEnum,
} from '../../../../../../../schemaTypes'
import { AcademicOrganizer } from './academic/AcademicOrganizer'
import { AdvancedOrganizer } from './advanced/AdvancedOrganizer'

export type OrganizerInfoProps = {
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
  topic: findEssayById_findEssayById_essay_topic
}

export const SET_ORGANIZER_LEVEL_MUTATION = gql`
  mutation setOrganizer($input: SetOrganizerInput!) {
    setOrganizer(input: $input) {
      essay {
        workingDraft {
          organizer {
            ... on DevelopingOrganizer {
              developingSentenceStructure {
                subject
                verb
                subjectCompliment
                object
              }
              restatement
              conclusion
            }
            ... on AcademicOrganizer {
              academicSentenceStructure {
                subject
                verb
                object
              }
              restatement
              conclusion
            }
            ... on AdvancedOrganizer {
              advancedSentenceStructure {
                subject
                verb
                object
              }
              restatement
              conclusion
            }
          }
        }
      }
    }
  }
`

export const FIND_ESSAY_QUESTION_BY_ID_QUERY = gql`
  query findEssayQuestionById($input: FindEssayQuestionByIdInput!) {
    findEssayQuestionById(input: $input) {
      essayQuestion {
        questionParts {
          originalQuestion
          modifiedQuestion
          questionWord
          helpingVerb
          completeSubject
          completePredicate
          simpleSubject
          simplePredicate
          nounType
          verbType
          compoundNoun
          object
          subjectCompliment
          questionType
        }
      }
    }
  }
`

export const OrganizerInfo = ({ organizer, topic }: OrganizerInfoProps) => {
  const [state] = useStudentEssayContextProvider()

  const { loading, data } = useQuery<
    findEssayQuestionById,
    findEssayQuestionByIdVariables
  >(FIND_ESSAY_QUESTION_BY_ID_QUERY, {
    variables: {
      input: { essayQuestionId: topic.essayQuestionId },
    },
    // onCompleted: (data) =>
    //   console.log(data.findEssayQuestionById.essayQuestion.questionParts),
    onError: (error) => console.error(error),
  })

  const [setOrganizer] = useMutation<setOrganizer, setOrganizerVariables>(
    SET_ORGANIZER_LEVEL_MUTATION,
    {
      variables: {
        input: {
          essayId: state.context.essayId,
          writingLevel: state.context.writingLevel,
        },
      },
      onCompleted: (data) => {
        console.log(data.setOrganizer.essay.workingDraft.organizer)
      },
      onError: (error) => console.error(error),
      refetchQueries: ['findEssayById'],
    },
  )

  useEffect(() => {
    if (!organizer) {
      setOrganizer()
    }
  }, [organizer, setOrganizer])

  if (loading) return <div>Loading </div>
  return (
    <>
      {organizer && (
        <>
          {state.matches('organizers.developingOrganizer') && (
            <DevelopingOrganizer
              topic={topic}
              organizer={organizer}
              questionParts={
                data?.findEssayQuestionById.essayQuestion.questionParts!
              }
            />
          )}
          {state.matches('organizers.academicOrganizer') && (
            <AcademicOrganizer
              topic={topic}
              organizer={organizer}
              questionParts={
                data?.findEssayQuestionById.essayQuestion.questionParts!
              }
            />
          )}
          {state.matches('organizers.advancedOrganizer') && (
            <AdvancedOrganizer topic={topic} organizer={organizer} />
          )}
        </>
      )}
    </>
  )
}
