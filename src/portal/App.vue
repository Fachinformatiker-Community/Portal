<script setup lang="ts">
import NavBar from '@/portal/components/NavBar.vue'
import HeroSection from '@/portal/components/HeroSection.vue'
import FeaturesSection from '@/portal/components/FeaturesSection.vue'
import FooterSection from '@/portal/components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen dark:bg-[#09090f] bg-white dark:text-white text-gray-900 transition-colors duration-300">
    <NavBar />
    <main>
      <HeroSection />
      <FeaturesSection />
    </main>
    <FooterSection />
  </div>
</template>
