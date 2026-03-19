<script setup lang="ts">
import { ref, onMounted } from 'vue'

const year = new Date().getFullYear()
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

    <!-- Animated grid background -->
    <div class="absolute inset-0 grid-bg opacity-60 pointer-events-none"></div>

    <!-- Animated background orbs -->
    <div class="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#bf5fff]/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
    <div class="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:1.5s]"></div>

    <!-- Floating particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <span v-for="i in 16" :key="i"
        class="absolute w-1 h-1 rounded-full"
        :class="i % 3 === 0 ? 'bg-[#00e5ff]/50' : 'bg-[#bf5fff]/50'"
        :style="{
          left: `${(i * 17 + 5) % 95}%`,
          top: `${(i * 23 + 10) % 85}%`,
          animation: `floatParticle ${4 + (i % 4)}s ease-in-out ${i * 0.35}s infinite alternate`,
        }"
      ></span>
    </div>

    <!-- Main content -->
    <div class="relative z-10 text-center max-w-xl w-full">

      <!-- 404 glitch number -->
      <Transition name="zoom-in">
        <div v-if="visible" class="relative mb-2 select-none glitch-container">
          <!-- Base gradient text -->
          <p class="text-[9rem] sm:text-[13rem] font-black leading-none text-center animated-gradient-text">
            404
          </p>
          <!-- Glitch slice overlays (aria-hidden, purely visual) -->
          <p aria-hidden="true" class="text-[9rem] sm:text-[13rem] font-black leading-none text-center absolute inset-0 glitch-slice-top">
            404
          </p>
          <p aria-hidden="true" class="text-[9rem] sm:text-[13rem] font-black leading-none text-center absolute inset-0 glitch-slice-bottom">
            404
          </p>
        </div>
      </Transition>

      <!-- Error message -->
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

      <!-- Buttons -->
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
            <!-- Discord icon -->
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.014.043.031.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Hilfe auf Discord
          </a>
        </div>
      </Transition>

    </div>

    <!-- Footer -->
    <footer class="absolute bottom-0 left-0 right-0 py-5 text-center text-xs text-gray-700">
      © {{ year }} Fachinformatiker Wiki
    </footer>

  </div>
</template>

<style>
/* ── Entrance transitions ────────────────────────────────────── */
.zoom-in-enter-active { transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.zoom-in-enter-from   { opacity: 0; transform: scale(0.75); }

.fade-up-enter-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-up-enter-from   { opacity: 0; transform: translateY(20px); }

/* ── Particle float ──────────────────────────────────────────── */
@keyframes floatParticle {
  from { transform: translateY(0)    scale(1);   opacity: 0.25; }
  to   { transform: translateY(-36px) scale(2);  opacity: 0.8;  }
}

/* ── Animated gradient pan (single source of truth) ─────────── */
/* Animating --grad-pos on the container means all three children */
/* inherit the exact same value every frame — perfect sync.       */
@property --grad-pos {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

@keyframes gradientPan {
  0%   { --grad-pos: 0%; }
  50%  { --grad-pos: 100%; }
  100% { --grad-pos: 0%; }
}

.glitch-container {
  animation: gradientPan 12s ease infinite;
}

/* Shared gradient style for all three 404 layers */
.animated-gradient-text,
.glitch-slice-top,
.glitch-slice-bottom {
  background: linear-gradient(90deg, #bf5fff, #00e5ff, #ff2d78, #bf5fff);
  background-size: 300% 300%;
  background-position: var(--grad-pos) 50%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Glitch slice overlays ───────────────────────────────────── */
.glitch-slice-top {
  clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
  animation: glitchTop 2.2s steps(1) infinite;
}

.glitch-slice-bottom {
  clip-path: polygon(0 68%, 100% 68%, 100% 100%, 0 100%);
  animation: glitchBottom 2.2s steps(1) infinite;
}

@keyframes glitchTop {
  /* mostly steady */
  0%,  65%, 100% { transform: translate(0);             opacity: 1;    }
  /* burst 1 */
  67%            { transform: translate(-10px,  0);      opacity: 1;    }
  69%            { transform: translate(  8px,  0);      opacity: 0.85; }
  71%            { transform: translate( -5px,  0);      opacity: 1;    }
  73%            { transform: translate(  3px,  0);      opacity: 1;    }
  75%            { transform: translate(0);               opacity: 1;    }
  /* burst 2 */
  87%            { transform: translate( 14px,  0);      opacity: 0.8;  }
  89%            { transform: translate(-14px,  0);      opacity: 1;    }
  91%            { transform: translate(  4px,  0);      opacity: 1;    }
  93%            { transform: translate(0);               opacity: 1;    }
}

@keyframes glitchBottom {
  /* offset slightly from top so both never fire in sync */
  0%,  55%, 100% { transform: translate(0);             opacity: 1;    }
  /* burst 1 */
  57%            { transform: translate( 12px,  0);      opacity: 0.85; }
  59%            { transform: translate( -8px,  0);      opacity: 1;    }
  61%            { transform: translate(  5px,  0);      opacity: 1;    }
  63%            { transform: translate(0);               opacity: 1;    }
  /* burst 2 */
  80%            { transform: translate(-16px,  0);      opacity: 0.8;  }
  82%            { transform: translate( 16px,  0);      opacity: 1;    }
  84%            { transform: translate( -4px,  0);      opacity: 1;    }
  86%            { transform: translate(0);               opacity: 1;    }
}


</style>

