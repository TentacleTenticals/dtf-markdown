let defaultSettings = {
  'what to show in messages': {
    'show emojis': true,
    'show spoilers': true,
    'show albums': true,
    'show <b>': true,
    'show <i>': true,
    'show <s>': true
  },
  'attachments': {
    'emoji': {
      'size': 30
    },
    'emoji gif': {
      'size': 30
    },
    'sticker': {
      'size': 120
    },
    'gif': {
      'size': 150
    },
    'image': {
      'size': 150
    }
  },
  'emoji groups to show': (() => {
    let groups = {};
    for(let g in emoji){
      groups[g] = true;
    }
    return groups;
  })(),
  'album settings': {
    'list': {
      'list height': 217,
      'list background color': '#ffffff',
    },
    'items': {
      'items in column': 3,
      'items size': 100,
      'items padding': 3
    },

    'album underborder color': '#6ed1e7',
    'preview zoom power': 0.25,
  },
  'album builder settings': {
    'allow album items upload': true
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
  'markdown panel settings': {
    'buttons': {
      'spoiler': true,
      '<b>': true,
      '<i>': true,
      '<s>': true,
      'album': true,
      'emoji': true,
      'gif slot 1': true,
      'gif slot 2': true,
      'lk': true,
    },
    'gif slot 1': 'Default',
    'gif slot 2': 'Gfycat'
  },
  'gif searches': {
    'Gfycat': {},
    'Tenor': {}
  },
  'gif groups to show': (() => {
    let groups = {};
    for(let g in gifs){
      groups[g] = true;
    }
    return groups;
  })(),
  'scriptInfo': {
    scriptName: 'DTF markdown',
    storeName: 'DTF-markdown',
    storeDesc: 'Скрипт для расширения возможностей, десу!'
  }
}
