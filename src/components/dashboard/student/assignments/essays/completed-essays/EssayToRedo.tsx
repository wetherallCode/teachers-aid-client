import React, { FC, useEffect, useState } from 'react'
import {
  findCompletedEssayById_findEssayById_essay,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer,
  me_me_Student,
  SubmittedFinalDraftsInput,
} from '../../../../../../schemaTypes'
import { useCompletedEssayContextProvider } from './state/CompletedEssayContext'
import { RedoEssayEditor } from './RedoEssayEditor'
import { SubmitRedoneEssay } from './SubmitRedoneEssay'
import { useNavigate } from 'react-router'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { useClassTimeIndicator } from '../../../../../../hooks/useClassTimeIndicator'
import { useAssignmentsAllowedInClassCheck } from '../../../../../../hooks/useAssignmentsAllowedInClassCheck'

export type EssayToRedoProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export const EssayToRedo = ({ essay }: EssayToRedoProps) => {
  const me: me_me_Student = useUserContextProvider()
  const [state, event] = useCompletedEssayContextProvider()
  // const { assignmentsInClassAllowed } = me.inCourses[0].hasCourseInfo!
  const { assignmentsAllowedInClass } = useAssignmentsAllowedInClassCheck(me)
  const { classTime } = useClassTimeIndicator(me)
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (essay.workingDraft.organizer?.__typename === 'DevelopingOrganizer') {
      const developingOrganizer = essay.workingDraft
        .organizer as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer

      event({
        type: 'SET_DEVELOPING_SENTENCE_STRUCTURE',
        payload: {
          subject: developingOrganizer.developingSentenceStructure.subject,
          verb: developingOrganizer.developingSentenceStructure.verb,
        },
      })
      event({
        type: 'SET_BASIC_QUESTION_TYPE',
        payload: developingOrganizer.basicQuestionType!,
      })
      event({
        type: 'SET_RESTATEMENT',
        payload: developingOrganizer.restatement,
      })
      event({ type: 'SET_ANSWER', payload: developingOrganizer.answer })

      event({
        type: 'SET_CONCLUSION',
        payload: developingOrganizer.conclusion,
      })
    }

    if (essay.workingDraft.organizer?.__typename === 'AcademicOrganizer') {
      const academicOrganizer = essay.workingDraft
        .organizer as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer

      event({
        type: 'SET_ACADEMIC_SENTENCE_STRUCTURE',
        payload: {
          subject: academicOrganizer.academicSentenceStructure.subject,
          verb: academicOrganizer.academicSentenceStructure.verb,
          object: academicOrganizer.academicSentenceStructure.object,
        },
      })

      event({
        type: 'SET_RESTATEMENT',
        payload: academicOrganizer.restatement,
      })

      event({ type: 'SET_CONCLUSION', payload: academicOrganizer.conclusion })
    }

    if (essay.workingDraft.organizer?.__typename === 'AdvancedOrganizer') {
      const advancedOrganizer = essay.workingDraft
        .organizer as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer

      event({
        type: 'SET_ADVANCED_SENTENCE_STRUCTURE',
        payload: {
          subject: advancedOrganizer.advancedSentenceStructure.subject,
          verb: advancedOrganizer.advancedSentenceStructure.verb,
          object: advancedOrganizer.advancedSentenceStructure.object,
        },
      })
      event({
        type: 'SET_RESTATEMENT',
        payload: advancedOrganizer.restatement,
      })
      event({ type: 'SET_CONCLUSION', payload: advancedOrganizer.conclusion })
    }
    setLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [essay])

  const submittedFinalDraft: SubmittedFinalDraftsInput = {
    draftNumber: state.context.draftNumber + 1,
    draft: state.context.draftToUpdate,
    gradingDraft: state.context.draftToUpdate,
    rubricEntries: [],
    additionalComments: [],
    score: 0,
    graded: false,
  }

  useEffect(() => {
    console.log(assignmentsAllowedInClass)
    if (classTime && !assignmentsAllowedInClass)
      navigate('/dashboard/assignments')
  }, [classTime, navigate, assignmentsAllowedInClass])
  return (
    <>
      {loaded && (
        <>
          <RedoEssayEditor essay={essay} />
          {/* <RedoEssayOrganizer essay={essay} /> */}

          <SubmitRedoneEssay
            _id={state.context.essayId}
            submittedFinalDraft={submittedFinalDraft}
          />
        </>
      )}
    </>
  )
}
