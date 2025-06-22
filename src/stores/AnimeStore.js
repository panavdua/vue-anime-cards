import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchAnime } from '@/api/apiService';

export const useAnimeStore = defineStore('anime', () => {
  const anime = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const loadAnime = async () => {
    loading.value = true;
    error.value = null;
    try {
      anime.value = await fetchAnime();
    } catch (err) {
      error.value = 'Failed to load anime';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return { anime, loading, error, loadAnime };
});
