const seoData = {
  titlePrefix: 'AwesomeSite.com - ',
  paths: {
    default: {
      'title': 'Home',
      'meta': {
        'description': { value: 'Home', type: 'name' },
        'google-site-verification': { value: '0d7dcd2b-6110-4a91-afea-c9754c4f772a', type: 'name' },
        'keywords': { value: 'dogs, running, Japanese', type: 'name' },
        'msvalidate.01': { value: '886d0992-f21d-4eb4-9eec-e278d01f782a', type: 'name' },
        'twitter:description': { value: 'About walking dogs, running, and learning Japanese', type: 'name' },
        'twitter:image': { value: 'https://www.example.com/logo.jpg', type: 'name' },
        'twitter:title': { value: 'This is an Awesome Site', type: 'name' },
        'twitter:url': { value: 'https://www.example.com', type: 'name' },
        'article:publisher': { value: 'John Doe LLC', type: 'property' },
        'fb:app_id': { value: 'dfe41b88-2307-43f0-9af6-15ff7b18f940', type: 'property' },
        'og:description': { value: 'About walking dogs, running, and learning Japanese', type: 'property' },
        'og:image': { value: 'https://www.example.com/logo.jpg', type: 'property' },
        'og:image:width': { value: '1024', type: 'property' },
        'og:image:height': { value: '512', type: 'property' },
        'og:site_name': { value: 'Awesome Site', type: 'property' },
        'og:title': { value: 'This is an Awesome Site', type: 'property' },
        'og:type': { value: 'website', type: 'property' },
        'og:url': { value: 'https://www.example.com', type: 'property' }
      }
    },
    '/todo/1': {
      'title': 'Todo 1',
      'meta': {
        'description': { value: 'This is my first todo', type: 'name' }
      }
    },
    '/todo/2': {
      'title': 'Todo 2',
      'meta': {
        'description': { value: 'This is my second todo', type: 'name' }
      }
    },
    '/todo/3': {
      'title': 'Todo 3',
      'meta': {
        'description': { value: 'This is my third todo', type: 'name' }
      }
    }
  }
}

module.exports = seoData