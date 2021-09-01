import { phraseCapitalizer } from '../../../../../../../../utils'
import { findPreposition } from './findPreposition'

type SubjectComplimentGraderProps = {
  givenSubjectCompliment: string
  correctSubjectCompliment: string
  completePredicate: string
  completeSubject: string
  simpleSubject: string
  simplePredicate: string
  questionToModify: string[]
}

export function subjectComplimentGrader({
  givenSubjectCompliment,
  correctSubjectCompliment,
  completePredicate,
  simpleSubject,
  completeSubject,
  simplePredicate,
  questionToModify,
}: SubjectComplimentGraderProps) {
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

  const splitGivenSubjectCompliment = [
    [
      ...givenSubjectCompliment.slice(0, givenSubjectCompliment.length - 1),
    ].join(''),
    givenSubjectCompliment.charAt(givenSubjectCompliment.length - 1),
  ]

  if (givenSubjectCompliment !== '' && givenSubjectCompliment === ' ') {
    return {
      correctSubjectCompliment: false,
      message: 'You selected a space.',
      howToFix: `Make sure you select an entire word or a group of words.`,
    }
  }

  for (const wordInSelection of givenSubjectCompliment
    .trim()
    .split(' ')
    .filter((wordToFilter) => wordToFilter !== '')) {
    const lastWordWithOutPeriod = questionToModify[
      questionToModify.length - 1
    ].slice(0, questionToModify[questionToModify.length - 1].length - 1)

    const completeQuestion = [...questionToModify, lastWordWithOutPeriod]

    if (
      (givenSubjectCompliment && !completeQuestion.includes(wordInSelection)) ||
      !lastWordWithOutPeriod
    ) {
      return {
        correctSubjectCompliment: false,
        message: 'You selected a partial word.',
        howToFix: `Make sure you select an entire word or a group of words.`,
      }
    }
  }

  if (
    givenSubjectCompliment.trim() !== '' &&
    givenSubjectCompliment.trim().includes(simplePredicate)
  ) {
    return {
      correctSubjectCompliment: false,
      message: `Your subject compliment must come after the verb: ${simplePredicate}`,
      howToFix: `Subject compliments are nouns and nouns can be modified by adjectives, so look for the person, place, thing, or idea that the ${simpleSubject} ${simplePredicate} and any adjective that would come before it.`,
    }
  }
  const answerIsInThePredicate =
    completePredicate.includes(givenSubjectCompliment) ||
    (completePredicate + '.').includes(givenSubjectCompliment)

  if (
    (givenSubjectCompliment && givenSubjectCompliment.includes('|')) ||
    completeSubject
      .toLowerCase()
      .split(' ')
      .includes(givenSubjectCompliment.toLowerCase())
  ) {
    return {
      correctSubjectCompliment: false,
      message: 'Your subject compliment must be in the predicate.',
      howToFix: `Look to the right of the separator line to find the subject compliment.`,
    }
  }
  if (
    givenSubjectCompliment.trim() !== '' &&
    findPreposition(givenSubjectCompliment.trim())
  ) {
    return {
      correctSubjectCompliment: false,
      message: 'Your subject compliment cannot include a preposition.',
      howToFix: `Ask yourself: What ${simplePredicate} ${simpleSubject}`,
    }
  }

  if (
    givenSubjectCompliment.trim() !== '' &&
    givenSubjectCompliment.trim() === correctSubjectCompliment + '.'
  ) {
    return { correctSubjectCompliment: true, correctMessage: 'Good Job' }
  }
  if (
    givenSubjectCompliment &&
    answerIsInThePredicate &&
    !correctSubjectCompliment.includes(givenSubjectCompliment)
  ) {
    return {
      correctSubjectCompliment: false,
      message: `Your selection is not what ${simpleSubject} ${simplePredicate}.`,
      howToFix: `The subject compliment comes right after the ${simplePredicate} and may include an adjective.`,
    }
  }
  if (
    givenSubjectCompliment.trim() !== '' &&
    givenSubjectCompliment.trim() === correctSubjectCompliment + '.'
  ) {
    return { correctSubjectCompliment: true, correctMessage: 'Good Job' }
  }
  if (
    givenSubjectCompliment.trim() &&
    givenSubjectCompliment.trim() !== correctSubjectCompliment
  ) {
    // if the given is one word but the correct is more than one word
    if (
      givenSubjectCompliment.trim().split(' ').length === 1 &&
      correctSubjectCompliment.split(' ').length > 1 &&
      correctSubjectCompliment
        .split(' ')
        .includes(givenSubjectCompliment.trim())
    ) {
      console.log('given is one word but the correct is more than one word')
      return {
        correctSubjectCompliment: false,
        message:
          'The word you selected is a part of the subject compliment but is only one word and the object is more than one word.',
        howToFix: `Select more than one word. There may be an adjective before the noun or the word "a" or "the", or you may have selected the adjective but not the noun that it is modifying.`,
      }
    }
    if (
      givenSubjectCompliment.trim().split(' ').length > 1 &&
      correctSubjectCompliment.split(' ').length === 1
    ) {
      console.log('given is more than one word, but the correct is one word')
      return {
        correctSubjectCompliment: false,
        message:
          'The word you selected is more than one word but the subject compliment is only one word.',
        howToFix: `Select only one word`,
      }
    }
    return {
      correctSubjectCompliment: false,
      message: 'Your selection is not the subject compliment.',
      howToFix: `Try again.`,
    }
  }
  return { correctSubjectCompliment: true, correctMessage: 'Good Job' }
}
