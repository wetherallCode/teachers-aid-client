import styled from 'styled-components'
// import { media } from '.'

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grey);
  border: 1px solid var(--blue);
  box-shadow: '3px 3px 3px black';
  color: var(--blue);
  height: 35vh;
  font-size: 1.5rem;
`
export const LoginTitle = styled.div`
  font-size: 2rem;
  text-align: center;
  padding: 10%;
`
export const LoginRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2%;
`
export const ButtonContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
`
export const Button = styled.button`
  height: 2rem;
  width: 15rem;
  margin-top: 10%;
  font-size: 1.5rem;
  background: var(--blue);
  color: var(--white);
  justify-self: center;
`
