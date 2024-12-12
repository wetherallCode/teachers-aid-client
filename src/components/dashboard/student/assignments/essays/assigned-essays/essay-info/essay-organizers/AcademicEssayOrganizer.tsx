import React, { FC, SyntheticEvent } from 'react'
import {
  EssayOrganizerRestatement,
  EssayOrganizerPartBody,
  EssayOrganizerPartHeader,
  AcademicEssayOrganizerAnswer,
  EssayOrganizerConclusion,
  HowProblemSolutionOrganizerAnswer,
  EssayOrganizerRestatementBody,
  AcademicEssayOrganizerAnswerBlock,
  AcademicEssayOrganizerAnswerBlockBody,
  AcademicEssayOrganizerAnswerBlockHeader,
  HowCauseEffectOrganizerAnswer,
  WhyCauseEffectOrganizerAnswer,
} from '../../state-and-styles/assignedEssayStyles'
import { EssayOrganizerType } from './EssayOrganizer'
import { AcademicProblemSolutionOrganizerDisplay } from './AcademicProblemSolutionOrganizerDisplay'
import { AcademicEssayWhyCauseAndEffectOrganizerDisplay } from './AcademicEssayWhyCauseAndEffectOrganizerDisplay'

export type AcademicEssayOrganizerProps = {
  organizer: EssayOrganizerType
}

export const AcademicEssayOrganizer = ({
  organizer,
}: AcademicEssayOrganizerProps) => {
  const essayOrganizer =
    organizer.__typename === 'AcademicOrganizer' ? organizer : null

  const { verb, subject, object } = essayOrganizer?.academicSentenceStructure!
  const linkingVerbCheck =
    organizer.restatement.split(' ').includes('were') ||
    organizer.restatement.split(' ').includes('was')
  const linkingVerb = organizer.restatement.split(' ').includes('were')
    ? 'were'
    : organizer.restatement.split(' ').includes('was') && 'was'
  return (
    <>
      <EssayOrganizerRestatement>
        <EssayOrganizerPartHeader>Restatement</EssayOrganizerPartHeader>
        <EssayOrganizerPartBody>
          {essayOrganizer?.restatement}
        </EssayOrganizerPartBody>
      </EssayOrganizerRestatement>
      <AcademicEssayOrganizerAnswer>
        <EssayOrganizerPartHeader style={{ textAlign: 'center' }}>
          Answer
        </EssayOrganizerPartHeader>
        <>
          {essayOrganizer?.answerType?.__typename ===
            'HowCauseEffectAnswerType' && (
            <HowCauseEffectOrganizerAnswer>
              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  What was/were things like before?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.before}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>

              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  What caused the Change?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.academicSentenceStructure.subject}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>

              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  How were things different because of {subject}?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.after}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>
              {/* <div>{essayOrganizer.answerType.after}</div> */}
            </HowCauseEffectOrganizerAnswer>
          )}
          {essayOrganizer?.answerType?.__typename ===
            'ProblemSolutionAnswerType' && (
            <AcademicProblemSolutionOrganizerDisplay
              essayOrganizer={essayOrganizer}
            />
          )}
          {essayOrganizer?.answerType?.__typename ===
            'WhyCauseEffectAnswerType' && (
            <AcademicEssayWhyCauseAndEffectOrganizerDisplay
              essayOrganizer={essayOrganizer}
            />
          )}
        </>
      </AcademicEssayOrganizerAnswer>
      <EssayOrganizerConclusion>
        <EssayOrganizerPartHeader>Conclusion</EssayOrganizerPartHeader>
        <EssayOrganizerPartBody
          onCopy={(e: SyntheticEvent) => {
            e.preventDefault()
          }}
        >
          {essayOrganizer?.conclusion}
        </EssayOrganizerPartBody>
      </EssayOrganizerConclusion>
    </>
  )
}
