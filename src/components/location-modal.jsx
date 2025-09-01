import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const characterImages = {
  "Eric el Trovador": "/Eric.png",
  "Steampunk Vega": "/vega.png",
  "Luisa la Elfa": "/Luisa.png",
  "Luis el Mayordomo": "/Luis.png",
  "Rey de Corazones": "/Erick.png",
};

export function LocationModal({ location, isOpen, onClose, onMarkAsVisited }) {
  if (!isOpen || !location) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={characterImages[location.character]} alt={location.character} className="w-24 h-24 object-contain mx-auto mb-4" />
          <CardTitle className="text-xl">{location.displayName}</CardTitle>
          <CardDescription className="text-lg font-medium text-primary">{location.character}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{location.description}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cerrar
          </Button>
          <Button onClick={onMarkAsVisited} className="flex-1">
            Marcar como Visitado
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
