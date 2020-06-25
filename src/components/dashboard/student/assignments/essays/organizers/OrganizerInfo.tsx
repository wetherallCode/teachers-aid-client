import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../StudentEssayContext'
import { DevelopingOrganizer } from './developing/DevelopingOrganizer'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOrganizer,
  setOrganizerVariables,
  findEssayById_findEssayById_essay_workingDraft_organizer,
} from '../../../../../../schemaTypes'
import { AcademicOrganizer } from './academic/AcademicOrganizer'
import { AdvancedOrganizer } from './advanced/AdvancedOrganizer'

export type OrganizerInfoProps = {
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
  question: string
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

export const OrganizerInfo: FC<OrganizerInfoProps> = ({
  organizer,
  question,
}) => {
  const [state] = useStudentEssayContextProvider()

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
    }
  )

  useEffect(() => {
    if (!organizer) {
      setOrganizer()
    }
  }, [organizer, setOrganizer])

  return (
    <>
      {organizer && (
        <>
          {state.matches('organizers.developingOrganizer') && (
            <DevelopingOrganizer />
          )}
          {state.matches('organizers.academicOrganizer') && (
            <AcademicOrganizer question={question} />
          )}
          {state.matches('organizers.advancedOrganizer') && (
            <AdvancedOrganizer question={question} />
          )}
        </>
      )}
    </>
  )
}
