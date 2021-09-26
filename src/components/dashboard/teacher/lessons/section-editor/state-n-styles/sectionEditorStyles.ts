import styled from 'styled-components'

export const ListBoxes = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-gap: 3px;
  height: 40vmin;
  overflow: scroll;
`
export const Boxes = styled.div`
  border: 1px solid var(--blue);
`
export const BoxTitle = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--blue);
  color: var(--white);
  background: var(--blue);
`
export const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  :hover {
    background: var(--grey);
  }
`
export const ListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const AddRemoveButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10%;
  cursor: pointer;
`
