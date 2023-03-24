let defaultSettings = {
  'attachments': {
    'comments': {
      'search': {
        'obs': true,
        'onLoad': true
      },
      'show': {
        'emojis': true,
        'emojiGifs': true,
        'stickers': true,
        'stickerGifs': true,
        'gifs': true,
        'images': true,
        'albums': true,
        'spoilers': true,
        '<b>': true,
        '<i>': true,
        '<s>': true,
        'embeds': {
          'Youtube': true,
          'Spotify': true,
          'Yandex': true
        }
      }
    },
    'size': {
      'emoji': 30,
      'emoji gif': 30,
      'sticker': 120,
      'stickerGif': 120,
      'gif': 150,
      'image': 150,
      'embeds': {
        'Youtube': 300,
        'Spotify': 360,
        'Yandex': 300
      }
    },
    'gif': {
      'show gif ico': true,
      'autoplay': false,
      'mute': true,
      'pIp': false
    },
    'spoiler': {
      'closed': {
        'attachments': {
          'blur': {
            'emoji': 10,
            'sticker': 10,
            'image': 10,
            'gif': 10,
            'embeds': {
              'Youtube': 5,
              'Spotify': 10,
              'Yandex': 10
            }
          },
        },
        'background': {
          'text': '#000000'
        }
      },
      'opened': {
        'attachments': {},
        'background': {
          'text': '#c2e1f9'
        }
      }
    }
  },
  'album': {
    'album': {
      'background': '#000000',
      'margin': '',
      'padding': ''
    },
    'list': {
      'height': 217,
      'background': '#000000',
    },
    'items': {
      'in column': 3,
      'size': 100,
      'padding': 3
    },
    'previewer': {
      'zoom power': 0.25
    },

    'album underborder color': '#6ed1e7',
    // 'preview zoom power': 0.25,
  },
  'album builder': {
    'allow items upload': true,
    'close after pick': true,
    'tokens': {
      'Imgur': {},
      'ImgBB': {
        'clientSecret': ''
      }
    }
  },
  'spoiler settings': {
    'closed spoiler color': '#000000',
    'closed spoiler color opacity': 80,
    'opened spoiler color': '#acd0ec',
    'opened spoiler color opacity': 10,
    'hover spoiler color': '#acd0ec',
    'hover spoiler color opacity': 100,
    'content blur': 6,
    'content blur on hover': 6,
    'turn off content blur on hover': true,
    'show spoiler on hover': false
  },
  'markdown panel': {
    'buttons': {
      'spoiler': true,
      '<b>': true,
      '<i>': true,
      '<s>': true,
      'album': true,
      'emoji': true,
      'lk': true,
      'comment preview': true,
      'gif': {
        'slots': {
          'a': true,
          'b': true,
          'c': false
        },
        'modes': {
          'a': 'Default',
          'b': 'Tenor',
          'c': 'Gfycat'
        }
      }
    }
  },
  'emoji picker': {
    'default mode': 'Emoji',
    'close after pick': true,
    'groups to show': (() => {
      let groups = {};
      for(let g in emojisDB){
        groups[g] = true;
      }
      return groups;
    })()
  },
  'gif picker': {
    'default mode': 'gif',
    'close after pick': true,
    'groups to show': (() => {
      let groups = {};
      for(let g in gifsDB){
        groups[g] = true;
      }
      return groups;
    })(),
    'tokens': {
      'Gfycat': {
        'clientID': '',
        'clientSecret': ''
      },
      'Tenor': {
        'clientSecret': ''
      }
    }
  },
  'link converter': {
    'default mode': 'url',
    'close after pick': true
  },
  'scriptInfo': {
    scriptName: 'DTF markdown',
    scriptId: 'dtf-markdown',
    storeName: 'DTF-markdown',
    storeDesc: 'Скрипт для расширения возможностей, десу!'
  }
}
