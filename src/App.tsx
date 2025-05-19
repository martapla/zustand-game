import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { MemoryGame } from "@/components/MemoryGame"

function App() {


  return (
    <>
      <MemoryGame />
      <div className="p-4">
        <Button variant="blau">Next 🎉</Button>
      </div>
    </>
  )
}

export default App

