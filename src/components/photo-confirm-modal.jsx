import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PhotoConfirmModal({ isOpen, onClose, onConfirm, photoData }) {
  if (!isOpen || !photoData) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>¿Te gusta la foto?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img src={photoData || "/placeholder.svg"} alt="Foto capturada" className="w-full rounded-lg" />
          <p className="text-center text-sm text-muted-foreground">
            Esta será la foto que se guardará en tus recuerdos del viaje.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onConfirm(false)} className="flex-1">
            Tomar otra
          </Button>
          <Button onClick={() => onConfirm(true)} className="flex-1">
            ¡Me gusta!
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
