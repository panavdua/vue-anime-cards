<script setup>
import { useAnimeStore } from '@/stores/AnimeStore.js'
import { useRouter, useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import Details from '@/components/Details.vue'


const store = useAnimeStore();
const router = useRouter();
const route = useRoute();

const refresh = async () => {
  await store.loadAnime();
  router.replace(`/details/${store.anime.content.id}`);
};

// const routeId = computed(() => route.params.id);
// const anime = computed(() => store.anime?.content);

// onMounted(() => {
//   console.log(anime, 'anime in detailsview')
//   console.log(routeId, 'routeId in detailsview')
//   if (!anime || String(anime.id) !== String(routeId.value)) {
//     router.replace('/');
//   }
// });
</script>

<template>
    <Details :anime="store.anime.content" @refresh="refresh" />
</template>