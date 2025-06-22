import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useAnimeStore } from '@/stores/AnimeStore'

describe('Header.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    // Mock store with test user
    const store = useAnimeStore()
    store.anime = {
      content: {
        userName: 'Panav'
      }
    }
  })

  it('renders the username from store', () => {
    const wrapper = mount(Header)
    expect(wrapper.text()).toContain('Panav')
  })

  it('renders the formatted date', () => {
    const wrapper = mount(Header)
    const today = new Date()
    const options = { weekday: 'long', day: 'numeric', month: 'long' }
    const expectedDate = today.toLocaleDateString('en-GB', options).toUpperCase()
    expect(wrapper.text()).toContain(expectedDate)
  })
})
