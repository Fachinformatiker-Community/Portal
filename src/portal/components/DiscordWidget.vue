<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIntersectionObserver } from '@vueuse/core'

const { t } = useI18n()

interface DiscordMember {
  id: string
  username: string
  status: 'online' | 'idle' | 'dnd'
  avatar_url: string
  game?: { name: string }
}

interface DiscordWidget {
  id: string
  name: string
  instant_invite: string
  presence_count: number
  members: DiscordMember[]
}

const widget = ref<DiscordWidget | null>(null)
const loading = ref(true)
const error = ref(false)

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const { stop } = useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      visible.value = true
      stop()
    }
  },
  { threshold: 0.1 },
)

const statusColor: Record<string, string> = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
}

const displayMembers = computed(() => {
  if (!widget.value) return []
  return widget.value.members
    .filter((m) => m.username !== 'Ticket Tool')
    .slice(0, 24)
})

const remainingCount = computed(() => {
  if (!widget.value) return 0
  const total = widget.value.presence_count
  return Math.max(0, total - displayMembers.value.length)
})

// Animated count-up
const animatedCount = ref(0)
let countAnimationDone = false

watch([visible, widget], ([isVisible, w]) => {
  if (!isVisible || !w || countAnimationDone) return
  countAnimationDone = true
  const target = w.presence_count
  const duration = 1600
  const start = performance.now()
  const step = (now: number) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedCount.value = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
})

// Random avatars for the showcase ring
const ringAvatars = computed(() => {
  if (!widget.value) return []
  const members = widget.value.members.filter((m) => m.username !== 'Ticket Tool')
  const shuffled = [...members].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 8)
})

// Floating ambient avatars — cycling positions & users
interface FloatingAvatar {
  key: number
  avatar_url: string
  username: string
  left: string
  top: string
  size: number
  duration: number
  delay: number
}

const floatingAvatars = ref<FloatingAvatar[]>([])
let floatKeyCounter = 0
const floatTimers: ReturnType<typeof setTimeout>[] = []

function randomFloat(pool: DiscordMember[]): FloatingAvatar {
  const m = pool[Math.floor(Math.random() * pool.length)]
  return {
    key: floatKeyCounter++,
    avatar_url: m.avatar_url,
    username: m.username,
    left: `${3 + Math.random() * 90}%`,
    top: `${3 + Math.random() * 85}%`,
    size: 22 + Math.floor(Math.random() * 3) * 8,
    duration: 5 + Math.random() * 4,
    delay: 0,
  }
}

function startFloatingAvatars() {
  if (!widget.value) return
  const pool = widget.value.members.filter((m) => m.username !== 'Ticket Tool')
  if (pool.length < 12) return

  // Create initial set with staggered delays
  const initial: FloatingAvatar[] = []
  for (let i = 0; i < 12; i++) {
    const fa = randomFloat(pool)
    fa.delay = i * 0.7
    fa.duration = 5 + (i % 4) * 1.5
    initial.push(fa)
  }
  floatingAvatars.value = initial

  // Schedule each avatar to be replaced after its full cycle
  initial.forEach((fa, idx) => {
    scheduleReplace(idx, (fa.delay + fa.duration) * 1000, pool)
  })
}

function scheduleReplace(idx: number, afterMs: number, pool: DiscordMember[]) {
  const timer = setTimeout(() => {
    const newFa = randomFloat(pool)
    const duration = 5 + Math.random() * 4
    newFa.duration = duration
    floatingAvatars.value = floatingAvatars.value.map((f, i) => (i === idx ? newFa : f))
    scheduleReplace(idx, duration * 1000, pool)
  }, afterMs)
  floatTimers.push(timer)
}

onUnmounted(() => floatTimers.forEach(clearTimeout))

