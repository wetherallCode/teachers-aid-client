import { gql, useMutation } from '@apollo/client'

import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { useMatch } from 'react-router'
import { useEnumContextProvider } from '../../../../contexts/EnumContext'
import { useForm } from '../../../../hooks'
import {
  BehaviorCategoryEnum,
  BehaviorQualityEnum,
  createBehaviorType,
  createBehaviorTypeVariables,
} from '../../../../schemaTypes'

export type CreateBehaviorProps = {}

export const CREATE_BEHAVIOR_TYPE_MUTATION = gql`
  mutation createBehaviorType($input: CreateBehaviorTypeInput!) {
    createBehaviorType(input: $input) {
      behaviorType {
        behaviorName
        behaviorQuality
        behaviorCategory
        points
      }
    }
  }
`

export const CreateBehavior = ({}: CreateBehaviorProps) => {
  const { behaviorCategoryEnum } = useEnumContextProvider()
  const match = useLocation()
  console.log(match)
  const [behaviorValues, setBehaviorValues] = useState({
    behaviorName: '',
    behaviorQuality: BehaviorQualityEnum.NEUTRAL,
    behaviorCategory: BehaviorCategoryEnum.QUESTION_AND_ANSWER,
    points: 0,
    forTeachersAid: true,
  })

  const [createBehavior] = useMutation<
    createBehaviorType,
    createBehaviorTypeVariables
  >(CREATE_BEHAVIOR_TYPE_MUTATION, {
    variables: {
      input: {
        behaviorName: behaviorValues.behaviorName,
        behaviorQuality: behaviorValues.behaviorQuality,
        behaviorCategory: behaviorValues.behaviorCategory,
        points: behaviorValues.points,
        forTeachersAid: behaviorValues.forTeachersAid,
      },
    },
    refetchQueries: ['findAllBehaviorTypes'],
  })

  const handlePointsAllocation = (e: any) => {
    setBehaviorValues({
      ...behaviorValues,
      points: +e.target.value,
      behaviorQuality:
        e.target.value > 0
          ? BehaviorQualityEnum.POSITIVE
          : e.target.value < 0
            ? BehaviorQualityEnum.NEGATIVE
            : BehaviorQualityEnum.NEUTRAL,
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div>Create Behavior</div>
      <div>Behavior Name</div>
      <input
        type="text"
        value={behaviorValues.behaviorName}
        onChange={(e) =>
          setBehaviorValues({ ...behaviorValues, behaviorName: e.target.value })
        }
      />
      <div>Behavior Category</div>
      <select
        value={behaviorValues.behaviorCategory}
        onChange={(e: any) =>
          setBehaviorValues({
            ...behaviorValues,
            behaviorCategory: e.target.value,
          })
        }
      >
        {behaviorCategoryEnum.map((b: BehaviorCategoryEnum) => (
          <option key={b}>{b}</option>
        ))}
      </select>
      <div>Behavior Points</div>
      <input
        type="number"
        value={behaviorValues.points}
        onChange={(e: any) => handlePointsAllocation(e)}
      />
      <div>For TeachersAid</div>
      <select
        value={behaviorValues.forTeachersAid.toString()}
        onChange={(e: any) =>
          setBehaviorValues({
            ...behaviorValues,
            forTeachersAid: e.target.value === 'true' ? true : false,
          })
        }
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <div></div>
      <button
        type="reset"
        onClick={() => {
          createBehavior()
          setBehaviorValues({
            behaviorName: '',
            behaviorQuality: BehaviorQualityEnum.NEUTRAL,
            behaviorCategory: BehaviorCategoryEnum.QUESTION_AND_ANSWER,
            points: 0,
            forTeachersAid: true,
          })
        }}
      >
        Create Behavior
      </button>
    </form>
  )
}
