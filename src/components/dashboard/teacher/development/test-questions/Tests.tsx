import React, { useState } from 'react'
import { MultipleChoice } from './MultipleChoice'

export type TestsProps = {}

export type TestTypes = 'multipleChoice'

export const Tests = ({}: TestsProps) => {
  const [test, setTest] = useState<TestTypes>('multipleChoice')
  return (
    <>
      <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
        Multiple Choice
      </div>
      {test === 'multipleChoice' && <MultipleChoice />}
    </>
  )
}
