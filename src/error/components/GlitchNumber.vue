<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<template>
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
</template>

<style>
/* ── Animated gradient pan (single source of truth) ─────────── */
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
  0%,  65%, 100% { transform: translate(0);        opacity: 1;    }
  67%            { transform: translate(-10px, 0);  opacity: 1;    }
  69%            { transform: translate(  8px, 0);  opacity: 0.85; }
  71%            { transform: translate( -5px, 0);  opacity: 1;    }
  73%            { transform: translate(  3px, 0);  opacity: 1;    }
  75%            { transform: translate(0);          opacity: 1;    }
  87%            { transform: translate( 14px, 0);  opacity: 0.8;  }
  89%            { transform: translate(-14px, 0);  opacity: 1;    }
  91%            { transform: translate(  4px, 0);  opacity: 1;    }
  93%            { transform: translate(0);          opacity: 1;    }
}

@keyframes glitchBottom {
  0%,  55%, 100% { transform: translate(0);        opacity: 1;    }
  57%            { transform: translate( 12px, 0);  opacity: 0.85; }
  59%            { transform: translate( -8px, 0);  opacity: 1;    }
  61%            { transform: translate(  5px, 0);  opacity: 1;    }
  63%            { transform: translate(0);          opacity: 1;    }
  80%            { transform: translate(-16px, 0);  opacity: 0.8;  }
  82%            { transform: translate( 16px, 0);  opacity: 1;    }
  84%            { transform: translate( -4px, 0);  opacity: 1;    }
  86%            { transform: translate(0);          opacity: 1;    }
}
</style>
