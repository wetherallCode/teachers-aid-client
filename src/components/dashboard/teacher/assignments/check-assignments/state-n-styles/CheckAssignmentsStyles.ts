import styled from 'styled-components'

export const ReadingGuideCheckContainer = styled.div``

export const ReadingGuidesToCheckContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export type ReadingGuideToSelectContainerProps = {
  alternatingLine: boolean
}
export const ReadingGuideToSelectContainer = styled.div<ReadingGuideToSelectContainerProps>`
  display: grid;
  grid-template-columns: 2fr 3fr;

  background-color: ${({ alternatingLine }) =>
    alternatingLine ? 'var(--grey)' : 'var(--white)'};
`

export const ReadingGuides = styled.div`
  height: 80vh;
  overflow: scroll;
`
export const ReadingGuideToSelectNameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`

export const ReadingGuideToReviewContainer = styled.div`
  border: 1px solid var(--blue);
  height: 100%;
`
