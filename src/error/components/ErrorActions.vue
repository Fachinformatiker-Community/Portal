<script setup lang="ts">
defineProps<{ visible: boolean; homeUrl: string }>()
</script>

<template>
  <Transition name="fade-up" style="transition-delay: 280ms">
    <div v-if="visible" class="flex flex-col sm:flex-row items-center justify-center gap-3">
      <!-- Primary -->
      <a
        :href="homeUrl"
        class="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#bf5fff] hover:bg-[#d580ff] text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_0_28px_rgba(191,95,255,0.55)]"
      >
        <svg class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Zurück zur Startseite
      </a>
      <!-- Secondary -->
      <a
        href="https://discord.gg/fachinformatik"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#2a2a3a] text-gray-400 font-semibold text-sm hover:border-[#bf5fff]/60 hover:text-[#bf5fff] transition-all duration-200 hover:scale-105"
      >
        <font-awesome-icon :icon="['fab', 'discord']" class="w-4 h-4 flex-shrink-0" />
        Hilfe auf Discord
      </a>
    </div>
  </Transition>
</template>
