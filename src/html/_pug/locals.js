/**
 * Local Pug Data
 */

'use strict'

var locals = {}

locals.currentYear = (new Date()).getFullYear()

locals.baseTitle = 'Sarah Meftah'
locals.getTitle = function (subtitle) {
  if (subtitle) {
    return locals.baseTitle + ' - ' + subtitle
  }
  return locals.baseTitle
}

// Order defined is the same as nav order
locals.projects = {
  'cul_de_sac': {
    title: 'cul de sac',
    imageRootSrc: 'cul_de_sac',
    href: '/projects/cul_de_sac.html',
    images: [
      { src: 'image1.jpg' },
      { src: 'image2.jpg' },
      { src: 'image3.jpg' },
      { src: 'image4.jpg' },
      { src: 'image5.jpg' },
      { src: 'image6.jpg' },
      { src: 'image7.jpg' },
      { src: 'image8.jpg' },
      { src: 'image9.jpg' },
      { src: 'image10.jpg' },
      { src: 'image11.jpg' },
      { src: 'image12.jpg' },
      { src: 'image13.jpg' },
    ]
  },

  'staring_at_the_sunset': {
    title: 'Staring at the Sunset',
    imageRootSrc: 'staring_at_the_sunset',
    href: '/projects/staring_at_the_sunset.html',
    images: [
      { src: 'image1.jpg' },
      { src: 'image2.jpg' },
      { src: 'image3.jpg' },
      { src: 'image6.jpg' },
      { src: 'image7.jpg' },
      { src: 'image8.jpg' },
      { src: 'image9.jpg' },
      { src: 'image12.jpg' },
      { src: 'image13.jpg' },
      { src: 'image14.jpg' },
      { src: 'image15.jpg' },
      { src: 'image16.jpg' },
      { src: 'image18.jpg' },
      { src: 'image19.jpg' },
      { src: 'image20.jpg' },
      { src: 'image21.jpg' },
      { src: 'image22.jpg' },
      { src: 'image23.jpg' },
      { src: 'image24.jpg' },
      { src: 'image25.jpg' },
      { src: 'image26.jpg' },
      { src: 'image28.jpg' }
    ]
  },

  'air': {
    title: 'Air',
    imageRootSrc: 'air',
    href: '/projects/air.html',
    images: [
      { src: 'image1.jpg' },
      { src: 'image2.jpg' },
      { src: 'image3.jpg' },
      { src: 'image4.jpg' },
      { src: 'image5.jpg' },
      { src: 'image6.jpg' },
      { src: 'image7.jpg' },
      { src: 'image8.jpg' },
      { src: 'image9.jpg' },
      { src: 'image10.jpg' },
      { src: 'image11.jpg' }
    ]
  },

  'new_landscapes': {
    title: 'New Landscapes',
    imageRootSrc: 'new_landscapes',
    href: '/projects/new_landscapes.html',
    images: [
      { src: 'new_landscapes_1.jpg' },
      { src: 'new_landscapes_2.jpg' },
      { src: 'new_landscapes_3.jpg' },
      { src: 'new_landscapes_4.jpg' },
      { src: 'new_landscapes_5.jpg' },
      { src: 'new_landscapes_6.jpg' },
      { src: 'new_landscapes_7.jpg' },
      { src: 'new_landscapes_8.jpg' },
      { src: 'new_landscapes_9.jpg' }
    ]
  },

  '2013-2017': {
    title: '2013-2017',
    imageRootSrc: '2013-2017',
    href: '/projects/2013-2017.html',
    images: [
      { src: 'image_scroll.jpg' }
    ]
  }
}

locals.infos = [
  { title: 'Bio', href: '/info/bio.html' },
  { title: 'CV', href: '/info/cv.html' },
  { title: 'Contact', href: '/info/contact.html' }
]

locals.og = {
  image: 'http://sarahmeftah.com/img/link_preview.jpg',
  url: 'http://sarahmeftah.com'
}

locals.links = {
  homepage: {
    coverImage: '/projects/grim.html'
  }
}

module.exports = locals
