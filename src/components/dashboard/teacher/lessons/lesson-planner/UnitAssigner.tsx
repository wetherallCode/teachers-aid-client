import React, { FC, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  findUnits,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createUnit,
  createUnitVariables,
} from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  LessonPlannerSectionHeader,
  LessonPlannerSectionBody,
  LessonPlannerListSelectorOption,
  SectionPickerButtonContainer,
  SectionPickerNextButton,
  UnitSectionBody,
  CreateUnitContainer,
  CreateUnitInput,
  CreateUnitButton,
  UnitSelectorOption,
} from './state-and-styles/lessonPlannerStyles'

export type UnitAssignerProps = {}

export const FIND_UNITS_QUERY = gql`
  query findUnits {
    findUnits {
      units {
        _id
        unitName
      }
    }
  }
`

export const CREATE_UNIT_MUTATION = gql`
  mutation createUnit($input: CreateUnitInput!) {
    createUnit(input: $input) {
      unit {
        _id
      }
    }
  }
`

export const UnitAssigner: FC<UnitAssignerProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const [unitName, setUnitName] = useState('')
  const { loading, data } = useQuery<findUnits>(FIND_UNITS_QUERY, {
    onError: (error) => console.error(error),
  })

  const [createUnit] = useMutation<createUnit, createUnitVariables>(
    CREATE_UNIT_MUTATION,
    {
      variables: { input: { unitName } },
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findUnits'],
    }
  )

  return (
    <>
      <LessonPlannerSectionHeader>
        <div>Assign to Unit: </div>
      </LessonPlannerSectionHeader>
      {loading ? (
        <UnitSectionBody>Loading Units...</UnitSectionBody>
      ) : (
        <>
          <UnitSectionBody>
            {data?.findUnits.units.map((unit) => (
              <UnitSelectorOption
                key={unit._id!}
                selected={state.context.inUnit === unit._id!}
                onClick={() => event({ type: 'SET_UNIT', payload: unit._id! })}
              >
                {unit.unitName}
              </UnitSelectorOption>
            ))}
          </UnitSectionBody>
          <CreateUnitContainer>
            <div>Create New Unit</div>
            <CreateUnitInput
              onChange={(e: any) => setUnitName(e.target.value)}
            />
            <CreateUnitButton onClick={() => createUnit()}>
              Create
            </CreateUnitButton>
          </CreateUnitContainer>
        </>
      )}
      <SectionPickerButtonContainer>
        <SectionPickerNextButton onClick={() => event({ type: 'PREVIOUS' })}>
          Back
        </SectionPickerNextButton>
        {state.context.inUnit && (
          <SectionPickerNextButton onClick={() => event({ type: 'NEXT' })}>
            Next
          </SectionPickerNextButton>
        )}
      </SectionPickerButtonContainer>
    </>
  )
}
