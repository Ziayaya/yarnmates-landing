<script setup>
import { community, links, meetups, stats } from '../data/content.js'
import AppIcon from './AppIcon.vue'
import YarnMotif from './YarnMotif.vue'

const next = meetups[0]
</script>

<template>
  <section id="top" class="hero">
    <!-- Soft colour washes behind the content -->
    <div class="hero__wash hero__wash--a" aria-hidden="true"></div>
    <div class="hero__wash hero__wash--b" aria-hidden="true"></div>

    <div class="shell hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">{{ community.city }}</p>

        <h1>
          Merajut
          <span class="hl">
            bareng
            <svg class="hl__line" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M2 9c34-7 70-8 104-5 24 2 48 5 92 2"
                fill="none"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
              />
            </svg>
          </span>
          setiap bulan di Semarang.
        </h1>

        <p class="lede hero__lede">
          Yarn Mates ketemu satu Sabtu tiap bulan untuk duduk, merajut, dan ngobrol.
          Bawa hook dan proyek yang belum kelar — atau datang tanpa apa-apa
          dan belajar tusuk pertamamu di meja kami.
        </p>

        <div class="hero__actions">
          <a class="btn btn--primary" :href="links.whatsapp" target="_blank" rel="noopener">
            <AppIcon name="whatsapp" :size="18" />
            Gabung grup WhatsApp
          </a>
          <a class="btn btn--ghost" href="#agenda">
            Lihat agenda bulan ini
            <AppIcon name="arrow" :size="17" />
          </a>
        </div>

        <dl class="hero__stats">
          <div v-for="stat in stats" :key="stat.label">
            <dt>{{ stat.value }}</dt>
            <dd>{{ stat.label }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero__art">
        <div class="art__card art__card--main">
          <YarnMotif variant="granny" palette="blossom" />
        </div>

        <div class="art__card art__card--ball">
          <YarnMotif variant="ball" palette="petal" />
        </div>

        <div class="art__card art__card--swatch">
          <YarnMotif variant="swatch" palette="dusk" />
        </div>

        <div class="art__chip">
          <span class="art__chip-label">Meetup berikutnya</span>
          <strong>{{ next.dateLabel }}</strong>
          <span class="art__chip-meta">
            <AppIcon name="pin" :size="15" />
            {{ next.venue }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(4rem, 9vw, 7rem);
  overflow: hidden;
}

/* ---------- Background washes ---------- */

.hero__wash {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
  z-index: 0;
}

.hero__wash--a {
  top: -14rem;
  right: -10rem;
  width: 42rem;
  height: 42rem;
  background: radial-gradient(circle, rgb(var(--blush-rgb) / 0.55), transparent 68%);
}

.hero__wash--b {
  bottom: -18rem;
  left: -14rem;
  width: 36rem;
  height: 36rem;
  background: radial-gradient(circle, rgb(var(--pink-rgb) / 0.2), transparent 68%);
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}

/* ---------- Copy ---------- */

.hero__copy h1 {
  margin-bottom: 1.5rem;
}

.hl {
  position: relative;
  color: var(--pink-deep);
  white-space: nowrap;
  font-style: italic;
  font-variation-settings: 'SOFT' 60, 'WONK' 1;
}

.hl__line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.12em;
  width: 100%;
  height: 0.28em;
  color: var(--blush);
  z-index: -1;
}

.hero__lede {
  max-width: 50ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2.1rem;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem 1.25rem;
  margin: 3.2rem 0 0;
  padding-top: 1.9rem;
  border-top: 1px solid rgb(var(--ink-rgb) / 0.12);
}

.hero__stats dt {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.6vw, 1.95rem);
  font-weight: 600;
  line-height: 1;
  color: var(--ink);
}

.hero__stats dd {
  margin: 0.4rem 0 0;
  font-size: 0.8rem;
  line-height: 1.35;
  color: var(--ink-faint);
}

/* ---------- Art composition ---------- */

.hero__art {
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 460px;
  margin-inline: auto;
  width: 100%;
}

.art__card {
  position: absolute;
  background: var(--shell);
  border: 1px solid rgb(var(--ink-rgb) / 0.09);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-lg);
  padding: 1.1rem;
  animation: drift 9s ease-in-out infinite;
}

.art__card--main {
  inset: 8% 14% 20% 6%;
  padding: 1.8rem;
  background: var(--cream-deep);
}

.art__card--ball {
  width: 36%;
  right: 2%;
  top: 4%;
  animation-delay: -3s;
}

.art__card--swatch {
  width: 40%;
  right: 6%;
  bottom: 12%;
  animation-delay: -6s;
}

@keyframes drift {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-11px) rotate(1.2deg);
  }
}

.art__chip {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  padding: 0.95rem 1.2rem;
  border-radius: var(--r-md);
  background: var(--ink);
  color: var(--cream);
  box-shadow: var(--shadow-lg);
  max-width: 78%;
}

.art__chip-label {
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--blush);
}

.art__chip strong {
  font-family: var(--font-display);
  font-size: 1.04rem;
  font-weight: 600;
  line-height: 1.25;
}

.art__chip-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: rgb(var(--cream-rgb) / 0.72);
}

/* ---------- Responsive ---------- */

@media (max-width: 960px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero__art {
    order: -1;
    max-width: 370px;
  }

  .hero__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 2.6rem;
  }
}

@media (max-width: 420px) {
  .hero__actions .btn {
    width: 100%;
  }
}
</style>
