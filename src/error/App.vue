<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ErrorBackground from './components/ErrorBackground.vue'
import GlitchNumber from './components/GlitchNumber.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import ErrorActions from './components/ErrorActions.vue'
import ErrorFooter from './components/ErrorFooter.vue'

const visible = ref(false)

// Always redirect to root domain, stripping any subdomains
const homeUrl = (() => {
  const parts = window.location.hostname.split('.')
  const base = parts.length > 2 ? parts.slice(-2).join('.') : parts.join('.')
  return `${window.location.protocol}//${base}`
})()

onMounted(() => {
  requestAnimationFrame(() => { visible.value = true })
})
</script>

<template>
  <div class="min-h-screen bg-[#09090f] flex flex-col items-center justify-center px-4 relative overflow-hidden">

    <ErrorBackground />

    <!-- Main content -->
    <div class="relative z-10 text-center max-w-xl w-full">
      <GlitchNumber :visible="visible" />
      <ErrorMessage :visible="visible" />
      <ErrorActions :visible="visible" :home-url="homeUrl" />
    </div>

    <ErrorFooter />

  </div>
</template>

<style>
/* ── Entrance transitions ────────────────────────────────────── */
.zoom-in-enter-active { transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.zoom-in-enter-from   { opacity: 0; transform: scale(0.75); }

.fade-up-enter-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-up-enter-from   { opacity: 0; transform: translateY(20px); }
</style>

