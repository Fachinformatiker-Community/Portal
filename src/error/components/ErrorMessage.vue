<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<template>
  <Transition name="fade-up" style="transition-delay: 150ms">
    <div v-if="visible">
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
        Seite nicht gefunden
      </h1>
      <p class="text-gray-400 mb-3 leading-relaxed text-base max-w-md mx-auto">
        Die gesuchte Seite existiert nicht oder wurde verschoben.<br>
        Vielleicht hilft dir ein Blick auf die Startseite weiter.
      </p>
      <p class="text-gray-600 mb-10 text-sm max-w-md mx-auto">
        Sollte dies dennoch ein Fehler sein, kontaktiere bitte
        <a
          href="https://discord.gg/fachinformatik"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#bf5fff] hover:text-[#d580ff] transition-colors duration-200 font-medium"
        >Shinaii</a>
        im Discord.
      </p>
    </div>
  </Transition>
</template>
