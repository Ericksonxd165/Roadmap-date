import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function RewardModal({ isOpen, onClose, reward }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <CardTitle className="text-xl text-primary">¡Recompensa Obtenida!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg font-medium">{reward}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={onClose} className="w-full">
            ¡Genial! Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
