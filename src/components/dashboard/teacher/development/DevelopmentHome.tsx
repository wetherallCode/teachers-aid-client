import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { GrammarPractice } from './grammar/GrammarPractice'

export type DevelopmentHomeProps = {}

export const DevelopmentHome = ({}: DevelopmentHomeProps) => {
  return (
    <>
      <div>Development Projects</div>
      <nav>
        <Link to={'grammar'}>Grammar Excercises</Link>
      </nav>
      <Routes>
        <Route path={'grammar'} element={<GrammarPractice />} />
      </Routes>
    </>
  )
}
