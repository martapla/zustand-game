import { create } from "zustand"
// import { useMemoryStore } from "@/stores/memoryStore"


export type Card = {
  id: number
  wordEs: string
  wordDe: string
  flipped: boolean
  matched: boolean
}

type MemoryState = {
  cards: Card[]
  flippedIds: number[]
  setCards: (pairs: { es: string; de: string }[]) => void
  flipCard: (id: number) => void
  resetGame: () => void
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  cards: [],
  flippedIds: [],

  setCards: (pairs) => {
    const cards: Card[] = pairs.flatMap((pair, index) => [
      {
        id: index * 2,
        wordEs: pair.es,
        wordDe: pair.de,
        flipped: false,
        matched: false,
      },
      {
        id: index * 2 + 1,
        wordEs: pair.es,
        wordDe: pair.de,
        flipped: false,
        matched: false,
      },
    ])

    const shuffled = cards.sort(() => Math.random() - 0.5)

    set({ cards: shuffled, flippedIds: [] })
  },

  flipCard: (id) => {
    const { cards, flippedIds } = get()

    // Si ja hi ha 2 girades, no fer res
    if (flippedIds.length === 2 || cards.find((c) => c.id === id)?.flipped) return

    const newFlippedIds = [...flippedIds, id]
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    )

    set({ cards: newCards, flippedIds: newFlippedIds })

    if (newFlippedIds.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlippedIds.map((fid) => newCards.find((c) => c.id === fid)!)

        const match =
          first.wordEs === second.wordEs && first.id !== second.id

        const updatedCards = newCards.map((card) => {
          if (card.id === first.id || card.id === second.id) {
            return match
              ? { ...card, matched: true }
              : { ...card, flipped: false }
          }
          return card
        })

        set({ cards: updatedCards, flippedIds: [] })
      }, 1000)
    }
  },

  resetGame: () => {
    set({ cards: [], flippedIds: [] })
  },
}))
