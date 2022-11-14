import styled from 'styled-components'

export const HandbookContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 5% 7fr;
  height: 95vh;
`
export const OwnersTitleContainer = styled.div`
  font-size: 5vh;
  display: grid;
  /* grid-template-columns: 1fr 3fr 1fr; */
  align-items: center;
  justify-items: center;
`
export const HandbookContentSelectorContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`
export type ContentSelectorTabProps = {
  selected: boolean
}

export const ContentSelectorTabType = styled.div<ContentSelectorTabProps>`
  border-top: 1px solid var(--blue);
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  cursor: pointer;
  border-bottom: ${({ selected }) => {
    return selected ? '1px solid var(--white)' : '1px solid var(--blue)'
  }};
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-size: 2.5vh;
`
export const HandbookInformationDisplayContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  padding: 5vh;
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  border-bottom: 1px solid var(--blue);
`

export const DisplayTitle = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 4vh;
`
export const ContentContainer = styled.div`
  font-size: 3vh;
`
export const DoubleSidedContentContainer = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
export const TripleSidedContentContainer = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
export const IndividualContentContainer = styled.div`
  :hover {
    border: 1px solid var(--blue);
    border-radius: 2%;
  }
`
export const ContentContainerTitle = styled.div`
  text-align: center;
  font-size: 2.5vh;
`
export const TextAnalysisForStudentLessonContainer = styled.div`
  grid-row: 1/-1;
  grid-column: 1/-1;

  display: grid;
`
