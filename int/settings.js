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
      }
    ]}
  });

  new Field({
    path: main,
    groupName: 'attachments',
    cName: 'grid',
    legend: 'Спойлеры (закрытые)',
    info: 'Внешний вид закрытых спойлеров',
    rtn: [],
    inputs: {c:{g:'spoiler.closed.attachments.blur'}, a:{cfg:mainCfg},
      list:[
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
          label: 'Youtube',
          name: 'Youtube',
          c:{g:'spoiler.closed.attachments.blur.embeds'}
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
          name: 'size'
        },
        {
          type: 'number',
          label: 'Отступ итемов',
          name: 'padding'
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
        label: '(px) Высота альбомного листа',
        name: 'height'
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
    ]}
  });

  new Field({
    path: main,
    groupName: 'emoji picker',
    cName: 'grid',
    legend: 'Emoji Picker (группы смайлов)',
    inputs: {c:{g:'groups to show'}, a:{cfg:mainCfg},
      list: (() => {
        let groups = [];
        for(let g in emojisDB){
          groups.push({
            type: 'checkbox',
            label: [g],
            name: g,
            // checked: mainCfg['emoji picker']['groups to show'][g]
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
            options: ['gif URL', 'image URL', 'video URL']
          }
        ],
        // get value(){
        //   return mainCfg['gif picker'][this.name]
        // }
      }
    ]}
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
            name: g,
            // checked: mainCfg['gif picker']['groups to show'][g]
          })
        }
        return groups;
      })()
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
          name: 'clientID',
          // get c(){
          //   return {g:'tokens.Gfycat'};
          // },
          // get value(){
          //   return getter(mainCfg['gif picker'], this.c.g, this.name);
          // }
        },
        {
          type: 'password',
          label: 'client secret',
          name: 'clientSecret',
          // get c(){
          //   return {g:'tokens.Gfycat'};
          // },
          // get value(){
          //   return getter(mainCfg['gif picker'], this.c.g, this.name);
          // }
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
          name: 'clientSecret',
          // get c(){
          //   return {g:'tokens.Tenor'};
          // },
          // get value(){
          //   return getter(mainCfg['gif picker'], this.c.g, this.name);
          // }
        }
      ]
    }
  });
}
