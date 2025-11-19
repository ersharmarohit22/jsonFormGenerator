'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export const useIntersectionObserver = (
  {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  }: UseIntersectionObserverProps = {}
): [RefObject<HTMLDivElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting

        setIsVisible(isIntersecting)

        if (isIntersecting && freezeOnceVisible) {
          observer.unobserve(element)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return [ref, isVisible]
}

