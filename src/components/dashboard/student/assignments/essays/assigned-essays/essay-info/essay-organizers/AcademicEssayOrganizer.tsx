import React, { FC } from 'react'
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

export type AcademicEssayOrganizerProps = {
  organizer: EssayOrganizerType
}

export const AcademicEssayOrganizer = ({
  organizer,
}: AcademicEssayOrganizerProps) => {
  const essayOrganizer =
    organizer.__typename === 'AcademicOrganizer' ? organizer : null
  // console.log(essayOrganizer)
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
        <EssayOrganizerPartHeader>Answer</EssayOrganizerPartHeader>
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
                  What was the Object like before?
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
                  How was the Object different because of the Subject?
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
            <HowProblemSolutionOrganizerAnswer>
              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                  borderBottom: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  What was the Problem?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.problem}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>
              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                  borderBottom: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  Why was it a Problem?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.reasonForProblem}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>
              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderRight: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  How was the Problem Solved?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.solvedBy}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>
              <AcademicEssayOrganizerAnswerBlock>
                <AcademicEssayOrganizerAnswerBlockHeader>
                  Why did the Solution Solve the Problem?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.whySolutionSolved}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>
            </HowProblemSolutionOrganizerAnswer>
          )}
          {essayOrganizer?.answerType?.__typename ===
            'WhyCauseEffectAnswerType' && (
            <WhyCauseEffectOrganizerAnswer>
              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  What was the Ultimate Cause?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.ultimateCause}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>
              <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  What was the Proximate Cause?
                </AcademicEssayOrganizerAnswerBlockHeader>
                <AcademicEssayOrganizerAnswerBlockBody>
                  {essayOrganizer.answerType.proximateCause}
                </AcademicEssayOrganizerAnswerBlockBody>
              </AcademicEssayOrganizerAnswerBlock>
              {/* <AcademicEssayOrganizerAnswerBlock
                style={{
                  borderTop: '1px solid var(--blue)',
                  // borderRight: '1px solid var(--blue)',
                }}
              >
                <AcademicEssayOrganizerAnswerBlockHeader>
                  What was the Final Effect?
                </AcademicEssayOrganizerAnswerBlockHeader>
                {!linkingVerbCheck ? (
                  <AcademicEssayOrganizerAnswerBlockBody>
                    {essayOrganizer.academicSentenceStructure.subject}{' '}
                    {essayOrganizer.academicSentenceStructure.verb}ed
                  </AcademicEssayOrganizerAnswerBlockBody>
                ) : (
                  <AcademicEssayOrganizerAnswerBlockBody>
                    {subject} {linkingVerb} {verb} {object}
                  </AcademicEssayOrganizerAnswerBlockBody>
                )}
              </AcademicEssayOrganizerAnswerBlock> */}
            </WhyCauseEffectOrganizerAnswer>
          )}
        </>
      </AcademicEssayOrganizerAnswer>
      <EssayOrganizerConclusion>
        <EssayOrganizerPartHeader>Conclusion</EssayOrganizerPartHeader>
        <EssayOrganizerPartBody>
          {essayOrganizer?.conclusion}
        </EssayOrganizerPartBody>
      </EssayOrganizerConclusion>
    </>
  )
}
