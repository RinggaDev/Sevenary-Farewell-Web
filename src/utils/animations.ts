import { gsap } from 'gsap'

/**
 * Standard fade in animation
 */
export const fadeIn = (
  target: gsap.DOMTarget,
  vars: gsap.TweenVars = {}
): gsap.core.Tween => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...vars.from },
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      ...vars,
    }
  )
}

/**
 * Fade out and scale down animation (useful for screen transitions)
 */
export const fadeOutAndScale = (
  target: gsap.DOMTarget,
  vars: gsap.TweenVars = {}
): gsap.core.Tween => {
  return gsap.to(target, {
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'power2.inOut',
    ...vars,
  })
}

/**
 * Splitting text/char reveal animation (simulated)
 */
export const textReveal = (
  target: gsap.DOMTarget,
  vars: gsap.TweenVars = {}
): gsap.core.Tween => {
  return gsap.fromTo(
    target,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      ...vars,
    }
  )
}

/**
 * Initialize simple parallax scrolling on an element
 * Note: ScrollTrigger must be registered before using this
 */
export const initParallax = (
  trigger: gsap.DOMTarget,
  target: gsap.DOMTarget,
  yPercent: number = -20
): gsap.core.Tween => {
  return gsap.to(target, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}
