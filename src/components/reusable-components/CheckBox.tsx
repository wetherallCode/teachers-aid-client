import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: var(--white);
  stroke-width: 3.5px;
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
  boxHeight: number
  boxWidth: number
}
const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-block;
  width: ${({ boxWidth }) => boxWidth}px;
  height: ${({ boxHeight }) => boxHeight}px;
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
  leftMargin?: number
  labelWidth: number
  boxHeight: number
  boxWidth: number
}

const CheckBox = ({
  checked,
  onChange,
  label,
  leftMargin,
  labelWidth,
  boxHeight,
  boxWidth,
  ...props
}: CheckBoxProps) => (
  <>
    <label
      style={{
        width: labelWidth + '%',
        marginLeft: leftMargin ? leftMargin + '%' : 'none',
      }}
    >
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} {...props} onChange={onChange} />
        <StyledCheckbox
          checked={checked}
          boxHeight={boxHeight}
          boxWidth={boxWidth}
        >
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
