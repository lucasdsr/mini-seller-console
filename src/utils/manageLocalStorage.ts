export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error)
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return null
    }
    return JSON.parse(serializedValue) as T
  } catch (error) {
    console.error(
      `Error reading or parsing from localStorage for key "${key}":`,
      error
    )
    return null
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage for key "${key}":`, error)
  }
}
