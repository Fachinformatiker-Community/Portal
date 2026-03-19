<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const visible = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { visible.value = true })
})
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">

      <!-- Headline -->
      <Transition name="fade-up">
        <h1
          v-if="visible"
          class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-6 dark:text-white text-gray-900"
          style="transition-delay: 80ms"
        >
          <span class="block">{{ t('hero.headline1') }}</span>
          <span class="block hero-gradient-text mt-1">{{ t('hero.headline2') }}</span>
        </h1>
      </Transition>

      <!-- Subheadline -->
      <Transition name="fade-up">
        <p
          v-if="visible"
          class="max-w-2xl mx-auto text-lg sm:text-xl dark:text-gray-400 text-gray-600 leading-relaxed mb-10"
          style="transition-delay: 160ms"
        >
          {{ t('hero.subheadline') }}
        </p>
      </Transition>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 float-animation">
        <div class="w-6 h-10 rounded-full border-2 dark:border-[#2a2a3a] border-gray-300 flex items-start justify-center p-1.5">
          <div class="w-1 h-2 rounded-full bg-[#bf5fff] animate-bounce"></div>
        </div>
      </div>

    </div>
  </section>
</template>
