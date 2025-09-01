import { useState, useEffect } from "react"
import { LocationRoadmap } from "./location-roadmap"
import { LocationModal } from "./location-modal"
import { CodeModal } from "./code-modal"
import { RewardModal } from "./reward-modal"
import { CameraModal } from "./camera-modal"
import { PhotoConfirmModal } from "./photo-confirm-modal"
import { StartScreen } from "./start-screen"
import { GameMenu } from "./game-menu"
import { ItemsScreen } from "./items-screen"
import { ProfileScreen } from "./profile-screen"
import { PhotoCollageScreen } from "./photo-collage-screen"
import { FinalScreen } from "./final-screen"
import { saveProgress, loadProgress } from "./utils"

const LOCATIONS = [
  {
    id: 1,
    name: "plaza-pomelos",
    displayName: "Bosque de los Pomelos",
    character: "Eric el Trovador",
    description: "Una plazita con bancos y árboles donde Eric te explicará las reglas del juego.",
    code: "patata",
    reward: "¡Has obtenido un chocolate! 🍫",
    icon: "/parque.png",
    image: "/parque.png",
    completed: false,
    unlocked: true,
  },
  {
    id: 2,
    name: "cima",
    displayName: "La Cima del Cima",
    character: "Steampunk Vega",
    description: "La cima de la montaña mas alta de Barinas, donde Steampunk Vega te espera con un desafío 🕺.",
    code: "lidel",
    reward: "¡Habilidad de baile aumentada +10! 💃",
    icon: "/montaña.png",
    image: "/montaña.png",
    completed: false,
    unlocked: false,
  },
  {
    id: 3,
    name: "columpios",
    displayName: "Bosque de los Columpios",
    character: "Luisa la Elfa",
    description: "Un bosque mágico con columpios donde Luisa la Elfa te aguarda.",
    code: "papu",
    reward: "¡Se ha obtenido el as bajo la manga! 🃏",
    icon: "/columpios.png",
    image: "/columpios.png",
    completed: false,
    unlocked: false,
  },
  {
    id: 4,
    name: "centro-comercial",
    displayName: "Estacion del Tren",
    character: "Luis el Mayordomo",
    description: "Una elegante estación de trenes donde Luis el Mayordomo te recibe y te lleva al final de tu aventura.",
    code: "pepemadero",
    reward: "¡Has recibido la espada llave de corazon ⚔",
    icon: "/estacion.png",
    image: "/estacion.png",
    completed: false,
    unlocked: false,
  },
  {
    id: 5,
    name: "emperador",
    displayName: "El Emperador",
    character: "Rey de Corazones",
    description: "Un majestuoso castillo donde el Rey de Corazones te espera. para terminar la aventura.",
    code: "sarah",
    isQuestion: true,
    question: "¿Quien está en el corazón de Erick?",
    reward: "¡Felicidades, eres la dueña del corazón de Erick! ❤️",
    icon: "/castillo.png",
    image: "/castillo.png",
    completed: false,
    unlocked: false,
  },
]

