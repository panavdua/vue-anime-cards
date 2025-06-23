
<script setup>
import { computed } from 'vue';
import { useAnimeStore } from '@/stores/AnimeStore.js'

const today = new Date();


const formattedDate = computed(() => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return today.toLocaleDateString('en-GB', options).toUpperCase(); 
});

const store = useAnimeStore();
const userName = computed(() => store.anime?.content?.userName || 'Guest');

</script>

<template>
  <div class="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
    <div>
      <p class="text-xs font-bold text-gray-500 uppercase">{{ formattedDate }}</p>
      <h1 class="text-2xl font-bold">Today</h1>
    </div>
    <div>
      <button class="w-30 h-8 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
        {{ userName }}
      </button>
    </div>
  </div>
</template>

