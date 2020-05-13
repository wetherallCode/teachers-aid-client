import styled from 'styled-components'

export const BuilderContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 5fr;
  /* height: 95vh; */
  font-size: 1.5rem;
`

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  text-decoration: underline;
  /* height: 10vh; */
`
Title.displayName = 'SectionBuilderTitle'

export const EditorContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
`
export const TextandChapterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const CenterItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
