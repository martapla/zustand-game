import { create } from "zustand"

export type Card = {
  id: number
  pairId: number
  word: string
  language: "es" | "de"
  flipped: boolean
  matched: boolean
}

type MemoryState = {
  cards: Card[]
  setCards: (pairs: { es: string; de: string }[]) => void
  flipCard: (id: number) => void
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  cards: [],
  setCards: (pairs) => {
    const newCards = pairs.flatMap((pair, index): Card[]  => [
      {
        id: index * 2,
        pairId: index,
        word: pair.es,
        language: "es",
        flipped: false,
        matched: false,
      },
      {
        id: index * 2 + 1,
        pairId: index,
        word: pair.de,
        language: "de",
        flipped: false,
        matched: false,
      },
    ]).sort(() => Math.random() - 0.5)

    set({ cards: newCards })
  },
  flipCard: (id) => {
    const { cards } = get()
    const flippedCards = cards.filter((card) => card.flipped && !card.matched)
    const currentCard = cards.find((card) => card.id === id)

    if (!currentCard || currentCard.flipped || currentCard.matched || flippedCards.length === 2) return

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    )

    set({ cards: updatedCards })

    const newFlipped = flippedCards.concat({ ...currentCard, flipped: true })

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped
      const isMatch = a.pairId === b.pairId && a.language !== b.language

      setTimeout(() => {
        set({
          cards: get().cards.map((card) =>
            card.id === a.id || card.id === b.id
              ? isMatch
                ? { ...card, matched: true }
                : { ...card, flipped: false }
              : card
          ),
        })
      }, 1000)
    }
  },
}))
