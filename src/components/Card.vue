<script setup>
import { defineProps, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import AnimeInfo from '@/components/AnimeInfo.vue';

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
      <RouterLink :to="`/details/${anime.id}`" >
          <img :src="anime.thumbNailImage" alt="Anime" class="w-full h-80 object-cover rounded-t-lg" />
      </RouterLink>
      
      <AnimeInfo :anime="anime" @refresh="$emit('refresh')" />
    </div>
  </div>

  <!-- <div class="bg-white rounded-xl shadow p-4 " >
    
    
    
  </div> -->
</template>

