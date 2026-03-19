<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[#09090f] border-t border-[#2a2a3a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-sm text-gray-600">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>
        <p class="text-sm text-gray-600">
          {{ t('footer.madeWith') }}
        </p>
      </div>
    </div>
  </footer>
</template>
