import monumentOne from '@/assets/monument_one.png'
import monumentTwo from '@/assets/monument_two.png'
import monumentThree from '@/assets/monument_three.png'
import monumentFour from '@/assets/monument_four.png'

export interface GalleryDataItem {
  id: string
  title: string
  subtitle: string
  description: string
  imageSrc: string
  layoutType: 'left' | 'right' | 'center'
}

export const GALLERY_DATA: GalleryDataItem[] = [
  {
    id: 'monument-1',
    title: 'The Whispering Forest Monolith',
    subtitle: 'Exhibition 01 / Concrete & Mist',
    description:
      'A monument engineered to interact with morning atmospheric mist, standing as a brutalist anchor amidst organic forest growth. Designed as a study in permanence vs. change.',
    imageSrc: monumentOne,
    layoutType: 'left',
  },
  {
    id: 'monument-2',
    title: 'Echoes of Light and Water',
    subtitle: 'Exhibition 02 / Glass Refraction',
    description:
      'An abstract glass sculpture suspended above a pool of deep-toned water. The sculpture refracts light in silent patterns, capturing the delicate flow of memory over time.',
    imageSrc: monumentTwo,
    layoutType: 'right',
  },
  {
    id: 'monument-3',
    title: 'Stardust Obelisk',
    subtitle: 'Exhibition 03 / Cosmic Alignment',
    description:
      'Constructed from dark slate basalt, this obelisk stands in a dry desert basin. At night, it aligns perfectly with polar star trails, serving as a beacon of cosmic scale.',
    imageSrc: monumentThree,
    layoutType: 'center',
  },
  {
    id: 'monument-4',
    title: 'The Coastal Sentry',
    subtitle: 'Exhibition 04 / Brutalism on Shore',
    description:
      'Carved directly from basalt rocks along a stormy coast, this pavilion provides a shelter to sit and listen to the ocean. The concrete surfaces age with sea salt erosion.',
    imageSrc: monumentFour,
    layoutType: 'left',
  },
]