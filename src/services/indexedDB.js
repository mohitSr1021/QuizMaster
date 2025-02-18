const DB_NAME = "QuizDB"
const DB_VERSION = 1
const STORE_NAME = "quizAttempts"

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      reject("Error opening database")
    }

    request.onsuccess = (event) => {
      resolve(event.target.result)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        })
      }
    }
  })
}

export const saveQuizAttempt = async (attemptData) => {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)

      const request = store.add({
        ...attemptData,
        timestamp: new Date().getTime(),
      })

      request.onsuccess = () => resolve(true)
      request.onerror = () => reject("Error saving attempt")
    })
  } catch (error) {
    console.error("Error in saveQuizAttempt:", error)
    throw error
  }
}

export const getQuizAttempts = async () => {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result.sort((a, b) => b.timestamp - a.timestamp))
      }
      request.onerror = () => reject("Error getting attempts")
    })
  } catch (error) {
    console.error("Error in getQuizAttempts:", error)
    throw error
  }
}

export const clearQuizAttempts = async () => {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.clear()

      request.onsuccess = () => resolve(true)
      request.onerror = () => reject("Error clearing attempts")
    })
  } catch (error) {
    console.error("Error in clearQuizAttempts:", error)
    throw error
  }
}

