<script setup lang="ts">
import NavBar from '@/portal/components/NavBar.vue'
import HeroSection from '@/portal/components/HeroSection.vue'
import FeaturesSection from '@/portal/components/FeaturesSection.vue'
import FooterSection from '@/portal/components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen dark:bg-[#09090f] bg-white dark:text-white text-gray-900">

    <!-- ── Global animated background (fixed, behind everything) ── -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <!-- Grid -->
      <div class="absolute inset-0 grid-bg opacity-50"></div>
      <!-- Pulsing orbs -->
      <div class="absolute -top-32 -left-48 w-[700px] h-[700px] bg-[#bf5fff]/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-[#00e5ff]/8 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]"></div>
      <div class="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#ff2d78]/6 rounded-full blur-3xl animate-pulse [animation-delay:3s]"></div>
      <!-- Floating particles -->
      <span
        v-for="i in 20"
        :key="i"
        class="absolute w-1 h-1 rounded-full"
        :class="i % 3 === 0 ? 'bg-[#00e5ff]/50' : i % 3 === 1 ? 'bg-[#bf5fff]/50' : 'bg-[#ff2d78]/35'"
        :style="{
          left: `${(i * 13 + 7) % 94}%`,
          top: `${(i * 19 + 5) % 88}%`,
          animation: `floatParticle ${5 + (i % 5)}s ease-in-out ${i * 0.35}s infinite alternate`,
        }"
      ></span>
    </div>

    <!-- ── Page content (above bg) ───────────────────────────────── -->
    <NavBar />
    <main class="relative z-[1]">
      <HeroSection />
      <FeaturesSection />
    </main>
    <div class="relative z-[1]">
      <FooterSection />
    </div>

  </div>
</template>
