// import React, { useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useGSAP } from '@gsap/react'
// import styles from './test_write.module.css'

// // Import image assets for the trail
// import img1 from '../../assets/cursor_photo/cursor_1.jpg'
// import img2 from '../../assets/cursor_photo/cursor_2.jpg'
// import img3 from '../../assets/cursor_photo/cursor_3.jpg'
// import img4 from '../../assets/cursor_photo/cursor_4.jpg'
// import img5 from '../../assets/cursor_photo/cursor_5.jpg'

// // Daftarkan ScrollTrigger
// gsap.registerPlugin(ScrollTrigger)

// const TRAIL_IMAGES = [img1, img2, img3, img4, img5]

// export const Test: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const lastPos = useRef({ x: 0, y: 0 })
//   const imageIndex = useRef(0)
  
//   // Copywriting dramatis
//   const copy = "Three years. A thousand fleeting moments. Captured in the amber of our collective memory. We arrived as fragments. We depart as a legacy."
//   const words = copy.split(' ')

//   useGSAP(() => {
//     const wordElements = sectionRef.current?.querySelectorAll(`.${styles.word}`)

//     if (wordElements) {
//       // Efek muncul dari blur dan bawah, terikat erat dengan scroll (scrub: 1.5)
//       gsap.fromTo(
//         wordElements,
//         { opacity: 0.05, y: 40, filter: 'blur(8px)' },
//         {
//           opacity: 1,
//           y: 0,
//           filter: 'blur(0px)',
//           stagger: 0.1,
//           ease: 'power2.out',
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 80%', // Mulai animasi saat section menyentuh 80% dari atas viewport
//             end: 'center center', // Selesai saat section tepat di tengah
//             scrub: 1.5, // Waktu smoothing untuk efek tied-to-scroll
//           },
//         }
//       )
//     }

//     // Image Trail Logic
//     const spawnImage = (x: number, y: number) => {
//       const img = document.createElement('img')
//       img.src = TRAIL_IMAGES[imageIndex.current]
//       img.className = styles.trailImage
      
//       const rect = sectionRef.current?.getBoundingClientRect()
//       if (!rect) return

//       // Calculate position relative to the section
//       const relX = x - rect.left
//       const relY = y - rect.top

//       img.style.left = `${relX}px`
//       img.style.top = `${relY}px`
      
//       sectionRef.current?.appendChild(img)

//       // Cycle to next image
//       imageIndex.current = (imageIndex.current + 1) % TRAIL_IMAGES.length

//       // Animate the image
//       gsap.fromTo(img, 
//         { 
//           opacity: 0, 
//           scale: 0.5,
//           rotation: Math.random() * 30 - 15 
//         },
//         { 
//           opacity: 1, 
//           scale: 1, 
//           duration: 0.8,
//           ease: 'power2.out',
//           onComplete: () => {
//             gsap.to(img, {
//               opacity: 0,
//               scale: 0.8,
//               y: -50, // Slight upward drift
//               duration: 0.8,
//               delay: 0.2,
//               onComplete: () => img.remove()
//             })
//           }
//         }
//       )
//     }

//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX, clientY } = e
      
//       // Calculate distance from last spawned image
//       const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y)

//       // Only spawn if mouse has moved a certain distance (the "gap")
//       if (dist > 100) {
//         lastPos.current = { x: clientX, y: clientY }
//         spawnImage(clientX, clientY)
//       }
//     }

//     const section = sectionRef.current
//     if (section) {
//       section.addEventListener('mousemove', handleMouseMove)
//     }

//     return () => {
//       if (section) {
//         section.removeEventListener('mousemove', handleMouseMove)
//       }
//     }
//   }, { scope: sectionRef })

//   return (
//     <section ref={sectionRef} className={styles.testWriteSection}>
//       <div className={styles.content}>
//         <h2 className={styles.statement}>
//           {words.map((word, index) => (
//             <span key={index} className={styles.wordWrapper}>
//               <span className={styles.word}>{word}</span>
//             </span>
//           ))}
//         </h2>
//       </div>
//     </section>
//   )
// }