onMounted(async () => {
  try {
    const res = await fetch(
      'https://canary.discord.com/api/guilds/1219350221692211200/widget.json',
    )
    if (!res.ok) throw new Error('Failed to fetch')
    widget.value = await res.json()
    startFloatingAvatars()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="discord" ref="sectionRef" class="py-24 relative overflow-hidden">

    <!-- Floating ambient avatars -->
    <template v-if="widget && visible">
      <img
        v-for="fa in floatingAvatars"
        :key="fa.key"
        :src="fa.avatar_url"
        :alt="fa.username"
        class="absolute rounded-full pointer-events-none floating-avatar hidden sm:block"
        :style="{
          left: fa.left,
          top: fa.top,
          width: fa.size + 'px',
          height: fa.size + 'px',
          animationDuration: fa.duration + 's',
          animationDelay: fa.delay + 's',
        }"
      />
    </template>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
      <!-- Section header -->
      <div
        class="text-center mb-12"
        :class="visible ? 'card-animated' : 'opacity-0'"
        :style="{ '--delay': '0ms' }"
      >
        <span
          class="inline-block px-3 py-1 text-xs font-semibold rounded-full dark:bg-[#5865F2]/10 bg-indigo-100 dark:text-[#5865F2] text-indigo-700 dark:border dark:border-[#5865F2]/30 border border-indigo-200 mb-4"
        >
          {{ t('discord.badge') }}
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-gray-900 mb-4"
        >
          {{ t('discord.headline') }}
        </h2>
        <p class="max-w-2xl mx-auto dark:text-gray-400 text-gray-600 text-lg">
          {{ t('discord.subheadline') }}
        </p>
      </div>

      <!-- Widget card -->
      <div
        class="relative rounded-2xl dark:bg-[#16161f] bg-gray-50 dark:border border border-gray-200 dark:border-[#2a2a3a] overflow-hidden"
        :class="visible ? 'card-animated' : 'opacity-0'"
        :style="{ '--delay': '120ms' }"
      >
        <!-- Gradient top accent -->
        <div
          class="h-1 bg-gradient-to-r from-[#5865F2] via-[#bf5fff] to-[#00e5ff]"
        ></div>

        <!-- Loading state -->
        <div v-if="loading" class="flex items-center justify-center py-20">
          <div
            class="w-8 h-8 border-2 border-[#5865F2]/30 border-t-[#5865F2] rounded-full animate-spin"
          ></div>
        </div>

        <!-- Error state -->
        <div
          v-else-if="error"
          class="text-center py-16 px-6"
        >
          <p class="dark:text-gray-400 text-gray-600">
            {{ t('discord.error') }}
          </p>
          <a
            href="https://discord.gg/fachinformatik"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-xl bg-[#5865F2] text-white text-sm font-semibold hover:bg-[#4752c4] transition-colors duration-200"
          >
            {{ t('discord.join') }}
          </a>
        </div>

        <!-- Widget content -->
        <div v-else-if="widget" class="p-6 sm:p-8">
          <!-- Server header -->
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div class="flex items-center gap-4">
              <!-- Discord icon with orbiting avatars -->
              <div class="relative w-20 h-20 flex-shrink-0">
                <!-- Orbiting avatars -->
                <div class="absolute inset-0 avatar-orbit">
                  <img
                    v-for="(av, i) in ringAvatars"
                    :key="av.id"
                    :src="av.avatar_url"
                    :alt="av.username"
                    class="absolute w-6 h-6 rounded-full ring-2 dark:ring-[#16161f] ring-gray-50"
                    loading="lazy"
                    :style="{
                      left: `${50 + 42 * Math.cos((2 * Math.PI * i) / ringAvatars.length - Math.PI / 2)}%`,
                      top: `${50 + 42 * Math.sin((2 * Math.PI * i) / ringAvatars.length - Math.PI / 2)}%`,
                      marginLeft: '-0.75rem',
                      marginTop: '-0.75rem',
                    }"
                  />
                </div>
                <!-- Center Discord icon -->
                <div
                  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#5865F2] flex items-center justify-center shadow-lg shadow-[#5865F2]/30 z-10"
                >
                  <font-awesome-icon :icon="['fab', 'discord']" class="text-white text-xl" />
                </div>
              </div>
              <div>
                <h3
                  class="text-xl font-bold dark:text-white text-gray-900"
                >
                  {{ widget.name }}
                </h3>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span class="text-sm dark:text-gray-400 text-gray-600">
                    {{ t('discord.membersOnline', { count: animatedCount }) }}
                  </span>
                </div>
              </div>
            </div>

            <a
              :href="widget.instant_invite"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5865F2] text-white text-sm font-semibold hover:bg-[#4752c4] transition-all duration-200 hover:shadow-lg hover:shadow-[#5865F2]/25 group"
            >
              <font-awesome-icon :icon="['fab', 'discord']" class="transition-transform duration-200 group-hover:scale-110" />
              {{ t('discord.join') }}
            </a>
          </div>

          <!-- Members grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div
              v-for="(member, index) in displayMembers"
              :key="member.id"
              class="flex items-center gap-2.5 p-2.5 rounded-xl dark:bg-[#0d0d15] bg-white dark:border dark:border-[#1e1e2e] border border-gray-200 transition-all duration-200 dark:hover:border-[#5865F2]/40 hover:border-[#5865F2]/40"
              :class="visible ? 'card-animated' : 'opacity-0'"
              :style="{ '--delay': `${200 + index * 30}ms` }"
            >
              <!-- Avatar -->
              <div class="relative flex-shrink-0">
                <img
                  :src="member.avatar_url"
                  :alt="member.username"
                  class="w-8 h-8 rounded-full"
                  loading="lazy"
                />
                <span
                  :class="statusColor[member.status]"
                  class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 dark:border-[#0d0d15] border-white"
                ></span>
              </div>

              <!-- Info -->
              <div class="min-w-0 flex-1">
                <p
                  class="text-sm font-medium dark:text-gray-200 text-gray-800 truncate"
                >
                  {{ member.username }}
                </p>
                <p
                  v-if="member.game"
                  class="text-[11px] dark:text-[#bf5fff] text-purple-600 truncate"
                >
                  <font-awesome-icon :icon="['fas', 'gamepad']" class="mr-1" />
                  {{ member.game.name }}
                </p>
              </div>
            </div>

            <!-- Remaining members indicator -->
            <div
              v-if="remainingCount > 0"
              class="flex items-center justify-center p-2.5 rounded-xl dark:bg-[#0d0d15] bg-white dark:border dark:border-[#1e1e2e] border border-gray-200"
              :class="visible ? 'card-animated' : 'opacity-0'"
              :style="{ '--delay': `${200 + displayMembers.length * 30}ms` }"
            >
              <span class="text-sm dark:text-gray-400 text-gray-600 font-medium">
                +{{ remainingCount }} {{ t('discord.more') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.avatar-orbit {
  animation: orbitSpin 30s linear infinite;
}

/* Counter-rotate each avatar so they stay upright */
.avatar-orbit img {
  animation: orbitSpin 30s linear infinite reverse;
}

/* Floating ambient avatars */
@keyframes floatFade {
  0%   { opacity: 0;   transform: translateY(0)     scale(0.7); }
  15%  { opacity: 0.3; transform: translateY(-8px)  scale(1);   }
  50%  { opacity: 0.2; transform: translateY(-20px) scale(0.95); }
  85%  { opacity: 0.3; transform: translateY(-8px)  scale(1);   }
  100% { opacity: 0;   transform: translateY(0)     scale(0.7); }
}

.floating-avatar {
  animation: floatFade 5s ease-in-out infinite both;
  filter: blur(0.5px);
}
</style>
