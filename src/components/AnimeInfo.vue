<script setup>
import { defineProps, defineEmits } from 'vue';

const defaultLogo = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
const handleImgError = (e) => {
  e.target.src = defaultLogo
}

defineProps({
  anime: {
    type: Object,
    required: true
  }
});

defineEmits(['refresh']);
</script>

<template>
  <div class="px-4 py-2"> <!-- ✅ NEW wrapper with padding -->
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <img
        :src="anime.logo || defaultLogo"
        @error="handleImgError"
        alt="Logo"
        class="w-10 h-10 rounded-xl object-cover"
      />

      <!-- Title and Subtitle -->
      <div class="flex-1 px-4">
        <h2 class="text-base font-semibold leading-tight">{{ anime.title || 'No title available'}}</h2>
        <p class="text-sm text-gray-500 truncate">{{ anime.subTitle || 'No subtitle available'}}</p>
      </div>

      <!-- Refresh Button -->
      <div class="flex flex-col items-center justify-center">
        <button
          type="button"
          @click="$emit('refresh')"
          class="text-blue-500 cursor-pointer font-bold border-blue-500 px-3 py-1 rounded-full text-sm bg-gray-200 transition"
        >
          REFRESH
        </button>
        <span class="text-[10px] text-gray-400 mt-1">In-App Purchases</span>
      </div>
    </div>
  </div>
</template>
