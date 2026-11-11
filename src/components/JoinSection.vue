<script setup>
import { links, meetups } from '../data/content.js'
import AppIcon from './AppIcon.vue'
import YarnMotif from './YarnMotif.vue'

const next = meetups[0]
</script>

<template>
  <section id="gabung" class="join">
    <div class="shell">
      <div class="join__card" v-reveal>
        <div class="join__motifs" aria-hidden="true">
          <YarnMotif variant="ball" palette="blossom" />
          <YarnMotif variant="doily" palette="dusk" />
          <YarnMotif variant="granny" palette="rosewood" />
        </div>

        <div class="join__body">
          <p class="eyebrow join__eyebrow">Kursimu sudah ada</p>
          <h2>Ketemu di meja yang sama, {{ next.dateLabel }}.</h2>
          <p class="join__lede">
            Gabung grup WhatsApp untuk tahu lokasi final, tanya-tanya soal pola,
            atau sekadar lihat progres orang lain sampai kamu siap datang.
            Tidak ada kewajiban hadir setiap bulan.
          </p>

          <div class="join__actions">
            <a class="btn btn--primary" :href="links.whatsapp" target="_blank" rel="noopener">
              <AppIcon name="whatsapp" :size="18" />
              Gabung grup WhatsApp
            </a>
            <a class="btn btn--outline" :href="links.instagram" target="_blank" rel="noopener">
              <AppIcon name="instagram" :size="18" />
              Ikuti Instagram
            </a>
          </div>

          <p class="join__small">
            Lebih suka email? Tulis ke
            <a :href="links.email">hello@yarnmates.id</a> — dibalas dalam
            beberapa hari oleh salah satu dari kami.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.join {
  padding-block: clamp(2rem, 5vw, 3rem) var(--section-y);
}

.join__card {
  position: relative;
  overflow: hidden;
  padding: clamp(2.25rem, 6vw, 4.5rem);
  border-radius: var(--r-xl);
  background: var(--ink);
  color: var(--cream);
  box-shadow: var(--shadow-lg);
}

/* Faint motifs drifting behind the copy */
.join__motifs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.17;
}

.join__motifs > :deep(svg) {
  position: absolute;
}

.join__motifs > :deep(svg:nth-child(1)) {
  width: 230px;
  right: -3rem;
  top: -3rem;
}

.join__motifs > :deep(svg:nth-child(2)) {
  width: 170px;
  right: 9rem;
  bottom: -4rem;
}

.join__motifs > :deep(svg:nth-child(3)) {
  width: 140px;
  left: -2.5rem;
  bottom: 2rem;
}

.join__body {
  position: relative;
  max-width: 58ch;
}

.join__eyebrow {
  color: var(--blush);
}

.join__card h2 {
  font-size: clamp(1.9rem, 4.4vw, 2.9rem);
  margin-bottom: 1.1rem;
}

.join__lede {
  color: rgb(var(--cream-rgb) / 0.76);
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  max-width: 52ch;
}

.join__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin: 2.1rem 0 1.75rem;
}

.btn--outline {
  border: 1.5px solid rgb(var(--cream-rgb) / 0.32);
  color: var(--cream);
}

.btn--outline:hover {
  border-color: var(--cream);
  background: rgb(var(--cream-rgb) / 0.09);
}

.join__small {
  font-size: 0.87rem;
  color: rgb(var(--cream-rgb) / 0.58);
}

.join__small a {
  color: var(--blush);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}

@media (max-width: 480px) {
  .join__actions .btn {
    width: 100%;
  }
}
</style>
