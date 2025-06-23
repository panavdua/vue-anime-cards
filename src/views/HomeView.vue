<script setup>
import { onMounted } from 'vue';
import Card from '@/components/Card.vue';
import { useRouter } from 'vue-router';
import { useAnimeStore } from '@/stores/AnimeStore.js'
import Header from '@/components/Header.vue'

const router = useRouter();
const store = useAnimeStore();

onMounted(() => {
  if (!store.anime) {
    store.loadAnime();
  }
});

console.log(store.anime)
</script>

<template>
  <Header/>  


  <div class="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 flex justify-center">
    <div class="w-full max-w-xl">
      <!-- Card with margin from top -->
      <div >

          <div v-if="store.loading && !store.anime" class="flex justify-center my-8">
            <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        

        <!-- Show card when anime is ready -->
        <Card
          v-if="store.anime"
          :anime="store.anime.content"
          @refresh="store.loadAnime"
        />

        <!-- Error after card or if it fails -->
        <p v-if="store.error" class="mt-4 text-center font-medium text-red-500">
          Failed to load anime 
        </p>
      </div>
    </div>
  </div>
  
</template>