import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './Archive.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ArchiveItem {
    year: string;
    title: string;
    copy: string;
    exhibitionNo: string;
    images: string;
}

const ARCHIVE_DATA: ArchiveItem[] = [
    {
        year: '2023',
        title: 'The Genesis',
        copy: 'When unknown faces met under the quiet skies of Jonggol, becoming the unexpected anchors of our youth.',
        exhibitionNo: 'CH. 01',
        images: 'https://i.ibb.co.com/QFY7Vw2p/seven-Grade.webp',
    },
    {
        year: '2024',
        title: 'The Crucible',
        copy: 'Forged within the chaotic laughter, late-night inside jokes, and shared trials of brotherhood.',
        exhibitionNo: 'CH. 02',
        images: 'https://i.ibb.co.com/qYKdPnV9/eight-Grade.webp',
    },
    {
        year: '2025',
        title: 'The Zenith',
        copy: 'Navigating the highest crests of maturity, holding onto unspoken bonds before the ultimate split.',
        exhibitionNo: 'CH. 03',
        images: 'https://i.ibb.co.com/pBvckxB3/2025-Photo.webp',
    },
    {
        year: '2026',
        title: 'The Departure',
        copy: 'Standing at the edge of tomorrow, armed with memories, bound permanently by yesterday.',
        exhibitionNo: 'CH. 04',
        images: 'https://i.ibb.co.com/d45KGxLD/the-Departure.webp',
    }
]

export const Archive: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const panels = sliderRef.current?.querySelectorAll(`.${styles.panel}`)
        if (!panels || panels.length === 0) return

        // Menggunakan kalkulasi presisi: Total Lebar Konten - Lebar Layar
        const getScrollAmount = () => {
            const sliderWidth = sliderRef.current?.scrollWidth || 0
            const viewportWidth = document.documentElement.clientWidth
            return -(sliderWidth - viewportWidth)
        }

        // Animasi Horizontal Menggunakan ScrollTrigger Pinning
        const tween = gsap.to(sliderRef.current, {
            x: getScrollAmount, // Gunakan x (piksel), bukan xPercent
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                // Panjang scroll disesuaikan dengan jarak pergeseran agar terasa natural 1:1
                end: () => `+=${Math.abs(getScrollAmount())}`,
                invalidateOnRefresh: true // Penting agar kalkulasi ulang saat layar di-resize
            }
        })

        // Efek Paralaks Tambahan untuk Teks Tahun Raksasa di Background
        panels.forEach((panel) => {
            const bgYear = panel.querySelector(`.${styles.bgYear}`)
            if (bgYear) {
                gsap.fromTo(bgYear,
                    { x: 100 }, // Mulai sedikit lebih jauh
                    {
                        x: -100,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: tween, // Hubungkan animasi ini ke timeline horizontal utama
                            start: 'left right', // Saat panel mulai masuk dari kanan
                            end: 'right left',   // Saat panel keluar ke kiri
                            scrub: true
                        }
                    }
                )
            }
        })

    }, { scope: containerRef })

    return (
        <div ref={containerRef} className={styles.archiveContainer}>
            <div ref={sliderRef} className={styles.slider}>

                {ARCHIVE_DATA.map((item, index) => (
                    <section key={index} className={styles.panel}>

                        {/* Background Massive Typography */}
                        <div className={styles.bgYear}>{item.year}</div>

                        <div className={styles.contentLayout}>

                            {/* Sisi Kiri: Narasi Editorial */}
                            <div className={styles.metaSide}>
                                <span className={styles.exhibitionNumber}>{item.exhibitionNo}</span>
                                <h3 className={styles.panelTitle}>{item.title}</h3>
                                <p className={styles.panelCopy}>{item.copy}</p>
                            </div>

                            {/* Sisi Kanan: Placeholder Frame Gambar Premium */}
                            <div className={styles.imageSide}>
                                <div className={styles.imagePlaceholderFrame}>
                                    <img src={item.images} alt={item.title} className={styles.imageInner} />
                                </div>
                            </div>

                        </div>

                    </section>
                ))}

            </div>
        </div>
    )
}
