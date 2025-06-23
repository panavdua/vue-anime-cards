import { setActivePinia, createPinia } from 'pinia'
import { useAnimeStore } from '@/stores/AnimeStore'
import { vi, describe, it, beforeEach, expect } from 'vitest'

vi.mock('@/api/apiService', () => ({
  fetchAnime: vi.fn()
}))

import { fetchAnime } from '@/api/apiService'

describe('AnimeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockResponse = {
    content: {
      id: 3,
      title: 'Black Clover',
      userName: 'Pawan Kumar',
      thumbNailImage: 'https://example.com/thumb.jpg',
      mainImage: 'https://example.com/main.jpg',
      subTitle: 'Sample subtitle',
      text: '<html><p>Sample text</p></html>',
      logo: 'https://example.com/logo.jpg'
    }
  }

  it('loads anime correctly from API', async () => {
    fetchAnime.mockResolvedValue(mockResponse)

    const store = useAnimeStore()
    await store.loadAnime()

    expect(fetchAnime).toHaveBeenCalledOnce()
    expect(store.anime).toEqual(mockResponse)
    expect(store.error).toBe(null)
    expect(store.loading).toBe(false)
  })

  it('sets error if API call fails', async () => {
    fetchAnime.mockRejectedValue(new Error('Network error'))

    const store = useAnimeStore()
    await store.loadAnime()

    expect(store.anime).toBe(null)
    expect(store.error).toBe('Network error')
    expect(store.loading).toBe(false)
  })

  it('toggles loading correctly during async fetch', async () => {
    let resolveFetch
    fetchAnime.mockImplementation(() => new Promise(resolve => { resolveFetch = resolve }))

    const store = useAnimeStore()
    const promise = store.loadAnime()

    expect(store.loading).toBe(true)

    resolveFetch(mockResponse)
    await promise

    expect(store.loading).toBe(false)
    expect(store.anime).toEqual(mockResponse)
  })
})
