import React, { createContext, FC, ReactNode, useContext } from 'react'

import { useQuery, gql } from '@apollo/client'

export const ENUM_VALUES = gql`
  query enumValues {
    MarkingPeriod: __type(name: "MarkingPeriodEnum") {
      enumValues {
        name
      }
    }
    WritingLevelEnum: __type(name: "WritingLevelEnum") {
      enumValues {
        name
      }
    }
    QuestionTypeEnum: __type(name: "QuestionTypeEnum") {
      enumValues {
        name
      }
    }
    RubricSectionEnum: __type(name: "RubricSectionEnum") {
      enumValues {
        name
      }
    }
    TimeOfDay: __type(name: "TimeOfDay") {
      enumValues {
        name
      }
    }
    InformationStructureEnum: __type(name: "InformationStructureEnum") {
      enumValues {
        name
      }
    }
    DiscussionTypesEnum: __type(name: "DiscussionTypesEnum") {
      enumValues {
        name
      }
    }
    ProtocolAssessmentEnum: __type(name: "ProtocolAssessmentEnum") {
      enumValues {
        name
      }
    }
    CourseMaxSizeEnum: __type(name: "CourseMaxSizeEnum") {
      enumValues {
        name
      }
    }
    CourseTypeEnum: __type(name: "CourseTypeEnum") {
      enumValues {
        name
      }
    }
    SchoolDayType: __type(name: "SchoolDayType") {
      enumValues {
        name
      }
    }
    AcademicOutcomeTypes: __type(name: "AcademicOutcomeTypes") {
      enumValues {
        name
      }
    }
    ProtocolActivityTypes: __type(name: "ProtocolActivityTypes") {
      enumValues {
        name
      }
    }
    ContactTypeEnum: __type(name: "ContactTypeEnum") {
      enumValues {
        name
      }
    }
    NounTypeEnum: __type(name: "NounTypeEnum") {
      enumValues {
        name
      }
    }
    VerbTypeEnum: __type(name: "VerbTypeEnum") {
      enumValues {
        name
      }
    }
    QuestionWordEnum: __type(name: "QuestionWordEnum") {
      enumValues {
        name
      }
    }
    LessonTypeEnum: __type(name: "LessonTypeEnum") {
      enumValues {
        name
      }
    }
    BehaviorEnum: __type(name: "BehaviorEnum") {
      enumValues {
        name
      }
    }
    QuizQuestionDifficultyLevelEnum: __type(
      name: "QuizQuestionDifficultyLevelEnum"
    ) {
      enumValues {
        name
      }
    }
    QuizQuestionTypeEnum: __type(name: "QuizQuestionTypeEnum") {
      enumValues {
        name
      }
    }
    ReadingGuideReviewOptionsEnum: __type(
      name: "ReadingGuideReviewOptionsEnum"
    ) {
      enumValues {
        name
      }
    }
    SchoolDayLengthEnum: __type(name: "SchoolDayLengthEnum") {
      enumValues {
        name
      }
    }
    BehaviorQualityEnum: __type(name: "BehaviorQualityEnum") {
      enumValues {
        name
      }
    }
    BehaviorCategoryEnum: __type(name: "BehaviorCategoryEnum") {
      enumValues {
        name
      }
    }
    OutOfClassDestinationEnum: __type(name: "OutOfClassDestinationEnum") {
      enumValues {
        name
      }
    }
    TextAnalysisCompletionEnum: __type(name: "TextAnalysisCompletionEnum") {
      enumValues {
        name
      }
    }
    ReadingGuideMetricEnum: __type(name: "ReadingGuideMetricEnum") {
      enumValues {
        name
      }
    }
    ActivityTimeEnum: __type(name: "ActivityTimeEnum") {
      enumValues {
        name
      }
    }
  }
`

const EnumContext = createContext<any>(undefined)

type EnumContextProps = {
  children: ReactNode
}

export const EnumContextProvider: FC<EnumContextProps> = ({ children }) => {
  const { loading, error, data } = useQuery<any>(ENUM_VALUES, {
    // onCompleted: (data) => console.log(data),
    onError: (error) => error && <div>Things went wrong, please refresh!</div>,
  })
  if (loading)
    return (
      <div
        style={{
          display: 'grid',
          fontSize: '3vw',
          color: 'var(--blue)',
          height: '100vh',
        }}
      >
        <div style={{ justifySelf: 'center', alignSelf: 'center' }}>
          <span>Almost there... </span>
        </div>
      </div>
    )

  return (
    <EnumContext.Provider
      value={{
        markingPeriodEnum: data?.MarkingPeriod?.enumValues?.map(
          (value: any) => value.name
        )!,
        writingLevelEnum: data?.WritingLevelEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        questionTypeEnum: data?.QuestionTypeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        rubricSectionEnum: data?.RubricSectionEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        timeOfDayEnum: data?.TimeOfDay?.enumValues?.map(
          (value: any) => value.name
        )!,
        informationStructureEnum:
          data?.InformationStructureEnum?.enumValues?.map(
            (value: any) => value.name
          )!,
        discussionTypesEnum: data?.DiscussionTypesEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        protocolAssessmentEnum: data?.ProtocolAssessmentEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        courseMaxSizeEnum: data?.CourseMaxSizeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        courseTypeEnum: data?.CourseTypeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        schoolDayType: data?.SchoolDayType?.enumValues?.map(
          (value: any) => value.name
        )!,
        schoolDayLengthEnum: data?.SchoolDayLengthEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        academicOutcomeTypes: data?.AcademicOutcomeTypes?.enumValues?.map(
          (value: any) => value.name
        )!,
        protocolActivityTypes: data?.ProtocolActivityTypes?.enumValues?.map(
          (value: any) => value.name
        )!,
        contactTypeEnum: data?.ContactTypeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        nounTypeEnum: data?.NounTypeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        verbTypeEnum: data?.VerbTypeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        questionWordEnum: data?.QuestionWordEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        lessonTypeEnum: data?.LessonTypeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        behaviorEnum: data?.BehaviorEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        quizQuestionDifficultyLevelEnum:
          data?.QuizQuestionDifficultyLevelEnum?.enumValues?.map(
            (value: any) => value.name
          )!,
        quizQuestionTypeEnum: data?.QuizQuestionTypeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        readingGuideReviewOptionsEnum:
          data?.ReadingGuideReviewOptionsEnum?.enumValues?.map(
            (value: any) => value.name
          )!,
        behaviorQualityEnum: data?.BehaviorQualityEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        behaviorCategoryEnum: data?.BehaviorCategoryEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        outOfClassDestinationEnum:
          data?.OutOfClassDestinationEnum?.enumValues?.map(
            (value: any) => value.name
          )!,
        textAnalysisCompletionEnum:
          data?.TextAnalysisCompletionEnum?.enumValues?.map(
            (value: any) => value.name
          )!,
        readingGuideMetricEnum: data?.ReadingGuideMetricEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
        activityTimeEnum: data?.activityTimeEnum?.enumValues?.map(
          (value: any) => value.name
        )!,
      }}
    >
      {children}
    </EnumContext.Provider>
  )
}

export function useEnumContextProvider() {
  const context = useContext(EnumContext)

  if (context === undefined) {
    throw new Error(
      'useEnumContextProvider must be used within a EnumContextProvider'
    )
  }

  return context
}
