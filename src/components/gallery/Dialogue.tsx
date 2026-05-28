import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './Dialogue.module.css'

// Import image assets for the trail
import img1 from '../../assets/cursor_photo/cursor_1.webp'
import img2 from '../../assets/cursor_photo/cursor_2.webp'
import img3 from '../../assets/cursor_photo/cursor_3.webp'
import img4 from '../../assets/cursor_photo/cursor_4.webp'
import img5 from '../../assets/cursor_photo/cursor_5.webp'

gsap.registerPlugin(ScrollTrigger)

const TRAIL_IMAGES = [img1, img2, img3, img4, img5]

interface ConversationLine {
  id: number
  speaker: 'past' | 'present'
  year: string
  text: string
}

const DIALOGUE_DATA: ConversationLine[] = [
  {
    id: 1,
    speaker: 'past',
    year: '2023',
    text: 'Are we still afraid of what comes next?',
  },
  {
    id: 2,
    speaker: 'present',
    year: '2026',
    text: 'Terrified. But we are no longer walking alone.',
  },
  {
    id: 3,
    speaker: 'past',
    year: '2023',
    text: 'Was the journey worth the heavy goodbyes?',
  },
  {
    id: 4,
    speaker: 'present',
    year: '2026',
    text: 'Every single one of them. The pain was the price of the privilege.',
  },
  {
    id: 5,
    speaker: 'past',
    year: '2023',
    text: 'Will they remember us?',
  },
  {
    id: 6,
    speaker: 'present',
    year: '2026',
    text: 'We left a mark on these walls. The quiet skies of Jonggol will not forget.',
  },
]

export const Dialogue: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)
  const lastPos = useRef({ x: 0, y: 0 })
  const imageIndex = useRef(0)

  useGSAP(
    () => {
      // Ambil semua elemen baris dialog
      const lines = gsap.utils.toArray(`.${styles.lineWrapper}`) as HTMLElement[]

      // Animasikan setiap baris secara individual saat di-scroll ke dalam viewport
      lines.forEach((line) => {
        const isPast = line.classList.contains(styles.past)
        
        gsap.fromTo(
          line,
          { 
            opacity: 0, 
            y: 60, 
            x: isPast ? -30 : 30, // Masa lalu masuk dari kiri, masa kini dari kanan
            filter: 'blur(8px)' 
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%', // Terpicu saat baris mencapai 80% dari atas layar
              toggleActions: 'play none none reverse', // Mundur jika di-scroll ke atas lagi
            },
          }
        )
      })

      // Image Trail Logic
      const spawnImage = (x: number, y: number) => {
        const img = document.createElement('img')
        img.src = TRAIL_IMAGES[imageIndex.current]
        img.className = styles.trailImage
        
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return

        const relX = x - rect.left
        const relY = y - rect.top

        img.style.left = `${relX}px`
        img.style.top = `${relY}px`
        
        containerRef.current?.appendChild(img)
        imageIndex.current = (imageIndex.current + 1) % TRAIL_IMAGES.length

        gsap.fromTo(img, 
          { opacity: 0, scale: 0.5, rotation: Math.random() * 30 - 15 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(img, {
                opacity: 0,
                scale: 0.8,
                y: -50,
                duration: 0.8,
                delay: 0.2,
                onComplete: () => img.remove()
              })
            }
          }
        )
      }

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        
        if (pointerRef.current) {
          gsap.to(pointerRef.current, {
            x: clientX,
            y: clientY,
            duration: 0.1,
            ease: 'power2.out'
          })
        }
        
        const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y)
        if (dist > 120) {
          lastPos.current = { x: clientX, y: clientY }
          spawnImage(clientX, clientY)
        }
      }

      const section = containerRef.current
      if (section) {
        section.addEventListener('mousemove', handleMouseMove)
      }

      return () => {
        if (section) {
          section.removeEventListener('mousemove', handleMouseMove)
        }
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className={styles.dialogueSection}>
      <div ref={pointerRef} className={styles.customPointer} />
      <div className={styles.conversationContainer}>
        {DIALOGUE_DATA.map((item) => (
          <div
            key={item.id}
            className={`${styles.lineWrapper} ${
              item.speaker === 'past' ? styles.past : styles.present
            }`}
          >
            <span className={styles.speakerLabel}>VOICE OF {item.year}</span>
            <p className={styles.dialogueText}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
