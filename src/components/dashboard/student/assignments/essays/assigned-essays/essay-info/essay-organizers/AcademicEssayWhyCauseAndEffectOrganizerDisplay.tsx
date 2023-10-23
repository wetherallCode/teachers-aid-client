import { useState } from 'react'
import { findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer } from '../../../../../../../../schemaTypes'
import {
  WhyCauseEffectOrganizerAnswer,
  AcademicEssayOrganizerAnswerBlock,
  AcademicEssayOrganizerAnswerBlockHeader,
  AcademicEssayOrganizerAnswerBlockBody,
} from '../../state-and-styles/assignedEssayStyles'

export type AcademicEssayWhyCauseAndEffectOrganizerDisplayProps = {
  essayOrganizer: findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer | null
}

export const AcademicEssayWhyCauseAndEffectOrganizerDisplay = ({
  essayOrganizer,
}: AcademicEssayWhyCauseAndEffectOrganizerDisplayProps) => {
  const [organizerTab, setOrganizerTab] = useState<'PROXIMATE' | 'ULTIMATE'>(
    'PROXIMATE'
  )
  return (
    <div style={{ overflowWrap: 'break-word' }}>
      <br />
      <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
        <div
          style={
            organizerTab === 'ULTIMATE'
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
          onClick={() => setOrganizerTab('ULTIMATE')}
        >
          Ultimate Cause
        </div>
        <div
          style={
            organizerTab === 'PROXIMATE'
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
          onClick={() => setOrganizerTab('PROXIMATE')}
        >
          Proximate Cause
        </div>
      </div>
      <br />
      <div>
        {organizerTab === 'ULTIMATE' && (
          <>
            <AcademicEssayOrganizerAnswerBlockHeader>
              What was the Ultimate Cause?
            </AcademicEssayOrganizerAnswerBlockHeader>
            <br />
            <AcademicEssayOrganizerAnswerBlockBody>
              {essayOrganizer?.answerType?.__typename ===
                'WhyCauseEffectAnswerType' &&
                essayOrganizer.answerType.ultimateCause}
            </AcademicEssayOrganizerAnswerBlockBody>
          </>
        )}
        {organizerTab === 'PROXIMATE' && (
          <>
            <AcademicEssayOrganizerAnswerBlockHeader>
              What was the Proximate Cause?
            </AcademicEssayOrganizerAnswerBlockHeader>
            <br />
            <AcademicEssayOrganizerAnswerBlockBody>
              {essayOrganizer?.answerType?.__typename ===
                'WhyCauseEffectAnswerType' &&
                essayOrganizer.answerType.proximateCause}
            </AcademicEssayOrganizerAnswerBlockBody>
          </>
        )}
      </div>
    </div>
  )
}
