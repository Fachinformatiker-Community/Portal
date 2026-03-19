<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const { protocol, hostname } = window.location
const forumHref = `${protocol}//forum.${hostname}`

const navLinks = [
  { label: 'Wiki',    href: '/wiki',                                       external: false },
  { label: 'Forum',  href: forumHref,                                      external: false },
  { label: 'GitHub', href: 'https://github.com/Fachinformatiker-Community', external: true  },
  { label: 'Discord',href: 'https://discord.gg/fachinformatik',            external: true  },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function toggleLocale() {
  const next = locale.value === 'de' ? 'en' : 'de'
  locale.value = next
  localStorage.setItem('locale', next)
}

function scrollToTop() {
  isMobileMenuOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled || isMobileMenuOpen
        ? 'dark:bg-[#09090f]/90 bg-white/90 backdrop-blur-md dark:border-b dark:border-[#2a2a3a] border-b border-gray-200 shadow-lg'
        : 'bg-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between md:grid md:grid-cols-3 h-16 lg:h-20">
        <!-- Logo -->
        <a href="/" @click.prevent="scrollToTop" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg animated-border p-px flex-shrink-0">
            <div class="w-full h-full rounded-[7px] bg-[#09090f] flex items-center justify-center">
              <span class="text-sm font-bold gradient-text">F</span>
            </div>
          </div>
          <span class="text-lg font-bold text-white hidden sm:block">Fachinformatiker Wiki</span>
        </a>

        <!-- Desktop Nav - centered -->
        <div class="hidden md:flex items-center justify-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            :target="link.external ? '_blank' : '_self'"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 relative group"
          >
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-[#bf5fff] group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <!-- Controls - right aligned -->
        <div class="flex items-center justify-end gap-3">
          <!-- Language Toggle -->
          <button
            @click="toggleLocale"
            :title="locale === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'"
            class="flex items-center justify-center transition-opacity duration-200 hover:opacity-70 text-xl leading-none"
          >
            {{ locale === 'de' ? '🇩🇪' : '🇬🇧' }}
          </button>

          <!-- Mobile menu toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-[#16161f] text-gray-300 border border-[#2a2a3a]"
          >
            <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden pb-4 dark:border-t dark:border-[#2a2a3a] border-t border-gray-200 mt-2 pt-4"
        >
          <div class="flex flex-col gap-2">
            <a
              v-for="link in navLinks"
              :key="link.label"
              :href="link.href"
              :target="link.external ? '_blank' : '_self'"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-[#16161f] hover:text-white transition-all"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
