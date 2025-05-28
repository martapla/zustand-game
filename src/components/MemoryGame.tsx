import { useEffect } from "react"
import { useMemoryStore } from "@/stores/memoryStore"
import { Button } from "@/components/ui/button"

const sampleWords = [
  { es: "house", de: "haus" },
  { es: "dog", de: "hund" },
  { es: "book", de: "buch" },
  { es: "cat", de: "katze" },
]

export const MemoryGame = () => {
  const { cards, setCards, flipCard } = useMemoryStore()

  useEffect(() => {
    setCards(sampleWords)
  }, [])

  return (
    <div className="p-4 max-w-xl mx-auto flex flex-col items-center gap-10">
      <h1 className="text-2xl font-semibold">Match the words</h1>
      <h2 className="text-6xl text-center mt-4">🫖🇬🇧 <span className="mx-6 text-4xl">vs</span> 🥨🇩🇪</h2>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => flipCard(card.id)}
            className={`h-20 w-24 rounded-md border flex items-center justify-center text-sm font-medium transition-colors
              ${card.matched ? "bg-green-400 text-red" :
              card.flipped ? "bg-yellow-200" :
              "bg-gray-200 hover:bg-gray-300"}
            `}
          >
            {card.flipped || card.matched ? (
              <span>{card.word}</span>
            ) : (
              <span>❓</span>
            )}
          </button>
        ))}
      </div>

      <Button variant="blau" onClick={() => setCards(sampleWords)}>🛎️ Next Words</Button>
    </div>
  )
}
