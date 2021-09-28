import { VerbTypeEnum } from '../../../../../../../../schemaTypes'
import { findPreposition } from './findPreposition'

export type SimplePredicateGraderProps = {
  correctSimplePredicate: string
  givenSimplePredicate: string | null
  completePredicate: string
  verbType: string
  helpingVerb: string
  questionToModify: string[]
  auxilaryVerbCheck: boolean
}

export const simplePredicateGrader = ({
  correctSimplePredicate,
  givenSimplePredicate,
  completePredicate,
  verbType,
  helpingVerb,
  questionToModify,
  auxilaryVerbCheck,
}: SimplePredicateGraderProps) => {
  const verbPhrase = correctSimplePredicate.split(' ').length > 1

  const verbTypeTranslator =
    verbType === VerbTypeEnum.ACTION
      ? 'action word'
      : verbType === VerbTypeEnum.BEING
      ? 'being word'
      : verbType === VerbTypeEnum.HAVING
      ? 'having word'
      : 'feeling word'

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

  for (const wordInSelection of givenSimplePredicate!
    .trim()
    .split(' ')
    .filter((wordToFilter) => wordToFilter !== '')) {
    const lastWordWithOutPeriod = questionToModify[
      questionToModify.length - 1
    ].slice(0, questionToModify[questionToModify.length - 1].length - 1)

    const completeQuestion = [...questionToModify, lastWordWithOutPeriod]
    if (
      (givenSimplePredicate && !completeQuestion.includes(wordInSelection)) ||
      !lastWordWithOutPeriod
    ) {
      return {
        correctSimplePredicate: false,
        whatWentWrong: 'You selected a partial word.',
        howToFix: `Make sure you select an entire word or a group of words.`,
      }
    }
  }

  if (givenSimplePredicate === correctSimplePredicate) {
    return {
      correctSimplePredicate: true,
      message: 'Right again!',
    }
  }
  if (givenSimplePredicate && findPreposition(givenSimplePredicate.trim())) {
    return {
      whatWentWrong: 'Your object cannot include a preposition.',
      howToFix:
        'Find the action, being, having, or feeling word that is in the complete predicate.',
      correctSimplePredicate: false,
    }
  }
  if (
    verbPhrase &&
    givenSimplePredicate?.split(' ').length === 1 &&
    correctSimplePredicate.includes(givenSimplePredicate)
  ) {
    return {
      whatWentWrong:
        'In this sentence the verb is a group of words (verb phrase) and all the words in the phrase need to be selected.',
      howToFix: `Find the ${verbTypeTranslator} in the predicate and select the word next that modifies the verb as well. Examples of verb phrases: take away, take out, and get off. `,
      correctSimplePredicate: false,
    }
  }
  if (
    !verbPhrase &&
    givenSimplePredicate!.split(' ').length > 1 &&
    givenSimplePredicate?.split(' ').includes(correctSimplePredicate)
  ) {
    return {
      whatWentWrong:
        'You have the correct word in your selection, but in this sentence the verb is just one word.',
      howToFix: `Find the one word ${verbTypeTranslator} in your selection. `,
      correctSimplePredicate: false,
    }
  }
  const lastWordInCompletePredicateWithPunctuation =
    completePredicate.split(' ')[completePredicate.split(' ').length - 1] + '.'

  const completePredicateWithPunctutation = [
    ...completePredicate.split(' '),
    lastWordInCompletePredicateWithPunctuation,
  ].join(' ')
  console.log()
  if (
    // !completePredicate.includes(givenSimplePredicate!) ||
    !auxilaryVerbCheck &&
    !`${completePredicate}.`.includes(givenSimplePredicate!)
  ) {
    return {
      whatWentWrong: 'Your simple predicate is in the subject.',
      howToFix:
        'Look at the predicate only and find the action, being, having, or feeling word that is in the complete predicate.',
      correctSimplePredicate: false,
    }
  }
  if (
    givenSimplePredicate &&
    !correctSimplePredicate!.includes(givenSimplePredicate!) &&
    completePredicateWithPunctutation.includes(givenSimplePredicate!)
  ) {
    return {
      whatWentWrong:
        'The correct simple predicate comes before your selection.',
      howToFix: `The simple predicate often comes right after the dividing line. `,
      correctSimplePredicate: false,
    }
  }
  if (!verbPhrase && givenSimplePredicate!.split(' ').length > 1) {
    return {
      whatWentWrong: 'In this sentence the verb is just one word.',
      howToFix: `Find the one word ${verbTypeTranslator} in the predicate. `,
      correctSimplePredicate: false,
    }
  }

  if (!auxilaryVerbCheck && givenSimplePredicate !== correctSimplePredicate) {
    return {
      whatWentWrong:
        'Your simple predicate is in the complete predicate, but it is not the verb in the complete predicate',
      howToFix:
        'Find the action, being, having, or feeling word that is in the complete predicate.',
      correctSimplePredicate: false,
    }
  }

  return {
    correctSimplePredicate: true,
    message: 'Right again!',
  }
}
