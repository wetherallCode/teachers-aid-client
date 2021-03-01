import React from 'react'
import { Routes, Route } from 'react-router'
import { SectionBuilder } from './section-builder/SectionBuilder'
import { SectionEditor } from './section-editor/SectionEditor'
import { SectionEditorContextProvider } from './section-editor/sectionEditorContext'
import { LessonPlanner } from './lesson-planner/LessonPlanner'

import { SectionBuilderContextProvider } from './section-builder/state/SectionBuilderContext'
import { LessonPlannerContextProvider } from './lesson-planner/state-and-styles/lessonPlannerContext'

import { LessonFinder } from './lesson-finder/LessonFinder'
import { LessonFinderContextProvider } from './lesson-finder/state-n-styles/LessonFinderContext'

export const LessonsHome = () => {
  return (
    <Routes>
      <Route
        path='lesson-planner/:date/*'
        element={
          <LessonPlannerContextProvider>
            <LessonPlanner />
          </LessonPlannerContextProvider>
        }
      />
      <Route
        path=''
        element={
          <LessonFinderContextProvider>
            <LessonFinder />
          </LessonFinderContextProvider>
        }
      />
      <Route
        path='section-builder'
        element={
          <SectionBuilderContextProvider>
            <SectionBuilder />
          </SectionBuilderContextProvider>
        }
      />
      <Route
        path='section-editor'
        element={
          <SectionEditorContextProvider>
            <SectionEditor />
          </SectionEditorContextProvider>
        }
      />
      {/* <Route path='' element={<LessonCalendar />} /> */}
    </Routes>
  )
}
