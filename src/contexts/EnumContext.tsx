import React, { createContext, FC, ReactNode, useContext } from 'react'
import { enumValues } from '../schemaTypes'
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
  }
`

const EnumContext = createContext<any>(undefined)

type EnumContextProps = {
  children: ReactNode
}

export const EnumContextProvider: FC<EnumContextProps> = ({ children }) => {
  const { loading, error, data } = useQuery<enumValues>(ENUM_VALUES)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <EnumContext.Provider
      value={{
        markingPeriodEnum: data?.MarkingPeriod?.enumValues?.map(
          (value) => value.name
        ),
        writingLevelEnum: data?.WritingLevelEnum?.enumValues?.map(
          (value) => value.name
        ),
        questionTypeEnum: data?.QuestionTypeEnum?.enumValues?.map(
          (value) => value.name
        ),
        rubricSectionEnum: data?.RubricSectionEnum?.enumValues?.map(
          (value) => value.name
        ),
        timeOfDayEnum: data?.TimeOfDay?.enumValues?.map((value) => value.name),
        informationStructureEnum: data?.InformationStructureEnum?.enumValues?.map(
          (value) => value.name
        ),
        discussionTypesEnum: data?.DiscussionTypesEnum?.enumValues?.map(
          (value) => value.name
        ),
        protocolAssessmentEnum: data?.ProtocolAssessmentEnum?.enumValues?.map(
          (value) => value.name
        ),
        courseMaxSizeEnum: data?.CourseMaxSizeEnum?.enumValues?.map(
          (value) => value.name
        ),
        courseTypeEnum: data?.CourseTypeEnum?.enumValues?.map(
          (value) => value.name
        ),
        schoolDayType: data?.SchoolDayType?.enumValues?.map(
          (value) => value.name
        ),
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
