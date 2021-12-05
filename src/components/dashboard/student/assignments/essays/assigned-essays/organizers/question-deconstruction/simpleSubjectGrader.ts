import { NounTypeEnum } from '../../../../../../../../schemaTypes'

type SimpleSubjectGraderProps = {
  correctSimpleSubject: string
  givenSimpleSubject: string
  completeSubject: string
  compoundNoun: boolean
  questionToModify: string[]
  nounType: NounTypeEnum
}

export const simpleSubjectGrader = ({
  correctSimpleSubject,
  givenSimpleSubject,
  completeSubject,
  compoundNoun,
  nounType,
  questionToModify,
}: SimpleSubjectGraderProps) => {
  console.log(correctSimpleSubject)
  const lastWordInQuestion = questionToModify
    .slice(questionToModify.length - 1)
    .join('')
    .split('')
    .filter((letter) => letter !== '.')
    .join('')
  const questionWithSeparatedPunctuation = [
    ...questionToModify.slice(0, questionToModify.length - 1),
    lastWordInQuestion,
    '.',
  ]
  for (const wordInSelection of givenSimpleSubject
    .trim()
    .split(' ')
    .filter((wordToFilter) => wordToFilter !== '')) {
    if (
      givenSimpleSubject &&
      !questionWithSeparatedPunctuation.includes(wordInSelection)
    ) {
      return {
        correctSimpleSubject: false,
        whatWentWrong: 'You selected a partial word.',
        howToFix: `Make sure you select an entire word or a group of words.`,
      }
    }
  }
  if (givenSimpleSubject === ' ') {
    return {
      whatWentWrong: `You didn't select a word.`,
      howToFix: `Select a word or a group of words if the simple subject is a person with a first and last name or a thing has a name that is more than one word.`,
      correctSimpleSubject: false,
    }
  }

  if (
    !completeSubject.toLowerCase().includes(givenSimpleSubject.toLowerCase())
  ) {
    return {
      whatWentWrong:
        'Your simple subject is in the predicate when it should be in the subject.',
      howToFix: `Look at the subject to the left of the dividing line only and find the ${nounType.toLowerCase()} that is in the complete subject.`,
      correctSimpleSubject: false,
    }
  }
  // console.log(
  //   completeSubject.toLowerCase().includes(givenSimpleSubject.toLowerCase()) &&
  //     !correctSimpleSubject
  //       .toLowerCase()
  //       .includes(givenSimpleSubject.toLowerCase())
  // )
  if (
    completeSubject.toLowerCase().includes(givenSimpleSubject.toLowerCase()) &&
    !correctSimpleSubject
      .toLowerCase()
      .includes(givenSimpleSubject.toLowerCase())
  ) {
    return {
      whatWentWrong: `Your simple subject is not the noun or the complete noun (more than one word noun) in the complete subject. You have probably selected an adjective or a prepositional phrase describing the ${nounType.toLowerCase()}.`,
      howToFix:
        'Find the person, place, idea, or thing that is in the complete subject.',
      correctSimpleSubject: false,
    }
  }
  if (compoundNoun && givenSimpleSubject.split(' ').length === 1) {
    return {
      whatWentWrong: `The simple subject is more than one word`,
      howToFix: `Select a group of words because the simple subject may be a person with a first and last name or a thing has a name that is more than one word.`,
      correctSimpleSubject: false,
    }
  }
  if (givenSimpleSubject.toLowerCase() !== correctSimpleSubject.toLowerCase()) {
    return {
      whatWentWrong: `Your simple subject is not the noun or the complete noun (more than one word noun) in the complete subject. You have probably selected an adjective or a prepositional phrase describing the ${nounType.toLowerCase()}.`,
      howToFix:
        'Find the person, place, idea, or thing that is in the complete subject.',
      correctSimpleSubject: false,
    }
  }

  return {
    correctSimpleSubject: true,
    message: 'Great job!',
  }
}
