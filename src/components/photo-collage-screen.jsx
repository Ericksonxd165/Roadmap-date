import { useState, useEffect } from "react"

export function PhotoCollageScreen() {
  const [photos, setPhotos] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem("treasure-hunt-photos") || "{}")
    setPhotos(savedPhotos)
  }, [])

  const generateCollage = async () => {
    const photoEntries = Object.entries(photos)
    if (photoEntries.length === 0) return

    setIsGenerating(true)

    try {
      // Create canvas for collage
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      // Set canvas size for mobile
      canvas.width = 800
      canvas.height = 1200

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#667eea")
      gradient.addColorStop(0.5, "#764ba2")
      gradient.addColorStop(1, "#f093fb")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 3 + 1
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 48px Georgia, serif"
      ctx.textAlign = "center"
      ctx.fillText("✨ Búsqueda del Tesoro ✨", canvas.width / 2, 70)

      ctx.font = "italic 32px Georgia, serif"
      ctx.fillText("Recuerdos de Sarah", canvas.width / 2, 120)

      // Reset shadow
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      const photoLayouts = [
        { x: 80, y: 180, rotation: -5, size: 160 },
        { x: 320, y: 160, rotation: 3, size: 180 },
        { x: 560, y: 190, rotation: -2, size: 160 },
        { x: 150, y: 400, rotation: 4, size: 170 },
        { x: 400, y: 420, rotation: -3, size: 160 },
      ]

      // Load and draw photos with polaroid style
      const imagePromises = photoEntries.map(([locationId, photoData], index) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            if (index >= photoLayouts.length) {
              resolve()
              return
            }

            const layout = photoLayouts[index]
            const { x, y, rotation, size } = layout

            ctx.save()
            ctx.translate(x + size / 2, y + size / 2)
            ctx.rotate((rotation * Math.PI) / 180)

            ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
            ctx.shadowBlur = 15
            ctx.shadowOffsetX = 5
            ctx.shadowOffsetY = 5

            // White polaroid background
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(-size / 2 - 10, -size / 2 - 10, size + 20, size + 50)

            // Reset shadow for photo
            ctx.shadowColor = "transparent"
            ctx.shadowBlur = 0
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0

            // Draw photo
            ctx.drawImage(img, -size / 2, -size / 2, size, size)

            ctx.fillStyle = "#333333"
            ctx.font = "16px 'Comic Sans MS', cursive"
            ctx.textAlign = "center"
            const locationNames = {
              1: "Plaza Los Pomelos",
              2: "El Cima",
              3: "Los Columpios",
              4: "Centro Comercial",
              5: "El Emperador",
            }
            ctx.fillText(locationNames[locationId] || `Ubicación ${locationId}`, 0, size / 2 + 25)

            ctx.restore()
            resolve()
          }
          img.crossOrigin = "anonymous"
          img.src = photoData
        })
      })

      await Promise.all(imagePromises)

      ctx.fillStyle = "#ff6b9d"
      const hearts = ["💖", "💕", "✨", "🌟", "💫"]
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const heart = hearts[Math.floor(Math.random() * hearts.length)]
        ctx.font = `${Math.random() * 20 + 15}px Arial`
        ctx.fillText(heart, x, y)
      }

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fillRect(50, canvas.height - 120, canvas.width - 100, 80)

      ctx.fillStyle = "#764ba2"
      ctx.font = "bold 28px Georgia, serif"
      ctx.textAlign = "center"
      ctx.fillText("🏆 Aventura Completada 🏆", canvas.width / 2, canvas.height - 70)

      ctx.font = "italic 18px Georgia, serif"
      ctx.fillText("Con amor, para Sarah ❤️", canvas.width / 2, canvas.height - 45)

      // Download collage
      const link = document.createElement("a")
      link.download = "treasure-hunt-collage-sarah.png"
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("Error generating collage:", error)
      alert("Error al generar el collage")
    } finally {
      setIsGenerating(false)
    }
  }

  const photoCount = Object.keys(photos).length

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Collage de Fotos</h2>
        <p className="text-muted-foreground">Tus recuerdos de la aventura</p>
      </div>

      {photoCount === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📸</div>
          <p className="text-muted-foreground">Aún no has tomado fotos</p>
          <p className="text-sm text-muted-foreground mt-2">¡Visita ubicaciones para capturar recuerdos!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(photos).map(([locationId, photoData]) => {
              const locationNames = {
                1: "Plaza Los Pomelos",
                2: "El Cima",
                3: "Los Columpios",
                4: "Centro Comercial",
                5: "El Emperador",
              }

              return (
                <div key={locationId} className="space-y-2">
                  <div className="aspect-square bg-white p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                    <div className="w-full h-5/6 bg-card border rounded overflow-hidden">
                      <img
                        src={photoData || "/placeholder.svg"}
                        alt={`Foto en ${locationNames[locationId]}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center text-gray-600 font-medium mt-1">{locationNames[locationId]}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={generateCollage}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
          >
            {isGenerating ? "✨ Creando magia..." : `💖 Descargar Collage Mágico (${photoCount} fotos)`}
          </button>
        </>
      )}
    </div>
  )
}
