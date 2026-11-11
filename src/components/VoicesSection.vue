<script setup>
import { testimonials } from '../data/content.js'
import YarnMotif from './YarnMotif.vue'
</script>

<template>
  <section id="cerita" class="section voices">
    <div class="shell">
      <div class="voices__head" v-reveal>
        <div>
          <p class="eyebrow">Cerita mates</p>
          <h2>Yang mereka bawa pulang bukan cuma rajutan.</h2>
        </div>
        <div class="voices__art" aria-hidden="true">
          <YarnMotif variant="swatch" palette="petal" />
        </div>
      </div>

      <ul class="quotes">
        <li
          v-for="(item, i) in testimonials"
          :key="item.name"
          class="quote card"
          :data-accent="item.accent"
          v-reveal="{ delay: i * 110 }"
        >
          <span class="quote__mark" aria-hidden="true">&ldquo;</span>
          <blockquote>{{ item.quote }}</blockquote>
          <footer class="quote__by">
            <span class="quote__avatar" aria-hidden="true">{{ item.name.charAt(0) }}</span>
            <span>
              <strong>{{ item.name }}</strong>
              <small>{{ item.role }}</small>
            </span>
          </footer>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.voices__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: clamp(2.25rem, 4.5vw, 3.25rem);
}

.voices__head h2 {
  max-width: 28ch;
}

.voices__art {
  width: 130px;
  flex: none;
  opacity: 0.85;
}

/* ---------- Quote cards ---------- */

.quotes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.1rem;
}

.quote {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.8rem 1.6rem 1.6rem;
  overflow: hidden;
}

/* Soft colour bleed in the corner of each card */
.quote::after {
  content: '';
  position: absolute;
  top: -3.5rem;
  right: -3.5rem;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background: var(--accent, var(--blush));
  opacity: 0.14;
  pointer-events: none;
}

.quote[data-accent='mauve'] {
  --accent: var(--mauve);
}

.quote[data-accent='pink'] {
  --accent: var(--pink);
}

.quote__mark {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 0.6;
  color: var(--accent, var(--blush));
  margin-bottom: 0.9rem;
}

.quote blockquote {
  margin: 0 0 1.6rem;
  font-size: 0.97rem;
  line-height: 1.68;
  color: var(--ink);
  flex: 1;
}

.quote__by {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgb(var(--ink-rgb) / 0.1);
}

.quote__avatar {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  background: var(--accent, var(--blush));
  color: #fff;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
}

.quote__by span:last-child {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.quote__by strong {
  font-size: 0.92rem;
  font-weight: 600;
}

.quote__by small {
  font-size: 0.78rem;
  color: var(--ink-faint);
}

/* ---------- Responsive ---------- */

@media (max-width: 760px) {
  .voices__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .voices__art {
    width: 100px;
  }
}
</style>
