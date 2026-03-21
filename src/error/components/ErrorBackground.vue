<template>
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
</template>

<style>
@keyframes floatParticle {
  from { transform: translateY(0)     scale(1); opacity: 0.25; }
  to   { transform: translateY(-36px) scale(2); opacity: 0.8;  }
}
</style>
