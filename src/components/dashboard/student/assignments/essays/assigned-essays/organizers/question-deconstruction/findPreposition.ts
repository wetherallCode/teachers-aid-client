export function findPreposition(word: string) {
  const prepositions = [
    'about',
    'above',
    'across',
    'after',
    'against',
    'along',
    'among',
    'around',
    'as',
    'at',
    'before',
    'behind',
    'between',
    'but',
    'by',
    'during',
    'except',
    'for',
    'from',
    'in',
    'like',
    'next to',
    'of',
    'off',
    'on',
    'over',
    'past',
    'than',
    'through',
    'to',
    'until',
    'up',
    'with',
  ]
  for (word of word.split(' ')) {
    for (const wordCheck of prepositions) {
      if (word.toLowerCase().includes(wordCheck)) {
        if (word.toLowerCase() !== wordCheck) {
          return false
        }
        return true
      }
    }
  }
  return false
}
