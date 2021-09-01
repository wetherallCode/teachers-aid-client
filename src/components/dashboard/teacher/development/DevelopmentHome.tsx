import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { GrammarPractice } from './grammar/GrammarPractice'
import { Tests } from './test-questions/Tests'

export type DevelopmentHomeProps = {}

export const DevelopmentHome = ({}: DevelopmentHomeProps) => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>Development Projects</div>
      <nav style={{ display: 'grid', gridAutoFlow: 'column' }}>
        <Link to={'grammar'}>Grammar Excercises</Link>
        <Link to={'tests'}>Tests</Link>
      </nav>
      <Routes>
        <Route path={'grammar'} element={<GrammarPractice />} />
        <Route path={'tests'} element={<Tests />} />
      </Routes>
    </>
  )
}
