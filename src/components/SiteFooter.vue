<script setup>
import { community, links } from '../data/content.js'
import AppIcon from './AppIcon.vue'

const year = new Date().getFullYear()

const socials = [
  { icon: 'instagram', label: 'Instagram', href: links.instagram },
  { icon: 'whatsapp', label: 'WhatsApp', href: links.whatsapp },
  { icon: 'mail', label: 'Email', href: links.email },
]

const siteLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#alur', label: 'Cara ikut' },
  { href: '#cerita', label: 'Cerita mates' },
  { href: '#tanya', label: 'FAQ' },
]
</script>

<template>
  <footer class="footer">
    <div class="shell footer__inner">
      <div class="footer__brand">
        <strong>{{ community.name }}</strong>
        <p>
          {{ community.tagline }} sejak {{ community.foundedYear }}.
          Kami merajut bareng satu Sabtu tiap bulan di {{ community.city }}.
        </p>
      </div>

      <nav class="footer__nav" aria-label="Tautan halaman">
        <h2>Halaman</h2>
        <ul>
          <li v-for="link in siteLinks" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="footer__social">
        <h2>Temukan kami</h2>
        <ul>
          <li v-for="social in socials" :key="social.label">
            <a :href="social.href" target="_blank" rel="noopener">
              <AppIcon :name="social.icon" :size="17" />
              {{ social.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="shell footer__base">
      <p>&copy; {{ year }} {{ community.name }}. Dibuat sambil merajut.</p>
      <p>{{ community.city }} &middot; Indonesia</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: clamp(2.5rem, 6vw, 4rem);
  padding-bottom: 2rem;
  border-top: 1px solid rgb(var(--ink-rgb) / 0.12);
  background: var(--cream-deep);
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  padding-bottom: clamp(2rem, 4vw, 3rem);
}

.footer__brand strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
}

.footer__brand p {
  font-size: 0.9rem;
  color: var(--ink-soft);
  max-width: 42ch;
}

.footer h2 {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 1rem;
}

.footer__nav ul,
.footer__social ul {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer__nav a,
.footer__social a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.91rem;
  color: var(--ink-soft);
  transition: color 0.2s ease;
}

.footer__nav a:hover,
.footer__social a:hover {
  color: var(--pink-dark);
}

.footer__social svg {
  color: var(--pink-deep);
}

.footer__base {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgb(var(--ink-rgb) / 0.12);
  font-size: 0.82rem;
  color: var(--ink-faint);
}

@media (max-width: 760px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}
</style>
