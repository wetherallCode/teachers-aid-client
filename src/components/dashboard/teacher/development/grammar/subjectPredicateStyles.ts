import styled from 'styled-components'

export const SubjectPredicateContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 3fr;
  justify-items: center;
`
export const DirectionsContainer = styled.div`
  align-self: center;
  font-size: 3.2vh;
`

export const SentenceContainer = styled.div`
  font-size: 3vh;
  /* text-decoration-thickness: 2vh; */
`

type MessageContainerProps = {
  correct: boolean
}

export const MessageContainer = styled.div<MessageContainerProps>`
  font-size: 3vh;
  color: ${({ correct }) => (correct ? 'var(--blue)' : 'var(--red)')};
`
