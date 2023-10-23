import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'

import {
  findEssayById_findEssayById_essay_topic,
  findEssayById_findEssayById_essay_workingDraft_organizer,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
} from '../../../../../../../../schemaTypes'
import { QuestionDeconstruction } from '../question-deconstruction/QuestionDeconstruction'

export type AcademicRestatementProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
  topic: findEssayById_findEssayById_essay_topic
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
}

export const AcademicRestatement = ({
  updateAcademicOrganizer,
  topic,
  questionParts,
}: AcademicRestatementProps) => {
  const [state, event] = useStudentEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()
  }, [
    state.context.academicOrganizer.restatement,
    state.context.academicOrganizer.academicSentenceStructure,
    updateAcademicOrganizer,
  ])
  const { verb, subject } =
    state.context.academicOrganizer.academicSentenceStructure
  const linkingVerbCheck =
    verb.toLowerCase() === 'was' || verb.toLowerCase() === 'were'

  return <QuestionDeconstruction questionParts={questionParts} topic={topic} />
  /*<>
       <OrganizerTitleContainer>
        <OrganizerTitleStyle>
          Organize your essay for this Question
        </OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <QuestionContainer>
        <QuestionStyle>{topic.question}</QuestionStyle>
      </QuestionContainer>

      {!organizer.restatement ? (
        <>
          <OrganizerControlButtonMessageContainer>
            The first step is to restate the question so click Start when ready!
          </OrganizerControlButtonMessageContainer>
          <OrganizerControlButtonContainerIdentifications>
            <OrganizerControlButton
              onClick={() => event({ type: 'RESTATEMENT' })}
            >
              Start
            </OrganizerControlButton>
          </OrganizerControlButtonContainerIdentifications>
        </>
      ) : (
        <>
          <OrganizerControlButtonMessageContainer>
            Since you've already completed the restatement, we're going to go
            right to the answer section of the organizer
          </OrganizerControlButtonMessageContainer>
          <OrganizerControlButtonContainerIdentifications>
            <OrganizerControlButton onClick={() => event({ type: 'ANSWER' })}>
              Start
            </OrganizerControlButton>
          </OrganizerControlButtonContainerIdentifications>
        </>
      )}
    </> */
}
// return (
//   <>
//     <AcademicPartsOfQuestionContainer>
//       <PartsOfQuestionTitle>
//         Set the Parts of the Question
//       </PartsOfQuestionTitle>
//       <AcademicPartContainer>
//         <div>What is the Subject of the question? </div>
//         <PartInput
//           value={
//             state.context.academicOrganizer.academicSentenceStructure.subject
//           }
//           onChange={(e: any) =>
//             event({
//               type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT',
//               payload: e.target.value,
//             })
//           }
//         />
//       </AcademicPartContainer>

//       <AcademicPartContainer>
//         <div>
//           What is the Verb of the question (If the word 'was' or 'were' are in
//           the question, that is the verb)?
//         </div>
//         <PartInput
//           value={
//             state.context.academicOrganizer.academicSentenceStructure.verb
//           }
//           onChange={(e: any) =>
//             event({
//               type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_VERB',
//               payload: e.target.value,
//             })
//           }
//         />
//       </AcademicPartContainer>

//       <AcademicPartContainer>
//         {!linkingVerbCheck ? (
//           <div>What is the Object of the question? </div>
//         ) : (
//           <div>
//             What is the word or phrase describing {subject} or showing an
//             action (include a direct object if there is one)?
//           </div>
//         )}

//         <PartInput
//           value={
//             state.context.academicOrganizer.academicSentenceStructure.object!
//           }
//           onChange={(e: any) =>
//             event({
//               type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_OBJECT',
//               payload: e.target.value,
//             })
//           }
//         />
//       </AcademicPartContainer>
//     </AcademicPartsOfQuestionContainer>
//     {/* <AcademicRestatementContainer>
//       <AcademicRestatementTitle>
//         <div>Restatement</div>
//       </AcademicRestatementTitle>
//       <AcademicRestatementInput
//         type='text'
//         value={state.context.academicOrganizer.restatement}
//         onChange={(e: any) =>
//           event({
//             type: 'SET_RESTATEMENT',
//             payload: e.target.value,
//           })
//         }
//       />
//       <RestatementOutput>
//         <div> {state.context.academicOrganizer.restatement}</div>
//       </RestatementOutput>
//     </AcademicRestatementContainer> */}
//     <OrganizerControlButtonContainer>
//       <OrganizerControlButton onClick={() => event({ type: 'NEXT' })}>
//         Next
//       </OrganizerControlButton>
//     </OrganizerControlButtonContainer>
//   </>
// )
