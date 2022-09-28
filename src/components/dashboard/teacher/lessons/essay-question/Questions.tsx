import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackContainer } from '../../assignments/create-assignments/state-and-styles/createAssignmentsStyles'
import { EssayQuestionBuilder } from './build-essay-questions/EssayQuestionBuilder'

export type QuestionsProps = {}

export const Questions = ({}: QuestionsProps) => {
  const navigate = useNavigate()
  return (
    <>
      <BackContainer>
        <div onClick={() => navigate('/dashboard/lessons')}>Back</div>
      </BackContainer>
      <EssayQuestionBuilder />
    </>
  )
}