export function TreasureHuntGame() {
  const [locations, setLocations] = useState(LOCATIONS)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const [showPhotoConfirmModal, setShowPhotoConfirmModal] = useState(false)
  const [currentReward, setCurrentReward] = useState("")
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [currentScreen, setCurrentScreen] = useState("roadmap") // roadmap, items, profile, collage
  const [showFinalScreen, setShowFinalScreen] = useState(false)

  const isGameCompleted = () => {
    return locations.filter((loc) => loc.completed).length === 5
  }

  useEffect(() => {
    const progress = loadProgress()
    const gameStartedFromStorage = localStorage.getItem("treasure-hunt-started") === "true"
    setGameStarted(gameStartedFromStorage)

    if (progress) {
      setLocations((prevLocations) =>
        prevLocations.map((location, index) => {
          const isCompleted = progress.completed?.includes(location.id) || false
          const isFirstLocation = location.id === 1
          const previousLocationCompleted =
            index === 0 ? true : progress.completed?.includes(prevLocations[index - 1].id) || false

          return {
            ...location,
            completed: isCompleted,
            unlocked: isFirstLocation || previousLocationCompleted,
          }
        }),
      )

      if (progress.completed?.length === 5) {
        setShowFinalScreen(true)
      }
    }
  }, [])

  const handleStartGame = () => {
    setGameStarted(true)
    localStorage.setItem("treasure-hunt-started", "true")
  }

  const handleLocationClick = (location) => {
    if (!location.unlocked || location.completed) return
    setSelectedLocation(location)
  }

  const handleMarkAsVisited = () => {
    setShowCodeModal(true)
  }

  const handleCodeSubmit = (code) => {
    if (!selectedLocation) return

    const isCorrect = code.toLowerCase() === selectedLocation.code.toLowerCase()

    if (isCorrect) {
      setShowCodeModal(false)
      setCurrentReward(selectedLocation.reward)
      setShowRewardModal(true)
    } else {
      alert("Código incorrecto. ¡Inténtalo de nuevo!")
    }
  }

  const handleRewardClose = () => {
    setShowRewardModal(false)
    setShowCameraModal(true)
  }

  const handlePhotoCapture = (photoData) => {
    setCapturedPhoto(photoData)
    setShowCameraModal(false)
    setShowPhotoConfirmModal(true)
  }

  const handlePhotoConfirm = (accepted) => {
    if (accepted && selectedLocation) {
      const updatedLocations = locations.map((location, index) => {
        if (location.id === selectedLocation.id) {
          return { ...location, completed: true }
        }
        if (index > 0 && locations[index - 1].id === selectedLocation.id) {
          return { ...location, unlocked: true }
        }
        return location
      })

      setLocations(updatedLocations)
      saveProgress(updatedLocations)

      const photos = JSON.parse(localStorage.getItem("treasure-hunt-photos") || "{}")
      photos[selectedLocation.id] = capturedPhoto
      localStorage.setItem("treasure-hunt-photos", JSON.stringify(photos))

      if (selectedLocation.id === 5) {
        setShowFinalScreen(true)
      }

      setShowPhotoConfirmModal(false)
      setSelectedLocation(null)
      setCapturedPhoto(null)
    } else if (!accepted) {
      setShowPhotoConfirmModal(false)
      setShowCameraModal(true)
    }
  }

  const handleFinishGame = () => {
    setShowFinalScreen(false)
    setCurrentScreen("roadmap")
  }

  if (!gameStarted) {
    return <StartScreen onStart={handleStartGame} />
  }

  if (showFinalScreen) {
    return <FinalScreen onFinish={handleFinishGame} />
  }

  return (
    <div className="min-h-screen bg-background">
      <GameMenu
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        completedCount={locations.filter((loc) => loc.completed).length}
      />

      <div className="p-4 pt-20">
        <div className="max-w-md mx-auto mt-15">
          {currentScreen === "roadmap" && (
            <>
              <LocationRoadmap locations={locations} onLocationClick={handleLocationClick} />

              {selectedLocation && (
                <LocationModal
                  location={selectedLocation}
                  isOpen={!!selectedLocation}
                  onClose={() => setSelectedLocation(null)}
                  onMarkAsVisited={handleMarkAsVisited}
                />
              )}
            </>
          )}

          {currentScreen === "items" && <ItemsScreen locations={locations} />}
          {currentScreen === "profile" && <ProfileScreen locations={locations} />}
          {currentScreen === "collage" && <PhotoCollageScreen />}
        </div>
      </div>

      <CodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        onSubmit={handleCodeSubmit}
        isQuestion={selectedLocation?.isQuestion}
        question={selectedLocation?.question}
      />

      <RewardModal isOpen={showRewardModal} onClose={handleRewardClose} reward={currentReward} />

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handlePhotoCapture}
        character={selectedLocation?.character || ""}
      />

      <PhotoConfirmModal
        isOpen={showPhotoConfirmModal}
        onClose={() => setShowPhotoConfirmModal(false)}
        onConfirm={handlePhotoConfirm}
        photoData={capturedPhoto}
      />
    </div>
  )
}
