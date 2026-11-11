<script setup>
import { flow, links } from '../data/content.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="alur" class="section flow">
    <div class="shell">
      <div class="flow__head" v-reveal>
        <p class="eyebrow">Cara ikut</p>
        <h2>Empat langkah, dan tidak satu pun yang ribet.</h2>
      </div>

      <ol class="steps">
        <li
          v-for="(step, i) in flow"
          :key="step.step"
          class="step"
          v-reveal="{ delay: i * 100 }"
        >
          <span class="step__num">{{ step.step }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </li>
      </ol>

      <div class="flow__cta" v-reveal>
        <div>
          <h3>Belum punya alat sama sekali?</h3>
          <p>
            Bilang saja di grup. Kami selalu bawa hook pinjaman dan benang
            starter untuk mate baru — kamu tidak perlu belanja apa pun
            sebelum meetup pertama.
          </p>
        </div>
        <a class="btn btn--primary" :href="links.whatsapp" target="_blank" rel="noopener">
          <AppIcon name="whatsapp" :size="18" />
          Tanya di grup
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flow {
  background: var(--cream-deep);
}

.flow__head {
  max-width: 34ch;
  margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
}

/* ---------- Steps ---------- */

.steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 2rem);
  list-style: none;
  margin: 0;
  padding: 0;
}

.step {
  position: relative;
  padding-top: 2.1rem;
  border-top: 2px dashed rgb(var(--ink-rgb) / 0.2);
}

/* The stitched dot sitting on the dashed line */
.step::before {
  content: '';
  position: absolute;
  top: -7px;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--pink-deep);
  box-shadow: 0 0 0 4px var(--cream-deep);
}

.step__num {
  display: block;
  font-family: var(--font-display);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--pink-dark);
  margin-bottom: 0.7rem;
}

.step h3 {
  margin-bottom: 0.55rem;
}

.step p {
  font-size: 0.91rem;
  color: var(--ink-soft);
}

/* ---------- Closing CTA ---------- */

.flow__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem;
  margin-top: clamp(3rem, 6vw, 4.5rem);
  padding: clamp(1.75rem, 4vw, 2.5rem);
  border-radius: var(--r-lg);
  background: var(--shell);
  border: 1px solid rgb(var(--ink-rgb) / 0.09);
  box-shadow: var(--shadow-sm);
}

.flow__cta h3 {
  margin-bottom: 0.5rem;
}

.flow__cta p {
  color: var(--ink-soft);
  font-size: 0.93rem;
  max-width: 56ch;
}

.flow__cta .btn {
  flex: none;
}

/* ---------- Responsive ---------- */

@media (max-width: 900px) {
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .step {
    padding-top: 1.6rem;
  }

  .flow__cta .btn {
    width: 100%;
  }
}
</style>
