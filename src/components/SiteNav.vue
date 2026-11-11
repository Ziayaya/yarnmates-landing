<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { links } from '../data/content.js'
import AppIcon from './AppIcon.vue'

const navItems = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#alur', label: 'Cara Ikut' },
  { href: '#cerita', label: 'Cerita' },
  { href: '#tanya', label: 'FAQ' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function onKeydown(event) {
  if (event.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.removeProperty('overflow')
})

/* Lock the page behind the mobile panel. */
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <header class="nav" :class="{ 'nav--solid': scrolled || menuOpen }">
    <div class="nav__inner shell">
      <a class="brand" href="#top" @click="menuOpen = false">
        <span class="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="16" cy="16" r="12" />
            <path d="M6.5 10.4c4.6 1.8 10.4 6 13.8 12M4.9 17.6c4.4.9 9.6 4 12.4 8.8M11.2 5c3.5 3.2 7.5 9.3 8.9 15.5" />
          </svg>
        </span>
        <span class="brand__text">
          <strong>Yarn Mates</strong>
          <small>Semarang</small>
        </span>
      </a>

      <nav class="nav__links" aria-label="Navigasi utama">
        <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <a class="btn btn--primary nav__cta" :href="links.whatsapp" target="_blank" rel="noopener">
        Gabung
        <AppIcon name="arrow" :size="17" />
      </a>

      <button
        class="nav__toggle"
        :aria-expanded="menuOpen"
        aria-controls="nav-panel"
        @click="menuOpen = !menuOpen"
      >
        <span class="visually-hidden">{{ menuOpen ? 'Tutup menu' : 'Buka menu' }}</span>
        <span class="nav__bars" :class="{ 'is-open': menuOpen }" aria-hidden="true">
          <i></i><i></i>
        </span>
      </button>
    </div>

    <Transition name="panel">
      <div v-if="menuOpen" id="nav-panel" class="panel">
        <nav class="panel__links" aria-label="Navigasi seluler">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            @click="menuOpen = false"
          >
            {{ item.label }}
            <AppIcon name="arrow" :size="18" />
          </a>
        </nav>
        <a
          class="btn btn--primary panel__cta"
          :href="links.whatsapp"
          target="_blank"
          rel="noopener"
          @click="menuOpen = false"
        >
          Gabung grup WhatsApp
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.nav--solid {
  background: rgb(var(--cream-rgb) / 0.86);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom-color: rgb(var(--ink-rgb) / 0.09);
}

.nav__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: 72px;
}

/* ---------- Brand ---------- */

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-right: auto;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--pink-deep);
  color: #fff;
  flex: none;
  box-shadow: var(--shadow-sm);
}

.brand__mark svg {
  width: 22px;
  height: 22px;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand__text strong {
  font-family: var(--font-display);
  font-size: 1.14rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.brand__text small {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

/* ---------- Desktop links ---------- */

.nav__links {
  display: flex;
  gap: 1.9rem;
}

.nav__links a {
  position: relative;
  font-size: 0.93rem;
  font-weight: 500;
  color: var(--ink-soft);
  padding-block: 0.25rem;
  transition: color 0.2s ease;
}

.nav__links a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--pink-deep);
  transition: right 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav__links a:hover {
  color: var(--ink);
}

.nav__links a:hover::after {
  right: 0;
}

.nav__cta {
  padding: 0.68rem 1.25rem;
  font-size: 0.9rem;
}

/* ---------- Mobile toggle ---------- */

.nav__toggle {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: var(--r-sm);
  place-items: center;
}

.nav__bars {
  display: block;
  position: relative;
  width: 22px;
  height: 14px;
}

.nav__bars i {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--ink);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), top 0.28s ease;
}

.nav__bars i:first-child {
  top: 0;
}
.nav__bars i:last-child {
  top: 12px;
}

.nav__bars.is-open i:first-child {
  top: 6px;
  transform: rotate(45deg);
}
.nav__bars.is-open i:last-child {
  top: 6px;
  transform: rotate(-45deg);
}

/* ---------- Mobile panel ---------- */

.panel {
  padding: 0.5rem var(--gutter) 2rem;
  border-top: 1px solid rgb(var(--ink-rgb) / 0.08);
}

.panel__links {
  display: flex;
  flex-direction: column;
}

.panel__links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.25rem;
  font-family: var(--font-display);
  font-size: 1.3rem;
  border-bottom: 1px solid rgb(var(--ink-rgb) / 0.07);
}

.panel__links a svg {
  color: var(--pink-deep);
}

.panel__cta {
  width: 100%;
  margin-top: 1.5rem;
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.22s ease, transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (max-width: 880px) {
  .nav__links,
  .nav__cta {
    display: none;
  }

  .nav__toggle {
    display: grid;
  }
}
</style>
