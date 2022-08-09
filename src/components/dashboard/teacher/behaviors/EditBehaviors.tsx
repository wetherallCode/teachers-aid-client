import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useEnumContextProvider } from '../../../../contexts/EnumContext'
import { useToggle } from '../../../../hooks'
import {
  editBehaviorTypeVariables,
  editBehaviorType,
  findAllBehaviorTypes,
  findAllBehaviorTypes_findAllBehaviorTypes_behaviorTypes,
  BehaviorQualityEnum,
  deleteBehaviorTypeVariables,
  deleteBehaviorType,
  BehaviorCategoryEnum,
} from '../../../../schemaTypes'

export type EditBehaviorsProps = {
  behavior: findAllBehaviorTypes_findAllBehaviorTypes_behaviorTypes
}

export const EDIT_BEHAVIOR_TYPE_MUTATION = gql`
  mutation editBehaviorType($input: EditBehaviorTypesInput!) {
    editBehaviorTypes(input: $input) {
      updated
    }
  }
`

export const DELETE_BEHAVIOR_TYPE_MUTATION = gql`
  mutation deleteBehaviorType($input: DeleteBehaviorTypeInput!) {
    deleteBehaviorType(input: $input) {
      deleted
    }
  }
`

export const EditBehaviors = ({ behavior }: EditBehaviorsProps) => {
  const { behaviorCategoryEnum } = useEnumContextProvider()
  const [deleteToggle, toggleDelete] = useToggle(false)
  const [editToggle, toggleEdit] = useToggle(false)
  const [behaviorValues, setBehaviorValues] = useState({
    _id: behavior._id!,
    behaviorName: behavior.behaviorName,
    behaviorQuality: behavior.behaviorQuality,
    behaviorCategory: behavior.behaviorCategory,
    points: behavior.points,
    forTeachersAid: behavior.forTeachersAid,
  })

  const [editBehaviorType] = useMutation<
    editBehaviorType,
    editBehaviorTypeVariables
  >(EDIT_BEHAVIOR_TYPE_MUTATION, {
    variables: {
      input: {
        behaviorTypeId: behaviorValues._id!,
        behaviorName: behaviorValues.behaviorName,
        behaviorQuality: behaviorValues.behaviorQuality,
        behaviorCategory: behaviorValues.behaviorCategory,
        points: behaviorValues.points,
        forTeachersAid: behaviorValues.forTeachersAid,
      },
    },
    onCompleted: () => console.log('edited'),
    refetchQueries: ['findAllBehaviorTypes'],
  })
  const [deleteBehavior] = useMutation<
    deleteBehaviorType,
    deleteBehaviorTypeVariables
  >(DELETE_BEHAVIOR_TYPE_MUTATION, {
    variables: { input: { behaviorTypeId: behavior._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findAllBehaviorTypes'],
  })
  useEffect(() => {
    if (editToggle) {
      editBehaviorType()
    }
  }, [behaviorValues])

  return (
    <div>
      <div>
        {editToggle ? (
          <>
            <span>Behavior: </span>
            <input
              value={behaviorValues.behaviorName}
              onChange={(e) =>
                setBehaviorValues({
                  ...behaviorValues,
                  behaviorName: e.target.value,
                })
              }
            />
          </>
        ) : (
          <span>{behavior.behaviorName}</span>
        )}
      </div>
      <div>
        {editToggle ? (
          <>
            <span>Category: </span>
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
          </>
        ) : (
          <span>Category: {behavior.behaviorCategory}</span>
        )}
      </div>
      <div>
        {editToggle ? (
          <>
            <span>For TeachersAid </span>
            <select
              value={behaviorValues.forTeachersAid.toString()}
              onChange={(e: any) =>
                setBehaviorValues({
                  ...behaviorValues,
                  forTeachersAid: e.target.value === 'true' ? true : false,
                })
              }
            >
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          </>
        ) : (
          <span>For TeachersAid: {behavior.forTeachersAid}</span>
        )}
      </div>
      <div>
        <span>Points: </span>
        {editToggle ? (
          <input
            type='number'
            value={behaviorValues.points}
            // placeholder={behaviorValues.points}
            onChange={(e: any) =>
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
          />
        ) : (
          <span>{behavior.points}</span>
        )}
      </div>
      <br />
      {deleteToggle ? (
        <>
          <button onClick={() => deleteBehavior()}>Yes</button>
          <button onClick={() => toggleDelete()}>No</button>
        </>
      ) : (
        <>
          <button onClick={() => toggleEdit()}>
            {editToggle ? 'End' : 'Edit'}
          </button>
          <button onClick={() => toggleDelete()}>Delete</button>
        </>
      )}
    </div>
  )
}
