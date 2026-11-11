<script setup>
import { pillars } from '../data/content.js'
import AppIcon from './AppIcon.vue'
import YarnMotif from './YarnMotif.vue'
</script>

<template>
  <section id="tentang" class="section about">
    <div class="shell">
      <div class="about__head">
        <div v-reveal>
          <p class="eyebrow">Tentang kami</p>
          <h2>Bukan kelas rajut. Lebih seperti ruang tamu yang kebetulan penuh benang.</h2>
        </div>
        <p class="lede about__intro" v-reveal>
          Yarn Mates mulai tahun 2023 dari empat orang yang bosan merajut sendirian
          di kamar masing-masing. Sekarang kami satu meja panjang yang terisi
          sebulan sekali — mahasiswa, ibu rumah tangga, pekerja kantor, dan
          satu orang yang hanya bikin doily.
        </p>
      </div>

      <ul class="pillars">
        <li
          v-for="(pillar, i) in pillars"
          :key="pillar.title"
          class="pillar card"
          v-reveal="{ delay: i * 90 }"
        >
          <span class="pillar__icon">
            <AppIcon :name="pillar.icon" :size="22" />
          </span>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.body }}</p>
        </li>
      </ul>

      <div class="note" v-reveal>
        <div class="note__art" aria-hidden="true">
          <YarnMotif variant="doily" palette="rosewood" />
        </div>
        <div class="note__body">
          <h3>&ldquo;Bisa nggak ya saya ikut?&rdquo;</h3>
          <p>
            Iya, bisa. Itu pertanyaan yang hampir semua mate tanyakan sebelum
            meetup pertama mereka. Tidak ada tes masuk, tidak ada minimum skill,
            dan tidak ada yang akan melihat tusukanmu lalu menghela napas.
            Kalau kamu bisa duduk tiga jam dan suka suara benang ditarik,
            kamu sudah memenuhi syarat.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__head {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.about__intro {
  padding-bottom: 0.4rem;
}

/* ---------- Pillars ---------- */

.pillars {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.1rem;
}

.pillar {
  padding: 1.7rem 1.5rem 1.8rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.pillar:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.pillar__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 1.15rem;
  border-radius: 14px;
  background: var(--cream-deep);
  color: var(--pink-deep);
}

.pillar h3 {
  margin-bottom: 0.6rem;
}

.pillar p {
  font-size: 0.92rem;
  color: var(--ink-soft);
}

/* ---------- Reassurance note ---------- */

.note {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
  margin-top: 1.1rem;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border-radius: var(--r-lg);
  background: var(--linen);
  border: 1px solid rgb(var(--ink-rgb) / 0.08);
}

.note__art {
  width: 100%;
  max-width: 170px;
  opacity: 0.9;
}

.note__body h3 {
  font-size: clamp(1.3rem, 2.6vw, 1.75rem);
  margin-bottom: 0.7rem;
}

.note__body p {
  color: var(--ink-soft);
  max-width: 62ch;
}

/* ---------- Responsive ---------- */

@media (max-width: 1000px) {
  .pillars {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .about__head {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .note {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .note__art {
    max-width: 110px;
  }
}

@media (max-width: 560px) {
  .pillars {
    grid-template-columns: 1fr;
  }
}
</style>
