"use client"

import Image from "next/image"

const heroImages = [
  "/random/hero-1.jpg",
  "/random/hero-2.jpg", 
  "/random/hero-3.jpg",
  "/random/hero-4.jpg"
]

interface SectionBackgroundProps {
  opacity?: number
  blur?: boolean
  className?: string
}

export default function SectionBackground({ 
  opacity = 0.15, 
  blur = true,
  className = "" 
}: SectionBackgroundProps) {
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)]

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Image
        src={randomImage}
        alt="Section background"
        fill
        className={`object-cover ${blur ? 'blur-sm' : ''}`}
        style={{ opacity }}
        priority={false}
      />
    </div>
  )
}