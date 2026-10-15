'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'

type HeroStageProps = {
  children: ReactNode
  className?: string
}

export function HeroStage({ children, className }: HeroStageProps) {
  const ref = useRef<HTMLElement>(null)
  const frame = useRef(0)

  const setOffset = (x: number, y: number) => {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--sx', x.toFixed(3))
    element.style.setProperty('--sy', y.toFixed(3))
  }

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const { clientX, clientY } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect()
      setOffset(
        ((clientX - rect.left) / rect.width - 0.5) * 2,
        ((clientY - rect.top) / rect.height - 0.5) * 2,
      )
    })
  }

  const handleLeave = () => {
    cancelAnimationFrame(frame.current)
    setOffset(0, 0)
  }

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
      className={className}
    >
      {children}
    </section>
  )
}
