export function reverseDate(data) {
  // return data.slice(0, 10)
  const date = new Date(data)
  const day = String(date.getDate()).padStart(2, '0') 
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return`${day}.${month}.${year}`
}

export function shortenText(text, limit) {
  if (text.length > limit) { 
    return text.slice(0, limit) + '...' 
  } 
  return text
}