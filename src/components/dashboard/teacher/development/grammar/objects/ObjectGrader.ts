import { irregularPastTenseVerbList } from '../../../../../../utils'
import { findPreposition } from '../simple-subject-predicate/findPreposition'

type ObjectGraderProps = {
  givenObject: string
  correctObject: string
  completePredicate: string
  completeSubject: string
  simplePredicate: string
}

export function objectGrader({
  givenObject,
  correctObject,
  completePredicate,
  completeSubject,
  simplePredicate,
}: ObjectGraderProps) {
  const conjugatedVerb =
    irregularPastTenseVerbList(simplePredicate) === simplePredicate
      ? simplePredicate + 'ed'
      : irregularPastTenseVerbList(simplePredicate)
  const nonContextSentence =
    completeSubject + ' ' + conjugatedVerb + ' ' + correctObject

  console.log(givenObject === correctObject)
  if (givenObject !== '' && completeSubject.includes(givenObject)) {
    return {
      correctObject: false,
      message: 'Your object must be in the predicate.',
      howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
    }
  }
  if (givenObject !== '' && givenObject.includes(simplePredicate)) {
    return {
      correctObject: false,
      message: `Your object must come after the verb: ${simplePredicate}`,
      howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
    }
  }
  if (givenObject !== '' && findPreposition(givenObject)) {
    return {
      correctObject: false,
      message: 'Your object cannot include a preposition.',
      howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
    }
  }
  if (givenObject !== '' && !nonContextSentence.includes(givenObject)) {
    return {
      correctObject: false,
      message:
        'Your selection is not the word that comes right after the verb.',
      howToFix: `The Object of the verb is going to come directly after the verb.`,
    }
  }
  if (
    givenObject !== '' &&
    // !findPreposition(givenObject) &&
    givenObject !== correctObject
  ) {
    // if the given is one word but the correct is more than one word
    if (
      givenObject.split(' ').length === 1 &&
      correctObject.split(' ').length > 1
    ) {
      console.log('given is one word but the correct is more than one word')
    }
    // if the given is more than one word, but the correct is one word
    if (
      givenObject.split(' ').length > 1 &&
      correctObject.split(' ').length === 1
    ) {
      console.log('given is more than one word, but the correct is one word')
    }
    return {
      correctObject: false,
      message: 'Your selection is not the object. Please try again.',
      howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
    }
  }
  return { correctObject: true, correctMessage: 'Good Job' }
}
