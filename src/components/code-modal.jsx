import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function CodeModal({ isOpen, onClose, onSubmit, isQuestion, question }) {
  const [code, setCode] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code.trim()) {
      onSubmit(code.trim())
      setCode("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{isQuestion ? "Pregunta Especial" : "Ingresa el Código"}</CardTitle>
          <CardDescription>
            {isQuestion ? question : "Ingresa el código secreto que obtuviste en este lugar"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Input
              type="text"
              placeholder={isQuestion ? "Tu respuesta..." : "Código secreto..."}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center text-lg"
              autoFocus
            />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={!code.trim()}>
              Confirmar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
