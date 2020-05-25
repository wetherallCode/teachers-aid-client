export const capitalizer = (word: string) => {
  return word.substring(0, 1) + word.substring(1).toLowerCase()
}

export const dateConverter = (date: string) => {
  return (
    date.substring(5, 7) + '/' + date.substring(8) + '/' + date.substring(0, 4)
  )
}
