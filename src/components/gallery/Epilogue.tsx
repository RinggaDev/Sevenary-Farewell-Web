import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './Epilogue.module.css'

gsap.registerPlugin(ScrollTrigger)

export const Epilogue: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%', // Animasi dimulai saat ujung atas Epilogue mencapai 60% dari layar
        toggleActions: 'play none none reverse', // Akan reverse (mundur) jika di-scroll ke atas lagi
      }
    })

    // Animasi Reveal Tipografi Masif
    tl.fromTo(
      `.${styles.hugeTextMask} span`,
      { 
        yPercent: 115, 
        skewY: 6, 
        opacity: 0 
      },
      { 
        yPercent: 0, 
        skewY: 0, 
        opacity: 1, 
        stagger: 0.15, 
        duration: 1.4, 
        ease: 'power4.out' 
      }
    )
    // Animasi Garis Vertikal Memanjang
    .fromTo(
      `.${styles.divider}`,
      { scaleY: 0 },
      { scaleY: 1, duration: 1, ease: 'expo.out' },
      '-=0.8'
    )
    // Animasi Subteks Penutup
    .fromTo(
      `.${styles.subText}`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className={styles.epilogueSection}>
      <div className={styles.content}>
        
        {/* Massive Closing Typography */}
        <h1 className={styles.hugeText}>
          <div className={styles.hugeTextMask}><span>END</span></div>
          <div className={styles.hugeTextMask}><span>OF AN</span></div>
          <div className={styles.hugeTextMask}><span>ERA.</span></div>
        </h1>

        {/* Elegant Vertical Divider */}
        <div className={styles.divider}></div>

        {/* Closing Message */}
        <p className={styles.subText}>
          SMP IDN Boarding School, Class of 2026.<br/>
          You may close the tab, but the memory remains.
        </p>

      </div>
    </section>
  )
}