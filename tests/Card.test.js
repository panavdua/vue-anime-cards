import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Card from '@/components/Card.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/details/:id', name: 'Details' }]
})

const mockAnime = {
  id: 42,
  thumbNailImage: 'https://example.com/image.jpg',
  title: 'Demon Slayer',
  subTitle: 'Fight till the end',
  logo: 'https://example.com/logo.jpg'
}

describe('Card.vue', () => {

   beforeEach(() => {
    // ✅ Setup pinia for test
    setActivePinia(createPinia())
  })

  it('renders image and passes anime to AnimeInfo', async () => {
    const wrapper = mount(Card, {
      props: { anime: mockAnime },
      global: { plugins: [router] }
    })

    expect(wrapper.find('img').attributes('src')).toBe(mockAnime.thumbNailImage)
    expect(wrapper.text()).toContain(mockAnime.title)
    expect(wrapper.text()).toContain(mockAnime.subTitle)
  })

  it('emits refresh when child emits refresh', async () => {
    const wrapper = mount(Card, {
      props: { anime: mockAnime },
      global: { plugins: [router] }
    })

    await wrapper.findComponent({ name: 'AnimeInfo' }).vm.$emit('refresh')
    expect(wrapper.emitted()).toHaveProperty('refresh')
  })
})
