"use client"

import { ExternalLink } from "lucide-react"

interface ExternalLinkModalProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function ExternalLinkModal({ href, children, className }: ExternalLinkModalProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const confirmed = window.confirm(
      `You are about to leave sen.co and visit an external website.\n\n${href}\n\nContinue?`
    )

    if (confirmed) {
      window.open(href, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
      <ExternalLink className="w-3 h-3 ml-1 inline-block opacity-50" />
    </button>
  )
}
