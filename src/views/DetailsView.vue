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

</script>

<template>
    <Details :anime="store.anime.content" @refresh="refresh" />
</template>