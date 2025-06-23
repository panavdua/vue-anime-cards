<script setup>
import { defineProps, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import AnimeInfo from '@/components/AnimeInfo.vue';
import { useAnimeStore } from '@/stores/AnimeStore'

const store = useAnimeStore();
const handleImgError = (e) => {
  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
}

defineProps({
    anime: {
        type: Object,
        required: true,
    }
})

defineEmits(['refresh'])
</script>

<template>

  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all">
      <RouterLink :to="`/details/${anime.id}`" @click="store.markAsNavigated"> <!-- only users who click on image can enter details page-->
          <img :src="anime.thumbNailImage" @error="handleImgError" loading="lazy" alt="Anime" 
            class="w-full h-80 object-cover rounded-t-lg" />
      </RouterLink>
      
      <AnimeInfo :anime="anime" @refresh="$emit('refresh')" />
    </div>
  </div>

</template>

