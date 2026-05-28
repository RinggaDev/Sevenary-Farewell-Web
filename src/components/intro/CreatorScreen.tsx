import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useFlow } from '@/hooks/useFlow'
import { useAudio } from '@/store/AudioContext'
import clickIco from '@/assets/click_ico.png'
import styles from './CreatorScreen.module.css'

interface CreatorScreenProps {
  onComplete?: () => void
  gridVariant?: '3x3' | '3x4'
}

export const CreatorScreen: React.FC<CreatorScreenProps> = ({
  onComplete,
  gridVariant = '3x3',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Refs for each word of the title (to animate separately)
  const ringgaRef = useRef<HTMLSpanElement>(null)
  const separatorRef = useRef<HTMLSpanElement>(null)
  const sevenaryRef = useRef<HTMLSpanElement>(null)

  const { stage, nextStage } = useFlow()
  const { play } = useAudio()
  const [showCursor, setShowCursor] = useState(false)

  // Custom cursor follow movement & Responsiveness Optimization
  useEffect(() => {
    if (stage !== 3 || !cursorRef.current) return

    // OPTIMISASI MOBILE: Jangan daftarkan event mousemove jika perangkat menggunakan layar sentuh
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const cursor = cursorRef.current

    // GSAP quickTo for performance
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      // Offset kursor diatur di tengah-tengah komponen pembungkusnya
      xTo(e.clientX - 80)
      yTo(e.clientY - 20)

      if (!showCursor) {
        setShowCursor(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [stage, showCursor])

  useGSAP(
    () => {
      if (stage !== 3) {
        // Reset states: hide all words and other elements
        gsap.set([ringgaRef.current, separatorRef.current, sevenaryRef.current], {
          opacity: 0,
          y: 20,
          x: -10,
        })
        gsap.set(copyrightRef.current, { opacity: 0 })
        if (gridRef.current) {
          gsap.set(gridRef.current.children, { opacity: 0 })
        }
        gsap.set(cursorRef.current, { opacity: 0, scale: 0.8 })
        return
      }

      const tl = gsap.timeline()

      // 1. Fade-in frame lines and corner accents with stagger
      const frameElements = gridRef.current?.children || []
      tl.fromTo(
        frameElements,
        { opacity: 0 },
        {
          opacity: 0.2,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power2.out',
        }
      )

      // 2. Title animation: fade‑up + slide‑from‑left word by word
      //    Ringga → X → Sevenary
      tl.fromTo(
        ringgaRef.current,
        { opacity: 0, y: 20, x: 0 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          ease: 'back.out(0.6)',
        },
        '-=0' // slight overlap with grid animation
      ).fromTo(
        separatorRef.current,
        { opacity: 0, y: 20, x: 0 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.6,
          ease: 'back.out(0.6)',
        },
        '+=0.15' // small delay after Ringga finishes
      ).fromTo(
        sevenaryRef.current,
        { opacity: 0, y: 20, x: 0 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          ease: 'back.out(0.6)',
        },
        '+=0.15'
      )

      // 3. Copyright fade-in
      tl.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      )

      // 4. Fade-in custom cursor after 0.5s from timeline start (Hanya berjalan di desktop via CSS)
      tl.fromTo(
        cursorRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        0.5
      )
    },
    { dependencies: [stage, gridVariant], scope: containerRef }
  )

  const handleClick = () => {
    if (stage !== 3) return

    // Start background music on user interaction
    play()

    // Click transition: fade-out + scale-down, then call completion
    const exitTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
          onComplete()
        } else {
          nextStage()
        }
      },
    })

    exitTl.to(containerRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.4, // Shortened duration
      ease: 'power3.inOut',
    })
  }

  // const cellsCount = gridVariant === '3x3' ? 9 : 12

  return (
    <div
      ref={containerRef}
      className={styles.container}
      id="creator-screen"
      onClick={handleClick}
    >
      {/* Frame background decor */}
      <div ref={gridRef} className={styles.frameDecor}>
        <div className={styles.frameLine} />
        <div className={styles.frameLine} />
        <div className={styles.frameLine} />
        <div className={styles.frameLine} />

        {/* Corner accents */}
        <div className={styles.cornerAccent} />
        <div className={styles.cornerAccent} />
        <div className={styles.cornerAccent} />
        <div className={styles.cornerAccent} />
      </div>

      {/* Main Title – each word gets its own ref for sequential animation */}
      <h1 className={styles.title}>
        <span ref={ringgaRef} className={styles.ringga}>
          Ringga
        </span>
        <span ref={separatorRef} className={styles.separator}>
          {' '}
          X{' '}
        </span>
        <span ref={sevenaryRef} className={styles.sevenary}>
          Sevenary
        </span>
      </h1>

      {/* Copyright */}
      <div ref={copyrightRef} className={styles.copyright}>
        ©Copyright Ringga 2026 | Click to Continue
      </div>

      {/* Custom mouse follower cursor */}
      <div
        ref={cursorRef}
        className={styles.customCursor}
        style={{ display: showCursor && stage === 3 ? 'flex' : 'none' }}
      >
        <img src={clickIco} alt="Click Icon" className={styles.cursorIcon} />
        <span>Click Anywhere</span>
      </div>
    </div>
  )
}