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
  <!-- <div class="p-4">
    <Card
      v-if="store.anime"
      :anime="store.anime.content"
      @refresh="store.loadAnime"
    />
    <p v-if="store.loading" class="mt-4 text-center text-gray-500">Loading...</p>
    <p v-if="store.error" class="mt-4 text-center text-red-500">{{ store.error }}</p>
  </div> -->

  <div class="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 flex justify-center">
    <div class="w-full max-w-xl">
      <!-- Card with margin from top -->
      <div >
        <Card
          v-if="store.anime"
          :anime="store.anime.content"
          @refresh="store.loadAnime"
        />
        <p v-if="store.loading" class="mt-1 text-center text-gray-500">Loading...</p>
        <p v-if="store.error" class="mt-4 text-center text-red-500">{{ store.error }}</p>
      </div>
    </div>
  </div>
  
</template>