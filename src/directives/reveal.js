/**
 * v-reveal — fades an element in the first time it scrolls into view.
 *
 *   <div v-reveal>                  immediately when seen
 *   <div v-reveal="{ delay: 120 }"> staggered, in milliseconds
 *
 * Elements are revealed once and then unobserved. If the browser has no
 * IntersectionObserver, or the visitor prefers reduced motion, the element
 * is shown straight away rather than left invisible.
 */

const SHOWN = 'is-visible'

let observer = null

function getObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const { delay = 0 } = entry.target._reveal ?? {}
        window.setTimeout(() => entry.target.classList.add(SHOWN), delay)
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  return observer
}

export default {
  mounted(el, binding) {
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal', SHOWN)
      return
    }

    el._reveal = binding.value ?? {}
    el.classList.add('reveal')
    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
    delete el._reveal
  },
}
