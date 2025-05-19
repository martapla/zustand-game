import { useEffect } from "react"
import { useMemoryStore } from "@/stores/memoryStore"
import type { Card } from "@/stores/memoryStore"
import { Button } from "@/components/ui/button"

const sampleWords = [
  { es: "casa", de: "haus" },
  { es: "gato", de: "katze" },
  { es: "perro", de: "hund" },
  { es: "libro", de: "buch" },
]

export const MemoryGame = () => {
  const { cards, setCards, flipCard } = useMemoryStore()

  useEffect(() => {
    setCards(sampleWords)
  }, [])
  console.log(cards)


  return (
    <div className="p-4 max-w-xl mx-auto flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold"> Deutsch Words 🇩🇪</h1>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card: Card) => (
          <button
            key={card.id}
            onClick={() => flipCard(card.id)}
            className={`h-20 w-20 rounded-md border flex items-center justify-center text-sm font-medium transition-colors
              ${card.matched ? "bg-green-500 text-black" :
              card.flipped ? "bg-yellow-200" :
              "bg-gray-200 hover:bg-gray-300"}
            `}
          >
            {card.flipped || card.matched ? (
              <span>{card.wordDe}</span>
            ) : (
              <span>❓</span>
            )}
          </button>
        ))}
      </div>

      <Button onClick={() => setCards(sampleWords)}>🔁 Reiniciar</Button>
    </div>
  )
}
