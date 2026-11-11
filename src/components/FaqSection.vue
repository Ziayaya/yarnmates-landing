<script setup>
import { ref } from 'vue'
import { faqs, links } from '../data/content.js'
import AppIcon from './AppIcon.vue'

/* One panel open at a time; clicking the open one closes it. */
const openIndex = ref(0)

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <section id="tanya" class="section faq">
    <div class="shell faq__grid">
      <div class="faq__aside" v-reveal>
        <p class="eyebrow">Tanya jawab</p>
        <h2>Hal-hal yang biasanya ditanya sebelum datang.</h2>
        <p class="lede faq__lede">
          Belum terjawab? Kirim pertanyaan ke grup atau DM Instagram kami —
          dijawab orang asli, bukan bot.
        </p>
        <a class="btn btn--ghost" :href="links.instagram" target="_blank" rel="noopener">
          <AppIcon name="instagram" :size="18" />
          DM Instagram
        </a>
      </div>

      <ul class="faq__list" v-reveal>
        <li v-for="(item, i) in faqs" :key="item.q" class="qa" :class="{ 'is-open': openIndex === i }">
          <h3>
            <button
              class="qa__btn"
              :aria-expanded="openIndex === i"
              :aria-controls="`faq-panel-${i}`"
              :id="`faq-btn-${i}`"
              @click="toggle(i)"
            >
              <span>{{ item.q }}</span>
              <span class="qa__icon" aria-hidden="true">
                <AppIcon name="plus" :size="18" />
              </span>
            </button>
          </h3>

          <div
            class="qa__panel"
            :id="`faq-panel-${i}`"
            role="region"
            :aria-labelledby="`faq-btn-${i}`"
            :hidden="openIndex !== i"
          >
            <p>{{ item.a }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.faq__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}

.faq__aside {
  position: sticky;
  top: 108px;
}

.faq__aside h2 {
  margin-bottom: 1rem;
}

.faq__lede {
  margin-bottom: 1.6rem;
}

/* ---------- Accordion ---------- */

.faq__list {
  border-top: 1px solid rgb(var(--ink-rgb) / 0.14);
}

.qa {
  border-bottom: 1px solid rgb(var(--ink-rgb) / 0.14);
}

.qa h3 {
  font-size: inherit;
  margin: 0;
}

.qa__btn {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
  padding: 1.3rem 0;
  text-align: left;
  font-family: var(--font-display);
  font-size: clamp(1.02rem, 1.9vw, 1.2rem);
  font-weight: 600;
  letter-spacing: -0.005em;
  line-height: 1.35;
  transition: color 0.2s ease;
}

.qa__btn:hover {
  color: var(--pink-dark);
}

.qa__icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  flex: none;
  margin-top: 0.1rem;
  border-radius: 50%;
  background: var(--cream-deep);
  color: var(--pink-deep);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.2s ease;
}

.qa.is-open .qa__icon {
  transform: rotate(135deg);
  background: var(--pink-deep);
  color: #fff;
}

.qa__panel {
  padding-bottom: 1.5rem;
  padding-right: clamp(0rem, 4vw, 3.5rem);
  animation: unfurl 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.qa__panel p {
  font-size: 0.94rem;
  color: var(--ink-soft);
  max-width: 62ch;
}

@keyframes unfurl {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Responsive ---------- */

@media (max-width: 900px) {
  .faq__grid {
    grid-template-columns: 1fr;
  }

  .faq__aside {
    position: static;
  }
}
</style>
