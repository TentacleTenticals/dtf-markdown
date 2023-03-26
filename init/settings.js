function setSettings(main, mainCfg){
  new Field({
    path: main,
    groupName: 'attachments',
    cName: 'grid',
    legend: 'Поиск вложений в комментариях',
    info: 'Искать вложения, или же нет. Обсервер делает поиск в каждом новом комментарии',
    rtn: [],
    inputs: {a:{cfg:mainCfg}, c:{g:'comments.search'},
      list:[
      {
        type: 'checkbox',
        label: 'Обсервер',
        name: 'obs'
      },
      {
        type: 'checkbox',
        label: 'Поиск при загрузке страницы',
        name: 'onLoad'
      }]
    }
  });

  new Field({
    path: main,
    groupName: 'attachments',
    cName: 'grid',
    legend: 'Вложения комментариев',
    info: 'Что именно показывать из вложений скрипта',
    inputs: {c:{g:'comments.show'}, a:{cfg:mainCfg},
      list:[
        {
          type: 'checkbox',
          label: 'Ссылки',
          name: 'links'
        },
        {
          type: 'checkbox',
          label: 'Смайлы',
          name: 'emojis'
        },
        {
          type: 'checkbox',
          label: 'Анимированные смайлы',
          name: 'emojiGifs'
        },
        {
          type: 'checkbox',
          label: 'Стикеры',
          name: 'stickers'
        },
        {
          type: 'checkbox',
          label: 'Анимированные стикеры',
          name: 'stickerGifs'
        },
        {
          type: 'checkbox',
          label: 'Гифки',
          name: 'gifs'
        },
        {
          type: 'checkbox',
          label: 'Альбомы',
          name: 'albums'
        },
        {
          type: 'checkbox',
          label: 'Спойлеры',
          name: 'spoilers'
        },
        {
          type: 'checkbox',
          label: '<b>',
          name: '<b>'
        },
        {
          type: 'checkbox',
          label: '<i>',
          name: '<i>'
        },
        {
          type: 'checkbox',
          label: '<s>',
          name: '<s>'
        },
        {
          type: 'checkbox',
          label: 'Youtube',
          name: 'Youtube',
          c: {g:'comments.show.embeds'}
        },
        {
          type: 'checkbox',
          label: 'Spotify',
          name: 'Spotify',
          c: {g:'comments.show.embeds'}
        },
        {
          type: 'checkbox',
          label: 'Yandex',
          name: 'Yandex',
          c: {g:'comments.show.embeds'}
        }
      ]}
    });

    new Field({
      path: main,
      groupName: 'attachments',
      cName: 'grid',
      legend: 'Вложения в комментариях (настройка)',
      info: 'Автовоспроизведение',
      rtn: [],
      inputs: {c:{g:'autoplay'}, a:{cfg:mainCfg},
        list:[
          {
            type: 'checkbox',
            label: 'GIF смайлы',
            name: 'emojiGif'
          },
          {
            type: 'checkbox',
            label: 'GIF стикеры',
            name: 'stickerGif'
          },
          {
            type: 'checkbox',
            label: 'GIF',
            name: 'gif'
          },
          {
            type: 'checkbox',
            label: 'Видео',
            name: 'video'
          }
        ]}
    });

    new Field({
      path: main,
      groupName: 'attachments',
      cName: 'grid',
      legend: 'Вложения в комментариях (настройка)',
      info: 'Предзагрузка',
      rtn: [],
      select: {c:{g:'preload'}, a:{cfg:mainCfg},
        list:[
          {
            label: 'GIF смайлы',
            name: 'emojiGif',
            options: ['none', 'metadata', 'auto']
          },
          {
            label: 'GIF стикеры',
            name: 'stickerGif',
            options: ['none', 'metadata', 'auto']
          },
          {
            label: 'GIF',
            name: 'gif',
            options: ['none', 'metadata', 'auto']
          },
          {
            label: 'Видео',
            name: 'video',
            options: ['none', 'metadata', 'auto']
          }
        ]}
    });

  new Field({
    path: main,
    groupName: 'attachments',
    cName: 'grid',
    legend: 'Вложения в комментариях (настройка)',
    info: 'Внешний вид вложений',
    rtn: [],
    inputs: {c:{g:'size', n:'px'}, a:{cfg:mainCfg},
      list:[
      {
        type: 'number',
        label: 'Смайлы',
        name: 'emoji'
      },
      {
        type: 'number',
        label: 'Анимированные смайлы',
        name: 'emoji gif'
      },
      {
        type: 'number',
        label: 'Стикеры',
        name: 'sticker'
      },
      {
        type: 'number',
        label: 'Анимированные стикеры',
        name: 'stickerGif'
      },
      {
        type: 'checkbox',
        label: 'Показывать плашку GIF',
        name: 'show gif ico',
        c: {g:'gif'}
      },
      {
        type: 'number',
        label: 'Гифки',
        name: 'gif'
      },
      {
        type: 'number',
        label: 'Изображения',
        name: 'image'
      },
      {
        type: 'number',
        label: 'Видео',
        name: 'video'
      },
      {
        type: 'number',
        label: 'Youtube',
        name: 'Youtube',
        c:{g:'size.embeds', n:'px'}
      },
      {
        type: 'number',
        label: 'Spotify',
        name: 'Spotify',
        c:{g:'size.embeds', n:'px'}
      },
      {
        type: 'number',
        label: 'Yandex',
        name: 'Yandex',
        c:{g:'size.embeds', n:'px'}
      },
    ]}
  });

  new Field({
    path: main,
    groupName: 'attachments',
    cName: 'grid',
    legend: 'Спойлеры (закрытые)',
    info: 'Внешний вид закрытых спойлеров. Blur',
    rtn: [],
    inputs: {c:{g:'spoiler.closed.attachments.blur', n:'px'}, a:{cfg:mainCfg},
      list:[
        {
          type: 'number',
          label: 'Text',
          name: 'text'
        },
        {
          type: 'number',
          label: 'Link',
          name: 'link'
        },
        {
          type: 'number',
          label: 'Emoji',
          name: 'emoji'
        },
        {
          type: 'number',
          label: 'Sticker',
          name: 'sticker'
        },
        {
          type: 'number',
          label: 'Gif',
          name: 'gif'
        },
        {
          type: 'number',
          label: 'Image',
          name: 'image'
        },
        {
          type: 'number',
          label: 'Video',
          name: 'video'
        },
        {
          type: 'number',
          label: 'Album',
          name: 'album'
        },
        {
          type: 'number',
          label: 'Youtube',
          name: 'Youtube',
          c:{g:'spoiler.closed.attachments.blur.embeds', n:'px'}
        },
        {
          type: 'number',
          label: 'Spotify',
          name: 'Spotify',
          c:{g:'spoiler.closed.attachments.blur.embeds', n:'px'}
        },
        {
          type: 'number',
          label: 'Yandex',
          name: 'Yandex',
          c:{g:'spoiler.closed.attachments.blur.embeds', n:'px'}
        },
        {
          type: 'color',
          label: 'Цвет спойлера',
          name: 'text',
          c:{g:'spoiler.closed.background'}
        }
      ]}
  });
  new Field({
    path: main,
    groupName: 'attachments',
    cName: 'grid',
    legend: 'Спойлеры (открытые)',
    info: 'Внешний вид открытых спойлеров',
    rtn: [],
    inputs: {a:{cfg:mainCfg},
      list:[
        {
          type: 'color',
          label: 'Цвет спойлера',
          name: 'text',
          c:{g:'spoiler.opened.background'}
        }
      ]}
  });

  new Field({
    path: main,
    groupName: 'album',
    cName: 'grid',
    legend: 'Альбомы в комментариях (итемы)',
    rtn: [],
    inputs: {c:{g:'items'}, a:{cfg:mainCfg},
      list:[
        {
          type: 'number',
          label: 'Кол-во итемов в колонке',
          name: 'in column'
        },
        {
          type: 'number',
          label: 'Размер итемов',
          name: 'size',
          c:{g:'items', n:'px'}
        },
        {
          type: 'number',
          label: 'Отступ итемов',
          name: 'padding',
          c:{g:'items', n:'px'}
        }
      ]}
  });

  new Field({
    path: main,
    groupName: 'album',
    cName: 'grid',
    legend: 'Альбомы в комментариях (альбомный лист)',
    rtn: [],
    inputs: {c:{g:'list'}, a:{cfg:mainCfg},
      list:[
      {
        type: 'number',
        label: 'Высота альбомного листа',
        name: 'height',
        c:{g:'list', n:'px'}
      },
      {
        type: 'color',
        label: 'Фон альбомного листа',
        name: 'background'
      }
    ]}
  });

  new Field({
    path: main,
    groupName: 'markdown panel',
    cName: 'grid',
    legend: 'Кнопки панели Markdown',
    rtn: [],
    inputs: {c:{g:'buttons'}, a:{cfg:mainCfg},
      list:[
      {
        type: 'checkbox',
        label: 'Спойлер',
        name: 'spoiler'
      },
      {
        type: 'checkbox',
        label: '<b>',
        name: '<b>'
      },
      {
        type: 'checkbox',
        label: '<i>',
        name: '<i>'
      },
      {
        type: 'checkbox',
        label: '<s>',
        name: '<s>'
      },
      {
        type: 'checkbox',
        label: 'Билдер альбомов',
        name: 'album'
      },
      {
        type: 'checkbox',
        label: 'Смайл пикер',
        name: 'emoji'
      },
      {
        type: 'checkbox',
        label: 'Предпросмотр комментария',
        name: 'comment preview'
      },
      {
        type: 'checkbox',
        label: 'Гиф пикер слот 1',
        name: 'a',
        c: {g:'buttons.gif.slots'}
      },
      {
        type: 'checkbox',
        label: 'Гиф пикер слот 2',
        name: 'b',
        c: {g:'buttons.gif.slots'}
      },
      {
        type: 'checkbox',
        label: 'Гиф пикер слот 3',
        name: 'c',
        c: {g:'buttons.gif.slots'}
      }
    ]}
  });

  new Field({
    path: main,
    groupName: 'markdown panel',
    cName: 'grid',
    legend: 'Панель Markdown (gif поиск)',
    info: 'Дефолтные режимы GIF кнопок Markdown панели',
    rtn: [],
    select: {c:{g:'buttons.gif.modes'}, a:{cfg:mainCfg},
      list:[
      {
        label: 'A',
        name: 'a',
        options: ['Default', 'Tenor', 'Gfycat']
      },
      {
        label: 'B',
        name: 'b',
        options: ['Default', 'Tenor', 'Gfycat']
      },
      {
        label: 'C',
        name: 'c',
        options: ['Default', 'Tenor', 'Gfycat']
      }
    ]}
  });

  new Field({
    path: main,
    groupName: 'emoji picker',
    cName: 'grid',
    legend: 'Emoji Picker',
    select: {c:true, a:{cfg:mainCfg},
      list:[
      {
        label: 'Default mode',
        name: 'default mode',
        options: ['Emoji', 'Sticker', 'Image', 'Url']
      }
    ]},
    inputs: {c:true, a:{cfg:mainCfg},
      list:[
        {
          type: 'checkbox',
          label: 'Закрыть при выборе',
          name: 'close after pick'
        }
      ]
    }
  });

  new Field({
    path: main,
    groupName: 'emoji picker',
    cName: 'grid',
    legend: 'Emoji Picker (группы смайлов)',
    info: 'Какие группы смайлов/стикеров показывать в меню',
    inputs: {c:{g:'groups to show'}, a:{cfg:mainCfg},
      list: (() => {
        let groups = [];
        for(let g in emojisDB){
          groups.push({
            type: 'checkbox',
            label: [g],
            name: g
          })
        }
        return groups;
      })()
    }
  });

  new Field({
    path: main,
    groupName: 'gif picker',
    cName: 'grid',
    legend: 'Gif Picker',
    select: {c:true, a:{cfg:mainCfg},
      list:[
      {
        label: 'Дефолтный режим',
        name: 'default mode',
        optgroups: [
          {
            label: 'GIFs',
            option: 'gif'
          },
          {
            label: 'Images',
            option: 'image'
          },
          {
            label: 'Emojis',
            options: ['emoji', 'emoji GIF']
          },
          {
            label: 'Stickers',
            options: ['sticker', 'sticker GIF']
          },
          {
            label: 'URLs',
            options: ['GIF link', 'Video link', 'Image link']
          }
        ]
      }
    ]},
    inputs: {c:true, a:{cfg:mainCfg},
      list:[
        {
          type: 'checkbox',
          label: 'Закрыть при выборе',
          name: 'close after pick'
        }
      ]
    }
  });

  new Field({
    path: main,
    groupName: 'gif picker',
    cName: 'grid',
    legend: 'GIF Picker (группы гифок)',
    inputs: {c:{g:'groups to show'}, a:{cfg:mainCfg},
      list: (() => {
        let groups = [];
        for(let g in gifsDB){
          groups.push({
            type: 'checkbox',
            label: [g],
            name: g
          })
        }
        return groups;
      })()
    }
  });

  new Field({
    path: main,
    groupName: 'album builder',
    // cName: 'grid',
    legend: 'Album Builder',
    inputs: {c:true, a:{cfg:mainCfg},
      list: [
        {
          type: 'checkbox',
          label: 'Закрыть после сборки альбома',
          name: 'close after pick'
        },
        {
          type: 'checkbox',
          label: 'Разрешить загрузку изображений',
          name: 'allow items upload'
        }
      ]
    }
  });

  new Field({
    path: main,
    groupName: 'gif picker',
    // cName: 'grid',
    legend: 'Токены (Gfycat)',
    inputs: {c:{g:'tokens.Gfycat'}, a:{cfg:mainCfg},
      list: [
        {
          type: 'password',
          label: 'Client ID',
          name: 'clientID'
        },
        {
          type: 'password',
          label: 'client secret',
          name: 'clientSecret'
        }
      ]
    }
  });

  new Field({
    path: main,
    groupName: 'gif picker',
    // cName: 'grid',
    legend: 'Токены (Tenor)',
    inputs: {c:{g:'tokens.Tenor'}, a:{cfg:mainCfg},
      list: [
        {
          type: 'password',
          label: 'Client secret',
          name: 'clientSecret'
        }
      ]
    }
  });

  new Field({
    path: main,
    groupName: 'album builder',
    // cName: 'grid',
    legend: 'Токены (ImgBB)',
    inputs: {c:{g:'tokens.ImgBB'}, a:{cfg:mainCfg},
      list: [
        {
          type: 'password',
          label: 'Client token',
          name: 'clientToken'
        }
      ]
    }
  });
}
