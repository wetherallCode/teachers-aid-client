import { useState } from 'react'
import { findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer } from '../../../../../../../../schemaTypes'
import {
  HowProblemSolutionOrganizerAnswer,
  AcademicEssayOrganizerAnswerBlock,
  AcademicEssayOrganizerAnswerBlockHeader,
  AcademicEssayOrganizerAnswerBlockBody,
} from '../../state-and-styles/assignedEssayStyles'

export type AcademicProblemSolutionOrganizerDisplayProps = {
  essayOrganizer: findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer | null
}

export const AcademicProblemSolutionOrganizerDisplay = ({
  essayOrganizer,
}: AcademicProblemSolutionOrganizerDisplayProps) => {
  const [organizerTab, setOrganizerTab] = useState<
    'PROBLEM' | 'REASON_FOR_PROBLEM' | 'SOLUTION' | 'WHY_SOLUTION_SOLVED'
  >('PROBLEM')
  return (
    <div style={{ overflowWrap: 'break-word' }}>
      <br />
      <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
        <div
          style={
            organizerTab === 'PROBLEM'
              ? {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  borderLeft: '1px solid var(--blue)',
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                  borderBottom: 'none',
                }
              : {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  border: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                }
          }
          onClick={() => setOrganizerTab('PROBLEM')}
        >
          Problem
        </div>
        <div
          style={
            organizerTab === 'REASON_FOR_PROBLEM'
              ? {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  borderLeft: '1px solid var(--blue)',
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                  borderBottom: 'none',
                }
              : {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  border: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                }
          }
          onClick={() => setOrganizerTab('REASON_FOR_PROBLEM')}
        >
          Why was it a Problem
        </div>
        <div
          style={
            organizerTab === 'SOLUTION'
              ? {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  borderLeft: '1px solid var(--blue)',
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                  borderBottom: 'none',
                }
              : {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  border: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                }
          }
          onClick={() => setOrganizerTab('SOLUTION')}
        >
          Solution
        </div>
        <div
          style={
            organizerTab === 'WHY_SOLUTION_SOLVED'
              ? {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  borderLeft: '1px solid var(--blue)',
                  borderTop: '1px solid var(--blue)',
                  borderRight: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                  borderBottom: 'none',
                }
              : {
                  textAlign: 'center',
                  fontSize: '1.6vh',
                  border: '1px solid var(--blue)',
                  borderTopRightRadius: '5px',
                }
          }
          onClick={() => setOrganizerTab('WHY_SOLUTION_SOLVED')}
        >
          Why was it a Solution
        </div>
      </div>
      <br />
      <div>
        {organizerTab === 'PROBLEM' && (
          <>
            <div style={{ textAlign: 'center' }}>What was the Problem?</div>
            <br />
            <div>
              {essayOrganizer?.answerType?.__typename ===
                'ProblemSolutionAnswerType' &&
                essayOrganizer.answerType.problem}
            </div>
          </>
        )}
      </div>
      <div>
        {organizerTab === 'REASON_FOR_PROBLEM' && (
          <>
            <div style={{ textAlign: 'center' }}>Why was it a Problem?</div>
            <br />
            <div>
              {essayOrganizer?.answerType?.__typename ===
                'ProblemSolutionAnswerType' &&
                essayOrganizer.answerType.reasonForProblem}
            </div>
          </>
        )}
      </div>
      <div
        style={{
          borderRight: '1px solid var(--blue)',
        }}
      >
        {organizerTab === 'SOLUTION' && (
          <>
            <div style={{ textAlign: 'center' }}>
              How was the Problem Solved?
            </div>
            <br />
            <div>
              {essayOrganizer?.answerType?.__typename ===
                'ProblemSolutionAnswerType' &&
                essayOrganizer.answerType.solvedBy}
            </div>
          </>
        )}
      </div>
      <div>
        {organizerTab === 'WHY_SOLUTION_SOLVED' && (
          <>
            <div style={{ textAlign: 'center' }}>
              Why did the Solution Solve the Problem?
            </div>
            <br />
            <div>
              {essayOrganizer?.answerType?.__typename ===
                'ProblemSolutionAnswerType' &&
                essayOrganizer.answerType.whySolutionSolved}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
