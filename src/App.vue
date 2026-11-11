<script setup>
import AboutSection from './components/AboutSection.vue'
import FaqSection from './components/FaqSection.vue'
import FlowSection from './components/FlowSection.vue'
import HeroSection from './components/HeroSection.vue'
import JoinSection from './components/JoinSection.vue'
import MeetupsSection from './components/MeetupsSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'
import VoicesSection from './components/VoicesSection.vue'
</script>

<template>
  <a class="skip-link" href="#main">Lewati ke konten utama</a>

  <SiteNav />

  <main id="main">
    <HeroSection />
    <AboutSection />
    <MeetupsSection />
    <FlowSection />
    <VoicesSection />
    <FaqSection />
    <JoinSection />
  </main>

  <SiteFooter />
</template>
