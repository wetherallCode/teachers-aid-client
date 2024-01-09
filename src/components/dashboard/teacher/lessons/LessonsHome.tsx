import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { SectionBuilder } from './section-builder/SectionBuilder'
import { SectionEditor } from './section-editor/SectionEditor'
import { SectionEditorContextProvider } from './section-editor/state-n-styles/sectionEditorContext'
import { LessonPlanner } from './lesson-planner/LessonPlanner'

import { SectionBuilderContextProvider } from './section-builder/state/SectionBuilderContext'
import { LessonPlannerContextProvider } from './lesson-planner/state-and-styles/lessonPlannerContext'

import { LessonFinder } from './lesson-finder/LessonFinder'
import { LessonFinderContextProvider } from './lesson-finder/state-n-styles/LessonFinderContext'

import { BuildEssayQuestionContextProvider } from './essay-question/build-essay-questions/state-n-styles/BuildEssayQuestionContext'
import { EssayQuestionBuilder } from './essay-question/build-essay-questions/EssayQuestionBuilder'
import { Questions } from './essay-question/Questions'
import { CreateQuiz } from './quiz-creator/CreateQuiz'
import { CreateQuizContextProvider } from './quiz-creator/state-n-styles/CreateQuizContext'
import { useNavSync } from '../../../../hooks/useNavSync'

export const LessonsHome = () => {
  const location = useLocation()
  useNavSync(location, 'LESSONS')
  return (
    <Routes>
      <Route
        path="lesson-planner/:date/*"
        element={
          <LessonPlannerContextProvider>
            <LessonPlanner />
          </LessonPlannerContextProvider>
        }
      />
      <Route
        path=""
        element={
          <LessonFinderContextProvider>
            <LessonFinder />
          </LessonFinderContextProvider>
        }
      />
      <Route
        path="section-builder"
        element={
          <SectionBuilderContextProvider>
            <SectionBuilder />
          </SectionBuilderContextProvider>
        }
      />
      <Route
        path="section-editor"
        element={
          <SectionEditorContextProvider>
            <SectionEditor />
          </SectionEditorContextProvider>
        }
      />
      <Route
        path="essay-question"
        element={
          <BuildEssayQuestionContextProvider>
            <Questions />
          </BuildEssayQuestionContextProvider>
        }
      />
      <Route
        path="create-quiz/:date/*"
        element={
          <CreateQuizContextProvider>
            <CreateQuiz />
          </CreateQuizContextProvider>
        }
      />
    </Routes>
  )
}
