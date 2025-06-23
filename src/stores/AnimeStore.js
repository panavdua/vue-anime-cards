import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchAnime } from '@/api/apiService';

export const useAnimeStore = defineStore('anime', () => {
  const anime = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // To handle functionality for making sure user can only enter Details page through clicking on image in HomeView
  const navigatedFromClick = ref(false);
  const markAsNavigated = () => {
    navigatedFromClick.value = true;
  };
  const resetNavigationFlag = () => {
    navigatedFromClick.value = false;
  };

  const loadAnime = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetchAnime()
      if (!response?.content || typeof response.content !== 'object') {
        throw new Error('Invalid API response')
      }
      if (!response.content.title) {
        throw new Error('Invalid anime content')
      }
      anime.value = response
    } catch (err) {
      error.value = err.message || 'Failed to load anime'
      console.error('Store Error:', err)
    } finally {
      loading.value = false
    }
  }


  return { anime, loading, error, loadAnime, navigatedFromClick, markAsNavigated, resetNavigationFlag };
});
