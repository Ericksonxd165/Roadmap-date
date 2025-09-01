export const saveProgress = (updatedLocations) => {
  const progress = {
    completed: updatedLocations.filter((l) => l.completed).map((l) => l.id),
    unlocked: updatedLocations.filter((l) => l.unlocked).map((l) => l.id),
  }
  localStorage.setItem("treasure-hunt-progress", JSON.stringify(progress))
}

export const loadProgress = () => {
  const savedProgress = localStorage.getItem("treasure-hunt-progress")
  if (savedProgress) {
    return JSON.parse(savedProgress)
  }
  return null
}
