import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './Monologue.module.css'

gsap.registerPlugin(ScrollTrigger)

export const Monologue: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // Efek Extreme Parallax pada Gambar
        if (imageRef.current) {
            gsap.fromTo(
                imageRef.current,
                {
                    yPercent: -20, // Mulai dari atas saat belum masuk viewport
                    scale: 1.1, // Beri sedikit scale agar tidak ada ruang kosong saat digeser
                },
                {
                    yPercent: 20, // Geser ke bawah
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom', // Animasi mulai saat ujung atas container menyentuh ujung bawah layar
                        end: 'bottom top', // Animasi selesai saat ujung bawah container melewati atas layar
                        scrub: true, // Ikat pergerakan gambar dengan scroll
                    },
                }
            )
        }

        // Animasi Reveal untuk Copywriting Dramatis
        const quotes = gsap.utils.toArray(`.${styles.quoteLine}`)

        gsap.fromTo(
            quotes,
            { opacity: 0, y: 50, rotateX: -20 },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    }, { scope: containerRef })

    return (
        <section ref={containerRef} className={styles.monologueSection}>
            <div className={styles.contentWrapper}>

                {/* Extreme Parallax Image Frame */}
                <div className={styles.parallaxFrame}>
                    <div ref={imageRef} className={styles.parallaxInner}>
                        <img src="images/groupPhoto.webp" alt="group" />

                    </div>
                </div>

                {/* Copywriting Dramatis */}
                <div className={styles.quoteContainer}>
                    <h2 className={styles.quoteLine}>Time is a thief,</h2>
                    <h2 className={styles.quoteLine}>but this archive is our rebellion.</h2>
                    <h2 className={`${styles.quoteLine} ${styles.italic}`}>Look closely; we are infinite here.</h2>
                </div>

            </div>
        </section>
    )
}