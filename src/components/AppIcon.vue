<script setup>
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

/* Stroke-based pictograms, drawn on a 24x24 grid. */
const paths = {
  hook: ['M9 21V9.5', 'M9 9.5a4 4 0 1 1 6.2-3.3', 'M9 21h3.6'],
  heart: ['M12 20s-7-4.4-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6c0 5-7 9.4-7 9.4Z'],
  cup: [
    'M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z',
    'M16 9.5h1.8a2.7 2.7 0 0 1 0 5.4H16',
    'M6 4.4v1.3M10 3.7v2M14 4.4v1.3',
  ],
  yarn: [
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
    'M5.2 7.6C8.6 9 13 12.2 15.6 16.8',
    'M3.4 13.2c3.3.6 7.2 3 9.3 6.6',
    'M8.4 3.7c2.6 2.4 5.6 7 6.7 11.6',
  ],
  pin: [
    'M12 21s6.5-6.1 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z',
    'M12 13a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z',
  ],
  calendar: ['M4.5 6.5h15v13h-15z', 'M4.5 10.5h15', 'M8.5 3.5v4M15.5 3.5v4'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7.5V12l3 2'],
  arrow: ['M4.5 12h15', 'M13.5 6l6 6-6 6'],
  plus: ['M12 5.5v13M5.5 12h13'],
  instagram: [
    'M7.2 3.5h9.6a3.7 3.7 0 0 1 3.7 3.7v9.6a3.7 3.7 0 0 1-3.7 3.7H7.2a3.7 3.7 0 0 1-3.7-3.7V7.2a3.7 3.7 0 0 1 3.7-3.7Z',
    'M12 15.8a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z',
    'M17.1 7.3h.01',
  ],
  whatsapp: [
    'M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.4 20.8l4.3-1.1A8.8 8.8 0 1 0 12 3.2Z',
    'M9 8.6c0 3 2.4 5.4 5.4 5.4l.9-1.5-2-.8-.8.9a4.2 4.2 0 0 1-2-2l.9-.8-.8-2-1.6.8Z',
  ],
  mail: ['M3.5 6.5h17v11h-17z', 'M3.5 7l8.5 6 8.5-6'],
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in paths[name] || []" :key="i" :d="d" />
  </svg>
</template>
