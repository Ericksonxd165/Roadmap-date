export function ItemsScreen({ locations }) {
  const getItemsObtained = () => {
    const items = []

    locations.forEach((location) => {
      if (location.completed) {
        switch (location.id) {
          case 1:
            items.push({ name: "Chocolate", icon: "🍫", description: "Un delicioso chocolate de Eric el Trovador" })
            break
          case 2:
            items.push({
              name: "Habilidad de Baile +10",
              icon: "💃",
              description: "Steampunk Vega mejoró tus movimientos",
            })
            break
          case 3:
            items.push({ name: "As Bajo la Manga", icon: "🃏", description: "Un truco especial de Luisa la Elfa" })
            break
          case 4:
            items.push({
              name: "Espada Llave de Corazón",
              icon: "⚔",
              description: "Luis te enseñó sus modales refinados",
            })
            break
          case 5:
            items.push({ name: "Corazón de Erick", icon: "❤️", description: "El tesoro más preciado de todos" })
            break
        }
      }
    })

    return items
  }

  const items = getItemsObtained()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Items Obtenidos</h2>
        <p className="text-muted-foreground">Tus tesoros coleccionados</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎒</div>
          <p className="text-muted-foreground">Aún no has obtenido ningún item</p>
          <p className="text-sm text-muted-foreground mt-2">¡Completa ubicaciones para coleccionar tesoros!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item, index) => (
            <div key={index} className="bg-card border rounded-lg p-4 flex items-center space-x-4">
              <div className="text-3xl">{item.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
