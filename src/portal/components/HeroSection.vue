<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-[#09090f] bg-gray-50 grid-bg">
    <!-- Radial glow blobs -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-30 blur-[120px] bg-[#bf5fff] pointer-events-none"></div>
    <div class="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 dark:opacity-20 blur-[100px] bg-[#00e5ff] pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">


      <!-- Headline -->
      <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-6 dark:text-white text-gray-900">
        <span class="block">{{ t('hero.headline1') }}</span>
        <span class="block gradient-text glow-text-purple mt-1">{{ t('hero.headline2') }}</span>
      </h1>

      <!-- Subheadline -->
      <p class="max-w-2xl mx-auto text-lg sm:text-xl dark:text-gray-400 text-gray-600 leading-relaxed mb-10">
        {{ t('hero.subheadline') }}
      </p>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 float-animation">
        <div class="w-6 h-10 rounded-full dark:border-2 border-2 dark:border-[#2a2a3a] border-gray-300 flex items-start justify-center p-1.5">
          <div class="w-1 h-2 rounded-full bg-[#bf5fff] animate-bounce"></div>
        </div>
      </div>
    </div>
  </section>
</template>
