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
        '<s>': true
      }
    },
    'size': {
      'emoji': 30,
      'emoji gif': 30,
      'sticker': 120,
      'stickerGif': 120,
      'gif': 150,
      'image': 150
    },
    'gif': {
      'show gif ico': true,
      'autoplay': false,
      'mute': true,
      'pIp': false
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
    'tokens': {
      'Imgur': {},
      'ImgBB': {}
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
  'album items upload sites': {
    'Imgur': false,
    'ImgBB': [{token: 'test'}]
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
          'b': 'Gfycat',
          'c': 'Tenor'
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
      'Tenor': {}
    }
  },
  'scriptInfo': {
    scriptName: 'DTF markdown',
    scriptId: 'dtf-markdown',
    storeName: 'DTF-markdown',
    storeDesc: 'Скрипт для расширения возможностей, десу!'
  }
}
