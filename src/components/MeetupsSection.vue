<script setup>
import { computed } from 'vue'
import { links, meetups } from '../data/content.js'
import AppIcon from './AppIcon.vue'
import YarnMotif from './YarnMotif.vue'

const featured = meetups[0]
const rest = meetups.slice(1)

/* "28 Nov" split into parts for the date badge. */
function badge(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return {
    day: d.toLocaleDateString('id-ID', { day: '2-digit' }),
    month: d.toLocaleDateString('id-ID', { month: 'short' }),
    weekday: d.toLocaleDateString('id-ID', { weekday: 'long' }),
  }
}

const featuredBadge = computed(() => badge(featured.date))
</script>

<template>
  <section id="agenda" class="section agenda">
    <div class="shell">
      <div class="agenda__head" v-reveal>
        <div>
          <p class="eyebrow">Agenda</p>
          <h2>Satu Sabtu, tiap bulan, pindah-pindah area.</h2>
        </div>
        <p class="lede">
          Tema tiap bulan berbeda, tapi aturannya sama: datang bebas, pulang bebas,
          dan tidak ada yang wajib menyelesaikan apa pun.
        </p>
      </div>

      <!-- Featured: the next meetup -->
      <article class="feature" v-reveal>
        <div class="feature__art" aria-hidden="true">
          <YarnMotif variant="granny" palette="blossom" />
        </div>

        <div class="feature__body">
          <span class="tag tag--live">
            <span class="tag__dot"></span>
            Meetup berikutnya
          </span>

          <h3 class="feature__theme">{{ featured.theme }}</h3>
          <p class="feature__blurb">{{ featured.blurb }}</p>

          <ul class="facts">
            <li>
              <AppIcon name="calendar" :size="17" />
              {{ featured.dateLabel }}
            </li>
            <li>
              <AppIcon name="clock" :size="17" />
              {{ featured.time }}
            </li>
            <li>
              <AppIcon name="pin" :size="17" />
              {{ featured.venue }}
            </li>
            <li>
              <AppIcon name="hook" :size="17" />
              {{ featured.level }}
            </li>
          </ul>

          <div class="bring">
            <span class="bring__label">Bawa</span>
            <ul>
              <li v-for="item in featured.bring" :key="item">{{ item }}</li>
            </ul>
          </div>

          <a class="btn btn--primary" :href="links.rsvp" target="_blank" rel="noopener">
            RSVP untuk meetup ini
            <AppIcon name="arrow" :size="17" />
          </a>
        </div>

        <div class="feature__date" aria-hidden="true">
          <strong>{{ featuredBadge.day }}</strong>
          <span>{{ featuredBadge.month }}</span>
        </div>
      </article>

      <!-- The two months after that -->
      <ul class="upcoming">
        <li
          v-for="(meetup, i) in rest"
          :key="meetup.date"
          class="upcard card"
          :data-accent="meetup.accent"
          v-reveal="{ delay: i * 110 }"
        >
          <div class="upcard__top">
            <div class="upcard__date">
              <strong>{{ badge(meetup.date).day }}</strong>
              <span>{{ badge(meetup.date).month }}</span>
            </div>
            <span class="tag">{{ meetup.level }}</span>
          </div>

          <h3>{{ meetup.theme }}</h3>
          <p class="upcard__blurb">{{ meetup.blurb }}</p>

          <dl class="upcard__meta">
            <div>
              <dt>Waktu</dt>
              <dd>{{ badge(meetup.date).weekday }}, {{ meetup.time }}</dd>
            </div>
            <div>
              <dt>Lokasi</dt>
              <dd>{{ meetup.venue }}</dd>
            </div>
          </dl>
        </li>
      </ul>

      <p class="agenda__foot" v-reveal>
        Tanggal dan lokasi final selalu diumumkan ulang di
        <a :href="links.instagram" target="_blank" rel="noopener">Instagram</a>
        seminggu sebelum hari-H.
      </p>
    </div>
  </section>
</template>

<style scoped>
.agenda {
  background: linear-gradient(
    180deg,
    transparent,
    rgb(var(--cream-deep-rgb) / 0.55) 18%,
    transparent
  );
}

