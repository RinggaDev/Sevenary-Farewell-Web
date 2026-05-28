import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useFlow } from '@/hooks/useFlow'
import styles from './BlockTransition.module.css'

// Number of vertical columns covering the full viewport
const COLS = 8

export const BlockTransition: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>(Array(COLS).fill(null))
  const { nextStage } = useFlow()

  useGSAP(
    () => {
      // Set initial position: columns are in place (covering screen)
      gsap.set(blockRefs.current, { yPercent: 0 })

      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          nextStage()
        },
      })

      // Staircase: each column slides DOWN to reveal the CreatorScreen below
      // Right-most column goes first → diagonal left staircase effect
      tl.to(blockRefs.current, {
        yPercent: 105,
        duration: 0.75,
        ease: 'power3.inOut',
        stagger: {
          each: 0.1,        // delay between each column
          from: 'end',      // rightmost column first → staircase from right to left
        },
      })
    },
    { scope: wrapperRef }
  )

  return (
    <div ref={wrapperRef} className={styles.transitionWrapper} id="block-transition">
      {Array.from({ length: COLS }).map((_, i) => (
        <div
          key={i}
          className={styles.block}
          ref={(el) => {
            blockRefs.current[i] = el
          }}
        />
      ))}
    </div>
  )
}
