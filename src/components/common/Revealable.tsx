'use client'

interface RevealableProps {
  value: string
  isRevealed: boolean
  onToggle: () => void
  maskChar?: string
  maskLength?: number
}

export default function Revealable({ 
  value, 
  isRevealed, 
  onToggle, 
  maskChar = '•',
  maskLength = 8
}: RevealableProps) {
  const maskedValue = maskChar.repeat(Math.min(maskLength, value.length))
  
  return (
    <span className="select-none">
      {isRevealed ? value : maskedValue}
    </span>
  )
}