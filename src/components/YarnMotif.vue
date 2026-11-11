<script setup>
import { computed } from 'vue'

const props = defineProps({
  /* granny | ball | swatch | doily */
  variant: { type: String, default: 'granny' },
  palette: { type: String, default: 'blossom' },
})

const palettes = {
  blossom: ['#d4628a', '#f2b8c6', '#b98098', '#7e3f5b'],
  petal: ['#e88ba8', '#f2b8c6', '#b8426b', '#b98098'],
  dusk: ['#7e3f5b', '#d4628a', '#f2b8c6', '#b98098'],
  rosewood: ['#b8426b', '#e88ba8', '#b98098', '#f2b8c6'],
}

const colors = computed(() => palettes[props.palette] ?? palettes.blossom)

/* Concentric rounded squares — the granny square silhouette. */
const rings = computed(() =>
  [0, 1, 2, 3].map((i) => {
    const inset = 5 + i * 11
    return {
      x: inset,
      y: inset,
      size: 100 - inset * 2,
      color: colors.value[i % colors.value.length],
      radius: 4 + i * 2,
    }
  })
)

/* Rows of V-stitches — a flat swatch in progress. */
const stitchRows = computed(() => {
  const rows = []
  for (let r = 0; r < 5; r += 1) {
    const y = 16 + r * 17
    const cells = []
    for (let c = 0; c < 5; c += 1) {
      const x = 12 + c * 19
      cells.push(`M${x} ${y + 11} L${x + 7.5} ${y} L${x + 15} ${y + 11}`)
    }
    rows.push({ d: cells.join(' '), color: colors.value[r % colors.value.length] })
  }
  return rows
})

/* Radial petals — a doily opening up. */
const petals = computed(() =>
  Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    color: colors.value[i % colors.value.length],
  }))
)

/* Wrapping strands around a ball of yarn. */
/* Unique clip id so several balls on one page don't collide. */
const ballClipId = `yarn-ball-clip-${Math.random().toString(36).slice(2, 9)}`

const strands = [
  'M14 66c14-32 42-50 72-52',
  'M10 48c22-18 54-24 80-14',
  'M22 80c10-38 38-62 70-66',
  'M34 90c2-34 22-64 52-76',
]
</script>

<template>
  <svg
    class="motif"
    viewBox="0 0 100 100"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Granny square -->
    <g v-if="variant === 'granny'" fill="none" stroke-linecap="round">
      <rect
        v-for="(r, i) in rings"
        :key="i"
        :x="r.x"
        :y="r.y"
        :width="r.size"
        :height="r.size"
        :rx="r.radius"
        :stroke="r.color"
        stroke-width="5.5"
        stroke-dasharray="9 5"
      />
      <circle cx="50" cy="50" r="3.4" :fill="colors[0]" />
    </g>

    <!-- Ball of yarn -->
    <g v-else-if="variant === 'ball'" fill="none" stroke-linecap="round">
      <defs>
        <clipPath :id="ballClipId">
          <circle cx="50" cy="50" r="36" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="38" :stroke="colors[0]" stroke-width="5" />
      <g :clip-path="`url(#${ballClipId})`">
        <path
          v-for="(d, i) in strands"
          :key="i"
          :d="d"
          :stroke="colors[(i + 1) % colors.length]"
          stroke-width="3.4"
        />
      </g>
      <path
        d="M86 44c8 6 9 16 4 24"
        :stroke="colors[1]"
        stroke-width="3.4"
      />
    </g>

    <!-- Stitch swatch -->
    <g v-else-if="variant === 'swatch'" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path
        v-for="(row, i) in stitchRows"
        :key="i"
        :d="row.d"
        :stroke="row.color"
        stroke-width="4"
      />
    </g>

    <!-- Doily -->
    <g v-else fill="none" stroke-linecap="round">
      <g v-for="(p, i) in petals" :key="i" :transform="`rotate(${p.angle} 50 50)`">
        <path d="M50 14c7 7 7 15 0 22-7-7-7-15 0-22Z" :stroke="p.color" stroke-width="3" />
      </g>
      <circle cx="50" cy="50" r="16" :stroke="colors[0]" stroke-width="4" stroke-dasharray="7 5" />
      <circle cx="50" cy="50" r="6" :stroke="colors[2]" stroke-width="3" />
    </g>
  </svg>
</template>

<style scoped>
.motif {
  width: 100%;
  height: auto;
  display: block;
}
</style>
