export function reverseDate(date) {
  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}

export function shortenText(text, limit) {
  if (text.length > limit) { 
    return text.slice(0, limit) + '...' 
  } 
  return text
}