import React, { FC, useEffect } from 'react'
import { findCompletedEssayById_findEssayById_essay } from '../../../../../../../schemaTypes'

import { DevelopingOrganizer } from './developing/DevelopingOrganizer'
import { AcademicOrganizer } from './academic/AcademicOrganizer'
import { AdvancedOrganizer } from './advanced/AdvancedOrganizer'
import { useCompletedEssayContextProvider } from '../state/CompletedEssayContext'

export type RedoEssayOrganizerProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export const RedoEssayOrganizer: FC<RedoEssayOrganizerProps> = ({ essay }) => {
  const [, event] = useCompletedEssayContextProvider()
  useEffect(() => {
    if (essay.workingDraft.organizer?.__typename === 'DevelopingOrganizer') {
      const organizer = essay.workingDraft.organizer
      event({
        type: 'SET_DEVELOPING_SENTENCE_STRUCTURE',
        payload: {
          subject: organizer!.developingSentenceStructure.subject,
          verb: organizer.developingSentenceStructure.verb,
        },
      })
      event({
        type: 'SET_BASIC_QUESTION_TYPE',
        payload: organizer.basicQuestionType!,
      })
      event({ type: 'SET_RESTATEMENT', payload: organizer.restatement })
      event({ type: 'SET_ANSWER', payload: organizer.answer })
      event({ type: 'SET_CONCLUSION', payload: organizer.conclusion })
    }
    // preloading all the parts of the Academic Organizer with preanswered information
    if (essay.workingDraft.organizer?.__typename === 'AcademicOrganizer') {
      const organizer = essay.workingDraft.organizer

      const answerTypes = organizer.answerType!

      event({
        type: 'SET_ACADEMIC_SENTENCE_STRUCTURE',
        payload: {
          subject: organizer.academicSentenceStructure.subject,
          verb: organizer.academicSentenceStructure.verb,
          object: organizer.academicSentenceStructure.object,
        },
      })
      event({ type: 'SET_RESTATEMENT', payload: organizer.restatement })
      if (organizer.questionType) {
        event({
          type: 'SET_FULL_QUESTION_TYPE',
          payload: organizer.questionType,
        })

        if (answerTypes.__typename === 'ProblemSolutionAnswerType') {
          const type = answerTypes
          event({
            type: 'SET_PROBLEM_SOLUTION',
            payload: {
              problem: type.problem,
              reasonForProblem: type.reasonForProblem,
              solvedBy: type.solvedBy,
              whySolutionSolved: type.whySolutionSolved,
            },
          })
        }
        if (answerTypes.__typename === 'HowCauseEffectAnswerType') {
          const type = answerTypes
          event({
            type: 'SET_HOW_CAUSE_EFFECT',
            payload: {
              before: type.before,
              cause: type.cause,
              after: type.after,
            },
          })
        }
        if (answerTypes.__typename === 'WhyCauseEffectAnswerType') {
          const type = answerTypes
          event({
            type: 'SET_WHY_CAUSE_EFFECT',
            payload: {
              ultimateCause: type.ultimateCause,
              proximateCause: type.proximateCause,
            },
          })
        }
      }
      event({ type: 'SET_CONCLUSION', payload: organizer.conclusion })
    }
    if (essay.workingDraft.organizer?.__typename === 'AdvancedOrganizer') {
      const organizer = essay.workingDraft.organizer

      const answerTypes = organizer.answerType!

      event({
        type: 'SET_ADVANCED_SENTENCE_STRUCTURE',
        payload: {
          subject: organizer.advancedSentenceStructure.subject,
          verb: organizer.advancedSentenceStructure.verb,
          object: organizer.advancedSentenceStructure.object,
        },
      })
      event({ type: 'SET_RESTATEMENT', payload: organizer.restatement })
      if (organizer.questionType) {
        event({
          type: 'SET_FULL_QUESTION_TYPE',
          payload: organizer.questionType,
        })

        if (answerTypes.__typename === 'ProblemSolutionAnswerType') {
          const type = answerTypes
          event({
            type: 'SET_PROBLEM_SOLUTION',
            payload: {
              problem: type.problem,
              reasonForProblem: type.reasonForProblem,
              solvedBy: type.solvedBy,
              whySolutionSolved: type.whySolutionSolved,
            },
          })
        }
        if (answerTypes.__typename === 'HowCauseEffectAnswerType') {
          const type = answerTypes
          event({
            type: 'SET_HOW_CAUSE_EFFECT',
            payload: {
              before: type.before,
              cause: type.cause,
              after: type.after,
            },
          })
        }
        if (answerTypes.__typename === 'WhyCauseEffectAnswerType') {
          const type = answerTypes
          event({
            type: 'SET_WHY_CAUSE_EFFECT',
            payload: {
              ultimateCause: type.ultimateCause,
              proximateCause: type.proximateCause,
            },
          })
        }
      }
      event({ type: 'SET_CONCLUSION', payload: organizer.conclusion })
    }
    event({ type: 'NEXT' })
  }, [essay])

  return (
    <>
      {essay.workingDraft.organizer?.__typename === 'DevelopingOrganizer' && (
        <DevelopingOrganizer essay={essay} />
      )}
      {essay.workingDraft.organizer?.__typename === 'AcademicOrganizer' && (
        <AcademicOrganizer question={essay.topic.question} essay={essay} />
      )}
      {essay.workingDraft.organizer?.__typename === 'AdvancedOrganizer' && (
        <AdvancedOrganizer question={essay.topic.question} essay={essay} />
      )}
    </>
  )
}
