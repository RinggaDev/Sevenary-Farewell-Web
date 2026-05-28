import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useFlow } from '@/hooks/useFlow'
import { useAudio } from '@/store/AudioContext'
import styles from './MemorialLanding.module.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Prologue } from './Prologue'
import { Dialogue } from './Dialogue'
import { Archive } from './Archive' // <-- Tambahkan import ini
import { Monologue } from './Monologue'
import { Epilogue } from './Epilogue'

gsap.registerPlugin(ScrollTrigger)
export const MemorialLanding: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { stage, resetFlow } = useFlow()
  const { isPlaying, togglePlay } = useAudio()

  useGSAP(
    () => {
      if (stage === 4) {
        document.body.classList.remove('no-scroll')
      }

      // Set initial states for Content Elements
      gsap.set(`.${styles.heroSubtitle}`, { opacity: 0, y: 20 })
      gsap.set(`.${styles.heroTitleWord}`, { opacity: 0, y: 100, rotateX: -15 })
      gsap.set(`.${styles.metaBlock}`, { opacity: 0, y: 30 })
      gsap.set([`.${styles.soundToggle}`, `.${styles.repeatIntroButton}`], {
        opacity: 0,
        y: -20,
      })
      gsap.set(`.${styles.brand}`, { opacity: 0, x: -20 })

      // Clean Initial States for Line-Drawing Effect
      gsap.set(`.${styles.gridHorizontalTop}`, { scaleX: 0 })
      gsap.set(`.${styles.gridHorizontalBottom}`, { scaleX: 0 })
      gsap.set([`.${styles.gridVerticalLeft}`, `.${styles.gridVerticalRight}`], { scaleY: 0 })

      // Initial States for Overlapping Images (Dramatic Entrance Pre-configurations)
      gsap.set(`.${styles.imageWrapper1}`, {
        opacity: 0,
        x: 80,
        y: 40,
        rotation: -12,
        scale: 0.85,
        transformOrigin: 'bottom left'
      })
      gsap.set(`.${styles.imageWrapper2}`, {
        opacity: 0,
        x: 120,
        y: -30,
        rotation: 16,
        scale: 0.85,
        transformOrigin: 'top right'
      })

      if (stage >= 3) {
        gsap.set(containerRef.current, { opacity: 1 })
      }

      if (stage === 4) {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // ============================================
        // DRAMATIC GRID LINE-DRAWING ANIMATION
        // ============================================
        tl.to(`.${styles.gridHorizontalTop}`, {
          scaleX: 1,
          duration: 1.0,
          ease: 'power4.out',
        })
          .to(
            [`.${styles.gridVerticalLeft}`, `.${styles.gridVerticalRight}`],
            {
              scaleY: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: 'power4.out',
            },
            '-=0.6'
          )
          .to(
            `.${styles.gridHorizontalBottom}`,
            {
              scaleX: 1,
              duration: 1.0,
              ease: 'power3.out',
            },
            '-=0.7'
          )

        // ============================================
        // CONTENT & IMAGES ENTRANCE ANIMATION
        // ============================================
        tl.to(
          `.${styles.brand}`,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
          .to(
            `.${styles.heroSubtitle}`,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            '-=0.6'
          )
          .to(
            `.${styles.heroTitleWord}`,
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1.4,
              stagger: 0.2,
              ease: 'power4.out',
            },
            '-=0.8'
          )

          // IMAGE 1 ENTRANCE: Appears first with free-form glide & slide
          .to(
            `.${styles.imageWrapper1}`,
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: -1.6, // Target overlay angle rotation between 1 and 2
              scale: 1,
              duration: 1.6,
              ease: 'power4.out'
            },
            '-=1.4'
          )

          // IMAGE 2 ENTRANCE: Staged slightly after Image 1 with cross-overlapping alignment
          .to(
            `.${styles.imageWrapper2}`,
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 1.8, // Target overlay angle rotation between 1 and 2
              scale: 1,
              duration: 1.6,
              ease: 'power4.out'
            },
            '-=1.3'
          )

          .to(
            `.${styles.metaBlock}`,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
            },
            '-=1.2'
          )
          .to(
            [`.${styles.soundToggle}`, `.${styles.repeatIntroButton}`],
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: 'expo.out',
            },
            '-=1.0'
          )

        // Subtle Floating animation for Controls
        // gsap.to([`.${styles.soundToggle}`, `.${styles.repeatIntroButton}`], {
        //   y: 4,
        //   duration: 3,
        //   repeat: -1,
        //   yoyo: true,
        //   ease: 'sine.inOut',
        //   stagger: {
        //     each: 0.5,
        //     from: 'random',
        //   },
        // })
      }
    },
    { dependencies: [stage], scope: containerRef }
  )

  const handleReplay = () => {
    resetFlow()
    window.location.reload()
  }

  return (
    <div ref={containerRef} className={styles.container} style={{ opacity: 0 }}>
      {/* Texture overlay */}
      <div className={styles.texture} aria-hidden="true" />

      {/* Grid Frames */}
      <div className={styles.gridVerticalLeft} />
      <div className={styles.gridVerticalRight} />
      <div className={styles.gridHorizontalTop} />
      {/* <div className={styles.gridHorizontalBottom} /> */}

      {/* Sound toggle button - top right */}
      <div className={styles.topRightControls}>
        <button
          className={styles.soundToggle}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Mute audio' : 'Unmute audio'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isPlaying ? (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </>
            ) : (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            )}
          </svg>
        </button>
        <button className={styles.repeatIntroButton} onClick={handleReplay}>
          Repeat Intro
        </button>
      </div>

      {/* Brand - top left */}
      <div className={styles.brand}>Sevenary</div>

      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.textContainer}>
            <h2 className={styles.heroSubtitle}>Through</h2>
            <div className={styles.heroTitleContainer}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleWord}>SEVENARY</span>
                <span className={styles.heroTitleWord}>MEMORY</span>
              </h1>
            </div>
          </div>

          {/* Overlapping Showcase Images */}
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper1}>
              <img
                src="images/heroImage1.webp"
                alt="Archive Visual Capture 1"
                className={styles.heroImage}
              />
            </div>
            <div className={styles.imageWrapper2}>
              <img
                src="images/heroImage2.webp"
                alt="Archive Visual Capture 2"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 1: THE PROLOGUE */}
      <Prologue />

      {/* PHASE 1.5: THE DIALOGUE (Between Prologue and Archive) */}
      <Dialogue />

      {/* PHASE 2: THE ARCHIVE (HORIZONTAL TIME TUNNEL) */}
      <Archive /> {/* <-- Sisipkan di sini sebelum footer */}

      {/* PHASE 3: THE MONOLOGUE PARALLAX */}
      <Monologue />

      {/* PHASE 4: THE EPILOGUE (NEW) */}
      <Epilogue />

      {/* Footer metadata - bottom */}
      <footer className={styles.footer}>
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>■ 2023 - 2026</span>
          <p className={styles.metaText}>9A, 9B, 9C, 9D & 9E</p>
        </div>

        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>■ SMP IDN BOARDING SCHOOL</span>
          <p className={styles.metaText}>JONGGOL, JAWA BARAT, INDONESIA</p>
        </div>

        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>■ PROUDLY PRESENTED BY</span>
          <p className={styles.metaText}>DHABITH Z TRINGGANA</p>
        </div>
      </footer>
    </div>
  )
}