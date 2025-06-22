import { mount } from '@vue/test-utils'
import AnimeInfo from '@/components/AnimeInfo.vue'
import { describe, it, expect } from 'vitest'

const mockAnime = {
  title: 'My Hero Academia',
  subTitle: 'Plus Ultra',
  logo: 'https://example.com/logo.jpg'
}

describe('AnimeInfo.vue', () => {
  it('renders title, subtitle, and logo', () => {
    const wrapper = mount(AnimeInfo, {
      props: { anime: mockAnime }
    })

    expect(wrapper.text()).toContain('My Hero Academia')
    expect(wrapper.text()).toContain('Plus Ultra')
    expect(wrapper.find('img').attributes('src')).toBe(mockAnime.logo)
  })

  it('emits refresh event on button click', async () => {
    const wrapper = mount(AnimeInfo, {
      props: { anime: mockAnime }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('refresh')
  })
})
