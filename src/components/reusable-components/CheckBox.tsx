import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: var(--white);
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
export type StyledCheckboxProps = {
  checked: boolean
}
const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked }) => (checked ? 'var(--blue)' : 'var(--white)')};
  border-radius: 3px;
  border: 1px solid var(--blue);
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px var(--white);
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`

export type CheckBoxProps = {
  checked: boolean
  onChange: (e: any) => void
  value: any
  label: string
}

const CheckBox = ({ checked, onChange, label, ...props }: CheckBoxProps) => (
  <>
    <label style={{ width: '40%' }}>
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} {...props} onChange={onChange} />
        <StyledCheckbox checked={checked}>
          <Icon viewBox='0 3 24 24'>
            <polyline points='20 6 9 17 4 12' />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <span style={{ marginLeft: '1%' }}>{label}</span>
    </label>
  </>
)

export default CheckBox
