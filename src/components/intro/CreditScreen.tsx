import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useFlow } from '@/hooks/useFlow'
import idnLogo from '@/assets/idn_logo.svg'
import sevenaryLogo from '@/assets/sevenary_ logo.svg'
import styles from './CreditScreen.module.css'

export const CreditScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const idnRef = useRef<HTMLImageElement>(null)
  const sevenaryRef = useRef<HTMLImageElement>(null)
  const osogRef = useRef<HTMLDivElement>(null)
  const { nextStage } = useFlow()

  useGSAP(
    () => {
      // Prevent interactions during intro animation
      document.body.classList.add('no-scroll')

      const tl = gsap.timeline({
        onComplete: () => {
          // Transition to Stage 2: Creator Screen
          nextStage()
        },
      })

      // Set initial states
      gsap.set([idnRef.current, sevenaryRef.current], { opacity: 0 })
      gsap.set(osogRef.current, { opacity: 0, y: -10 })

      // 1. O.S.O.G fades and slides down from top
      tl.to(osogRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // 2. IDN logo enters first (fade in + X movement from left)
      tl.fromTo(
        idnRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.4, ease: 'power4.out' },
        '-=0.5'
      )

      // 3. Sevenary logo enters second (fade in + X movement from right)
      tl.fromTo(
        sevenaryRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.4, ease: 'power4.out' },
        '-=0.8'
      )

      // 4. O.S.O.G disappears after 3 seconds (duration of timeline at this point is ~2.0s. We fade it out at exactly 3.0s from start)
      tl.to(
        osogRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        3.0
      )

      // 5. Hold logos on screen, then transition out
      tl.to({}, { duration: 1.5 })
        .to([idnRef.current, sevenaryRef.current], {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.in',
        })
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power3.inOut',
          },
          '-=0.5'
        )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={styles.container} id="credit-screen">
      {/* Upper header text */}
      <div ref={osogRef} className={styles.osog}>
        Our Story, Our Glory.
      </div>

      <div className={styles.logosContainer}>
        <img
          ref={idnRef}
          src={idnLogo}
          alt="IDN Logo"
          className={styles.logo}
        />
        <div className={styles.divider}></div>
        <img
          ref={sevenaryRef}
          src={sevenaryLogo}
          alt="Sevenary Logo"
          className={styles.logo}
        />
      </div>
    </div>
  )
}

