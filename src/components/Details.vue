<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AnimeInfo from '@/components/AnimeInfo.vue';
import DOMPurify from 'dompurify';

defineEmits(['refresh']);

const props = defineProps({
  anime: {
    type: Object,
    required: true,
  },
});

const showToast = ref(false);

function injectImageAfterNthParagraph(html, imageTag, index = 2) {
  const parts = html.split('</p>');
  if (parts.length > index) {
    parts[index] += imageTag;
  }
  return parts.join('</p>');
}

const safeHtml = computed(() => {
  const rawHtml = props.anime.text || '';
  const imageTag = `<img src="${props.anime.mainImage}" class="w-full max-h-[350px] object-cover rounded shadow" />`;
  const injectedHtml = injectImageAfterNthParagraph(rawHtml, imageTag, 2);
  return DOMPurify.sanitize(injectedHtml);
});

const handleShare = () => {
  navigator.clipboard.writeText(`${props.anime.title} - ${props.anime.subTitle}`)
    .then(() => {
      showToast.value = true;
      setTimeout(() => showToast.value = false, 2000); // Auto-dismiss
    })
    .catch(() => {
      alert('Failed to copy'); // fallback if needed
    });
};

</script>

<template>
  <div class="p-4 relative">
    <!-- Back button -->
    <RouterLink to="/" class="fixed top-4 right-4 z-50 bg-gray-200 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow hover:bg-gray-300 transition">Χ</RouterLink>

    <!-- Main thumbnail image -->
    <img :src="anime.thumbNailImage" loading="lazy" class="w-full max-h-[350px] object-cover rounded shadow" />

    <!-- Title + subtitle + refresh -->
    <AnimeInfo :anime="anime" @refresh="$emit('refresh')" />

    <!-- Injected story with midway mainImage -->
    <div v-html="safeHtml" class="mt-4 prose max-h-[60vh] overflow-y-auto"></div>

    <!-- Vertical Anime Info Section with full gray background -->
    <div class="mt-6 bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center">
    <!-- Logo -->
        <img
            :src="anime.logo || 'https://via.placeholder.com/60'"
            alt="Anime Logo"
            class="w-16 h-16 rounded-xl object-cover mb-2"
        />

        <!-- Title & Subtitle -->
        <h2 class="text-lg font-semibold">{{ anime.title }}</h2>
        <p class="text-sm text-gray-500 mb-4">{{ anime.subTitle }}</p> <!-- Added spacing here -->

        <!-- Refresh Button -->
        <button
            @click="$emit('refresh')"
            class="cursor-pointer bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full"
        >
            REFRESH
        </button>

        <!-- In-App Text -->
        <span class="text-[10px] text-gray-400 mt-1">In-App Purchase</span>
    </div>


    <!-- Share button -->
    <button
        @click="handleShare"
        class="mt-6 cursor-pointer flex items-center gap-2 mx-auto text-blue-500 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
        >
        <!-- Inline Share Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span>Share Story</span>
    </button>

    <div
        v-if="showToast"
        class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity"
        >
        Story copied to clipboard!
    </div>

  </div>
</template>
