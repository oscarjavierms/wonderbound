'use client'

import { useEffect } from 'react'
import { trackPixel } from '@/lib/meta-pixel'

export function TrackView({ content }: { content: string }) {
  useEffect(() => {
    trackPixel('ViewContent', { content_name: content })
  }, [content])
  return null
}