.agenda__head {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end;
  margin-bottom: clamp(2.25rem, 4.5vw, 3.25rem);
}

/* ---------- Tags ---------- */

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.34rem 0.8rem;
  border-radius: var(--r-pill);
  background: var(--cream-deep);
  color: var(--ink-soft);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.tag--live {
  background: rgb(var(--pink-rgb) / 0.12);
  color: var(--pink-dark);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  margin-bottom: 1.1rem;
}

.tag__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--pink-deep);
  box-shadow: 0 0 0 0 rgb(var(--pink-rgb) / 0.55);
  animation: pulse 2.2s ease-out infinite;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 9px rgb(var(--pink-rgb) / 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgb(var(--pink-rgb) / 0);
  }
}

/* ---------- Featured card ---------- */

.feature {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  gap: clamp(1.5rem, 4vw, 3.25rem);
  align-items: center;
  padding: clamp(1.6rem, 4vw, 2.9rem);
  border-radius: var(--r-xl);
  background: var(--shell);
  border: 1px solid rgb(var(--ink-rgb) / 0.09);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.feature__art {
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: var(--r-lg);
  background: var(--cream-deep);
}

.feature__theme {
  font-size: clamp(1.6rem, 3.4vw, 2.3rem);
  margin-bottom: 0.75rem;
}

.feature__blurb {
  color: var(--ink-soft);
  max-width: 54ch;
  margin-bottom: 1.6rem;
}

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem 1.25rem;
  padding-block: 1.3rem;
  border-block: 1px solid rgb(var(--ink-rgb) / 0.1);
}

.facts li {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.facts svg {
  color: var(--pink-deep);
  flex: none;
}

.bring {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin: 1.3rem 0 1.8rem;
}

.bring__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.bring ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.bring li {
  padding: 0.28rem 0.7rem;
  border-radius: var(--r-pill);
  border: 1px dashed rgb(var(--ink-rgb) / 0.26);
  font-size: 0.78rem;
  color: var(--ink-soft);
}

.feature__date {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.85rem 1.1rem 0.95rem;
  border-bottom-left-radius: var(--r-md);
  background: var(--ink);
  color: var(--cream);
  line-height: 1;
}

.feature__date strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
}

.feature__date span {
  margin-top: 0.22rem;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blush);
}

/* ---------- Upcoming cards ---------- */

.upcoming {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr));
  gap: 1.1rem;
  margin-top: 1.1rem;
}

.upcard {
  padding: 1.6rem 1.5rem;
  border-top: 3px solid var(--accent, var(--blush));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.upcard[data-accent='mauve'] {
  --accent: var(--mauve);
}

.upcard[data-accent='plum'] {
  --accent: var(--plum);
}

.upcard[data-accent='pink'] {
  --accent: var(--pink);
}

.upcard:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.upcard__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.upcard__date {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.upcard__date strong {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 600;
  line-height: 1;
  color: var(--accent, var(--blush));
}

.upcard__date span {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.upcard h3 {
  margin-bottom: 0.55rem;
}

.upcard__blurb {
  font-size: 0.89rem;
  color: var(--ink-soft);
}

.upcard__meta {
  display: grid;
  gap: 0.75rem;
  margin: 1.35rem 0 0;
  padding-top: 1.2rem;
  border-top: 1px solid rgb(var(--ink-rgb) / 0.1);
}

.upcard__meta dt {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.upcard__meta dd {
  margin: 0.2rem 0 0;
  font-size: 0.87rem;
  font-weight: 500;
}

/* ---------- Footnote ---------- */

.agenda__foot {
  margin-top: 2rem;
  font-size: 0.89rem;
  color: var(--ink-faint);
  text-align: center;
}

.agenda__foot a {
  color: var(--pink-dark);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}

/* ---------- Responsive ---------- */

@media (max-width: 920px) {
  .agenda__head,
  .feature {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .feature__art {
    max-width: 240px;
  }

  .feature__date {
    position: static;
    align-self: start;
    flex-direction: row;
    align-items: baseline;
    gap: 0.4rem;
    border-radius: var(--r-pill);
    padding: 0.5rem 1rem;
    order: -1;
  }
}

@media (max-width: 480px) {
  .facts {
    grid-template-columns: 1fr;
  }
}
</style>
