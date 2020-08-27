import styled from 'styled-components'
import { Standard8x12Container } from '../../../../../../../appStyles'
import { Slate } from 'slate-react'
import { Modal } from '../../../../../../../animations'

export const EssayContainer = styled(Standard8x12Container)`
  height: 95vh;
  border-top: 3px solid var(--white);
`
export const AssignmentDetailsContainer = styled.div`
  grid-row: 1/4;
  grid-column: -4/-1;
  background-color: var(--blue);
  color: var(--white);
  border-left: 3px solid var(--white);
`
export const EssayInfoContainer = styled.div`
  grid-row: 4/-1;
  grid-column: -4/-1;
  background-color: var(--grey);
  color: var(--blue);
  border-left: 3px solid var(--white);
  border-top: 3px solid var(--white);
`
export const OrganizerContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 1/-4;
  border: 1px solid var(--blue);
`
export const OrganizerTitleContainer = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const OrganizerTitleStyle = styled.div`
  font-size: 3rem;
`
export const QuestionContainer = styled.div`
  grid-row: 2/3;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: top;
`

export const QuestionStyle = styled.div`
  font-size: 2rem;
`

export const QuestionTypeContainer = styled.div`
  grid-row: 3/5;
  grid-column: 3/-3;
  align-items: center;
  justify-items: center;
  font-size: 2rem;
  display: grid;
`
export const QuestionTypeQuestionStyle = styled.div`
  align-self: end;
`
export const QuestionTypeAnswerSelectStyle = styled.select`
  width: 17%;
  font-size: 72%;
  height: 37%;
  color: var(--blue);
`

export const PartsOfQuestionContainer = styled.div`
  grid-row: 5/7;
  grid-column: 3/-3;
  display: grid;
`

export const PartsOfQuestionTitle = styled.div`
  font-size: 2rem;
  justify-self: center;
  align-self: center;
`

export const PartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: 1.3rem;
`
export const PartInput = styled.input`
  justify-self: left;
  border: 1px solid var(--white);
  font-size: 1.3rem;
  color: var(--blue);
  border-bottom: 1px solid var(--blue);
  width: 100%;
  :enabled {
    border: 1px solid var(--white);
    border-bottom: 1px solid var(--blue);
  }
`

export const OrganizerControlButtonContainer = styled.div`
  grid-row: -2/-1;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
`

export const OrganizerControlButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  font-size: 2rem;
  width: 75%;
  height: 37%;
  box-shadow: 1px 1px 2px 1px var(--grey);
  border-radius: 5px;
`

export type EssaySubmitButtonProps = {
  submitFinal?: boolean
  color: string
}

export const EssaySubmitButton = styled(OrganizerControlButton)<
  EssaySubmitButtonProps
>`
  font-size: 2rem;
  width: 75%;
  height: 100%;
  box-shadow: 1px 1px 2px 1px var(--grey);
  border-radius: 5px;
  background-color: ${({ color }) => color};
`

export const RestatementContainer = styled.div`
  display: grid;
`
export const RestatementTitle = styled.div`
  grid-row: 3/5;
  grid-column: 3/-3;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 2rem;
`
export const RestatementInput = styled.input`
  grid-row: 5/6;
  grid-column: 3/-3;
  border: 1px solid var(--blue);
  width: 100%;
  height: 20%;
  font-size: 1.2rem;
  color: var(--blue);
  :enabled {
    border: 1px solid var(--white);
    border-bottom: 1px solid var(--blue);
  }
`
export const RestatementOutput = styled.div`
  grid-row: 6/8;
  grid-column: 3/-3;
  display: grid;
  justify-items: left;
  align-items: center;
  font-size: 1.2rem;
  color: var(--blue);
`

export const AnswerInput = styled.textarea`
  grid-row: 5/6;
  grid-column: 3/-3;
  border: 1px solid var(--blue);
  /* width: 100%;*/
  height: 100%;
  font-size: 1.2rem;
  color: var(--blue);
  /* :enabled {
    border: 1px solid var(--white);
    border-bottom: 1px solid var(--blue);
  } */
`
export const AnswerOutput = styled.div`
  grid-row: 6/8;
  grid-column: 3/-3;
  display: grid;
  justify-items: left;
  align-items: center;
  font-size: 1.2rem;
  color: var(--blue);
`

export const EssayEditorBackgroundContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 1/-4;
  border: 1px solid var(--blue);
  display: grid;
`

export const EssayEditorContainer = styled.div`
  grid-row: 1/-2;
  grid-column: 1/-1;
`
export const EssaySheet = styled.div`
  margin: 5%;
  border: 1px solid black;
  box-shadow: 2px 2px 2px 1px var(--grey);
  height: 95%;
`
export const SubmitEssayContainer = styled.div`
  grid-row: 1/-2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
`
export const SubmitEssayModalContainer = styled.div`
  width: 37vw;
  height: 15vh;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  background-color: var(--grey);
  color: var(--blue);
`
export const SubmitEssayModalMessage = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
`

export const SubmitEssayModal = styled(Modal)`
  width: 19%;
  top: 27%;
  left: 27%;
`

export const SubmitEssayModalSubmitButton = styled.button`
  width: 82%;
  height: 54%;
  background-color: var(--blue);
  color: var(--white);
`
