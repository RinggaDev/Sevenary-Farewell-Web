import React, { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './ImageLoader.module.css'

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (isLoaded && imgRef.current && loaderRef.current) {
        // Fade out skeleton loader and fade in image simultaneously
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none'
          },
        })

        gsap.fromTo(
          imgRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        )
      }
    },
    { dependencies: [isLoaded], scope: containerRef }
  )

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {!isLoaded && (
        <div ref={loaderRef} className={styles.loader}>
          <div className={styles.spinner} />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={styles.image}
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
        loading="lazy"
      />
    </div>
  )
}
