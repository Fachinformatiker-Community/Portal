<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const features = computed(() => tm('features.items') as Array<{ icon: string; title: string; desc: string }>)
</script>

<template>
  <section id="features" class="py-24 dark:bg-[#09090f] bg-white relative overflow-hidden">
    <!-- Background accent -->
    <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 dark:opacity-10 blur-[120px] bg-[#00e5ff] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full dark:bg-[#00e5ff]/10 bg-cyan-100 dark:text-[#00e5ff] text-cyan-700 dark:border dark:border-[#00e5ff]/30 border border-cyan-200 mb-4">
          {{ t('features.badge') }}
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-gray-900 mb-4">
          {{ t('features.headline') }}
        </h2>
        <p class="max-w-2xl mx-auto dark:text-gray-400 text-gray-600 text-lg">
          {{ t('features.subheadline') }}
        </p>
      </div>

      <!-- Feature grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group relative p-6 rounded-2xl dark:bg-[#16161f] bg-gray-50 dark:border border border-gray-200 dark:border-[#2a2a3a] hover:border-[#bf5fff] dark:hover:border-[#bf5fff] transition-all duration-300 hover:shadow-lg hover:shadow-[#bf5fff]/10 cursor-default"
        >
          <!-- Gradient top border on hover -->
          <div class="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[#bf5fff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div class="text-3xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-lg font-bold dark:text-white text-gray-900 mb-2 group-hover:text-[#bf5fff] transition-colors duration-200">
            {{ feature.title }}
          </h3>
          <p class="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
            {{ feature.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
