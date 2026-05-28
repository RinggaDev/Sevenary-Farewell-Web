import { gsap } from 'gsap'

/**
 * Animation configuration constants
 */
export const ANIMATION_CONFIG = {
  GRID_DURATION: 1.2,
  GRID_STAGGER: 0.15,
  TITLE_DURATION: 1,
  TITLE_STAGGER: 0.25,
  THROUGH_DURATION: 1.2,
  HEADER_DURATION: 0.8,
  FOOTER_DURATION: 0.8,
  FOOTER_STAGGER: 0.1,
  FLOATING_DURATION: 2,
  FLOATING_DISTANCE: -4,
} as const

/**
 * Sets all initial states for animation elements
 */
export const setInitialAnimationStates = (styles: Record<string, string>) => {
  gsap.set(`.${styles.brand}`, { opacity: 0, y: -20 })
  gsap.set(`.${styles.soundButton}`, { opacity: 0, scale: 0.8 })
  gsap.set(`.${styles.resetButton}`, { opacity: 0, y: -10 })
  gsap.set(`.${styles.heroTitle}`, { opacity: 0, yPercent: 100 })
  gsap.set(`.${styles.footerItem}`, { opacity: 0, y: 30 })
  
  gsap.set(`.${styles.gridVerticalLeft}, .${styles.gridVerticalRight}`, {
    scaleY: 0,
    transformOrigin: 'top',
  })
  
  gsap.set([`.${styles.gridHorizontalTop}`, `.${styles.gridHorizontalBottom}`], {
    scaleX: 0,
    transformOrigin: 'left',
  })
}

/**
 * Creates the main entrance animation timeline
 */
export const createEntranceTimeline = (styles: Record<string, string>) => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  // Grid lines appear first
  tl.to(`.${styles.gridVerticalLeft}, .${styles.gridVerticalRight}`, {
    scaleY: 1,
    duration: ANIMATION_CONFIG.GRID_DURATION,
    stagger: ANIMATION_CONFIG.GRID_STAGGER,
  })
    .to(
      [`.${styles.gridHorizontalTop}`, `.${styles.gridHorizontalBottom}`],
      {
        scaleX: 1,
        duration: ANIMATION_CONFIG.GRID_DURATION + 0.2,
        stagger: ANIMATION_CONFIG.GRID_STAGGER,
      },
      '-=0.8'
    )
    
    // Hero title reveal
    .fromTo(
      `.${styles.heroTitle}`,
      {
        opacity: 0,
        yPercent: 120,
        skewY: 5,
      },
      {
        opacity: 1,
        yPercent: 0,
        skewY: 0,
        duration: ANIMATION_CONFIG.TITLE_DURATION,
        stagger: ANIMATION_CONFIG.TITLE_STAGGER,
        ease: 'power4.out',
      },
      '-=0.9'
    )
    
    // "Through" text fade
    .fromTo(
      `.${styles.throughText}`,
      { opacity: 0, x: -30 },
      {
        opacity: 0.8,
        x: 0,
        duration: ANIMATION_CONFIG.THROUGH_DURATION,
        ease: 'power3.out',
      },
      '-=1.0'
    )
    
    // Header elements
    .to(
      `.${styles.brand}`,
      { opacity: 1, y: 0, duration: ANIMATION_CONFIG.HEADER_DURATION },
      '-=1.2'
    )
    .to(
      `.${styles.soundButton}`,
      { opacity: 1, scale: 1, duration: 0.6 },
      '-=1.0'
    )
    .to(
      `.${styles.resetButton}`,
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.9'
    )
    
    // Footer elements
    .to(
      `.${styles.footerItem}`,
      {
        opacity: 1,
        y: 0,
        stagger: ANIMATION_CONFIG.FOOTER_STAGGER,
        duration: ANIMATION_CONFIG.FOOTER_DURATION,
      },
      '-=1.1'
    )

  return tl
}

/**
 * Creates the floating button animation
 */
export const createFloatingAnimation = (styles: Record<string, string>) => {
  return gsap.to(`.${styles.soundButton}`, {
    y: ANIMATION_CONFIG.FLOATING_DISTANCE,
    duration: ANIMATION_CONFIG.FLOATING_DURATION,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
}