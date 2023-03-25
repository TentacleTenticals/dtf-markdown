class GifSearch{
  Selection(){
    if(!window.getSelection().focusNode) return;
    if(!window.getSelection().focusNode.isContentEditable && !window.getSelection().focusNode.parentNode.isContentEditable) return console.log('Wrong element', window.getSelection().focusNode);
    this.sel = {
      s: window.getSelection().focusNode.textContent.substring(0, window.getSelection().anchorOffset),
      t: window.getSelection().focusNode.textContent.substring(window.getSelection().anchorOffset, window.getSelection().focusOffset),
      e: window.getSelection().focusNode.textContent.substring(window.getSelection().focusOffset, window.getSelection().focusNode.textContent.length),
      target: window.getSelection().focusNode,
      offset: window.getSelection().anchorOffset
    }
  }
  Modify(s){
    this.Selection();
    if(!this.sel) return;

    if(this.sel.target.textContent.length === this.sel.offset){
      this.sel.target.textContent = `${this.sel.target.textContent}${s}`;
    }else{
      this.sel.target.textContent = `${this.sel.s}${s}${this.sel.t}${this.sel.e}`;
    }
    if(mainCfg['gif picker']['close after pick']) this.main.remove();
  }
  getToken(tokens){
    return fetch('https://api.gfycat.com/v1/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          client_id: tokens.clientID,
          client_secret: tokens.clientSecret,
          grant_type: "client_credentials"})
    }).then(res => {
      return res.json();
    }).catch(err => console.log(err));
  }
  searchCat(token, search){
    return fetch(`https://api.gfycat.com/v1/gfycats/search?search_text=${search}&count=20`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    }).then(res => res.json())
  }
  checkCat(token, search){
    return fetch(`https://api.gfycat.com/v1/gfycats/${search}`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    }).then(res => res.json())
  }
  searchTenor(tokens, search){
  return fetch(`https://tenor.googleapis.com/v2/search?q=${search}&key=${tokens.clientSecret}&client_key=my_test_app&limit=20`, {
    method: 'GET'
  }).then(res => res.json());
}
  Gif({path, item, name}){
    let mask=new Div({
      path: path,
      cName: 'mask',
      name: name,
      rtn: [],
      tab: '-1',
      onmouseenter: () => {
        mask.focus();
      },
      onfocus: (e) => {
        this.previewType=mask.closest('.gifSearcher').children[1].children[2];
        this.preview=mask.closest('.gifSearcher').children[2].children[0];
        // console.log(this.searchType)
        if(this.previewType.value.match(/^(gif|sticker GIF|emoji GIF|video|gif URL|video URL)$/)){
          this.preview.src=`https://thumbs.gfycat.com/${item.gifId}-mobile.mp4`;
          this.preview.poster=`https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`;
        }else{
          this.preview.src='';
          this.preview.poster=`https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`;
        }
      },
      onclick: () => {
        console.log(item);
        let res = (() => {
          switch(this.previewType.value){
          case 'gif': return `:g:${item.group}.${item.name}:g:`;
          case 'image': return `:i:${item.group}.${item.name}:i:`;
          case 'emoji': return `:e:${item.group}.${item.name}:e:`;
          case 'sticker': return `:s:${item.group}.${item.name}:s:`;
          case 'emoji GIF': return `:eg:${item.group}.${item.name}:eg:`;
          case 'sticker GIF': return `:sg:${item.group}.${item.name}:sg:`;
          case 'video': return `:v:https://thumbs.gfycat.com/${item.gifId}-mobile.mp4:v:`;
          case 'gif URL': return `https://thumbs.gfycat.com/${item.gifId}-size_restricted.gif`;
          case 'image URL': return `https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`;
          case 'video URL': return `https://thumbs.gfycat.com/${item.gifId}-mobile.mp4`;
        };
        })();
        this.Modify(res);
      }
    });

    new Video({
      path: mask,
      cName: 'gif',
      name: item.name,
      src: `https://thumbs.gfycat.com/${item.gifId}-mobile.mp4`,
      poster: `https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`,
      muted: true
    });
  };
  GifItem(path, item, mode){
    let mask=new Div({
      path: path,
      cName: 'mask',
      tab: '-1',
      rtn: [],
      onmouseenter: () => {
        mask.focus();
      },
      onfocus: (e) => {
        this.previewType=mask.closest('.gifSearcher').children[1].children[2];
        this.preview=mask.closest('.gifSearcher').children[2].children[0];
        if(mode === 'Gfycat'){
          if(this.previewType.value.match(/^(gif|sticker GIF|emoji GIF|video|gif URL|video URL)$/)){
            this.preview.src=item.miniUrl;
            this.preview.poster=item.posterUrl;
          }else{
            this.preview.src='';
            this.preview.poster=item.posterUrl;
          }
        }else
        if(mode === 'Tenor'){
          console.log('Preview', this.previewType);
          if(this.previewType.value.match(/^(gif|sticker GIF|emoji GIF|video|gif URL|video URL)$/)){
            this.preview.src=item.media_formats.tinywebm.url;
            this.preview.poster=item.media_formats.miniPosterUrl;
          }else{
            this.preview.src='';
            this.preview.poster=item.media_formats.gifpreview.url;
          }
        }
      },
      onclick: () => {
        console.log(item);
        let res = (() => {
          if(mode === 'Gfycat'){
            console.log('Picked', item)
            switch(mask.closest('.gifSearcher').children[1].children[2].value){
              case 'gif': return `:g:${urlCoder.decoder(item.miniUrl)}:g:`;
              case 'image': return `:i:${urlCoder.decoder(item.posterUrl)}:i:`;
              case 'emoji': return `:e:${urlCoder.decoder(item.posterUrl)}:e:`;
              case 'sticker': return `:s:${urlCoder.decoder(item.posterUrl)}:s:`;
              case 'emoji GIF': return `:eg:${urlCoder.decoder(item.miniUrl)}:eg:`;
              case 'sticker GIF': return `:sg:${urlCoder.decoder(item.miniUrl)}:sg:`;
              case 'video': return `:v:${urlCoder.decoder(item.miniUrl)}:v:`;
              case 'gif URL': return item.gifUrl;
              case 'image URL': return item.posterUrl;
              case 'video URL': return item.miniUrl;
            }
          }else
          if(mode === 'Tenor'){
            console.log('URL', item.media_formats.tinywebm.url)
            switch(mask.closest('.gifSearcher').children[1].children[2].value){
              case 'gif': return `:g:${urlCoder.decoder(item.media_formats.tinywebm.url)}:g:`;
              case 'image': return `:i:${urlCoder.decoder(item.media_formats.gifpreview.url)}:i:`;
              case 'emoji': return `:e:${urlCoder.decoder(item.media_formats.gifpreview.url)}:e:`;
              case 'sticker': return `:s:${urlCoder.decoder(item.media_formats.gifpreview.url)}:s:`;
              case 'emoji GIF': return `:eg:${urlCoder.decoder(item.media_formats.tinywebm.url)}:eg:`;
              case 'sticker GIF': return `:sg:${urlCoder.decoder(item.media_formats.tinywebm.url)}:sg:`;
              case 'video': return `:v:${urlCoder.decoder(item.media_formats.tinywebm.url)}:v:`;
              case 'gif URL': return item.media_formats.gif.url;
              case 'image URL': return item.media_formats.gifpreview.url;
              case 'video URL': return item.media_formats.tinywebm.url;
            }
          }
          return
        })();
        this.Modify(res);
      }
    });

    new Image({
      path: mask,
      url: (() => {
        if(mode === 'Gfycat') return item.miniPosterUrl;
        else
        if(mode === 'Tenor') return item.media_formats.gifpreview.url;
      })()
    });
  }
  GifGroup({path, groupName}){
      if(document.getElementById(`gifGroup-${groupName}`)) return document.getElementById(`gifGroup-${groupName}`).children[1];
      let main=new Div({
        path: path,
        cName: 'gifGroup',
        id: `gifGroup-${groupName}`,
        rtn: []
      });

      this.groupName=new Div({
        path: main,
        cName: 'groupHeader',
        text: groupName,
        onclick: () => {
          main.classList.toggle('hidden');
        }
      });

      let list=new Div({
        path: main,
        cName: 'gifList',
        rtn: []
      });

      return list;
  };
  constructor(mode, path){
    if(document.getElementById('dtf-gifSearcher')) return;
    this.Selection();
    // this.selection = selection;
    // console.log('GIF', this.Inject())

    this.main=new Div({
      path: path,
      cName: 'dtf-window gifSearcher',
      id: 'dtf-gifSearcher',
      rtn: []
    });

    this.header=new Div({
      path: this.main,
      cName: 'header',
      rtn: [],
      onclick: () => {
        this.main.remove();
      }
    });

    this.headerLabel=new Div({
      path: this.header,
      cName: 'label',
      text: 'GIF SEARCHER'
    });

    this.mainForm=new Form({
      path: this.main,
      name: 'mainForm',
      cName: 'mainForm',
      rtn: []
    });

    this.search=new Input({
      path: this.mainForm,
      cName: 'search',
      name: 'search',
      type: 'text',
      placeholder: 'Введите поисковый запрос',
      autocomplete: 'off',
      rtn: [],
      onkeydown: (e) => {
        if(!e.code.match('Enter')) return;
        if(e.target.value.length === 0) return;
        if(mode !== 'Default'){
          if(this.list.children.length > 0) this.list.replaceChildren();
          this.video.src='';
          this.video.poster='';
        }
        if(mode === 'Gfycat'){
          if(!mainCfg['gif picker']['tokens']['Gfycat']['clientID']){
            console.log(`[Gif Searcher] ID Gfycat не указан!`);
            return;
          }
          this.getToken(mainCfg['gif picker']['tokens']['Gfycat']).then(res => {
            console.log(res)
            if(res) this.searchCat(res.access_token, e.target.value).then(s => {
              s.gfycats.forEach(e => {
                this.GifItem(this.list, e, mode);
              })
            }).catch(err => console.log(err))
          }).catch(err => console.log(err))
        }else
        if(mode === 'Tenor'){
          if(!mainCfg['gif picker']['tokens']['Tenor']['clientSecret']){
            console.log(`[Gif Searcher] Токен Tenor не указан!`);
            return;
          }
          this.searchTenor(mainCfg['gif picker']['tokens']['Tenor'], e.target.value).then(s => {
            s.results.forEach(e => {
              this.GifItem(this.list, e, mode);
            })
          }).catch(err => console.log(err))
        }
      }
    });
    if(mode === 'Default') $(this.search).autocomplete({
      delay: 500,
      source: (() => {
        let arr = [];
        for(let g in gifsDB){
          // console.log(g);
          for(let e in gifsDB[g]){
            arr.push(e);
          }
        }
        console.log(arr)
        return arr;
      })(),
      select: (e, ui) => {
        setTimeout(() => {
          if(!e.target.value) return;
          if(this.main.querySelector(`.mask[name=${e.target.value}]`)) this.main.querySelector(`.mask[name=${e.target.value}]`).focus();
        }, 100)
        // console.log(e.val())
        // console.log(ui)
      }
    });

    this.searchType=new Select({
      path: this.mainForm,
      // container: true,
      name: 'searchType',
      value: mode,
      rtn: [],
      options: ['Default', 'Tenor', 'Gfycat'],
      onchange: (e) => {
        mode = e.target.value;
        this.list.replaceChildren();
        this.video.src='';
        this.video.poster='';
        if(e.target.value === 'Default'){
          this.list.className='list default';

          for(let g in gifsDB){
            if(!mainCfg['gif picker']['groups to show'][g]) continue;
            this.group=new GifGroup({
              path: this.list,
              groupName: g
            });
            for(let item in gifsDB[g]){
              this.Gif({
                item: gifsDB[g][item],
                path: this.group
              });
            }
          }
        }else{
          this.list.className='list';
        }
      }
    });

    this.previewType=new Select({
      path: this.mainForm,
      name: 'gifMode',
      value: mainCfg['gif picker']['default mode'],
      rtn: [],
      onchange: (e) => {
        this.video.className=e.target.value;
      },
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
          options: ['emoji', 'emojiGif']
        },
        {
          label: 'Stickers',
          options: ['sticker', 'stickerGif']
        },
        {
          label: 'Embeds',
          option: 'embed'
        },
        {
          label: 'Videos',
          option: 'video'
        },
        {
          label: 'Links',
          option: 'link'
        },
        {
          label: 'Urls',
          option: 'url'
        }
      ]
    });

    this.preview=new Div({
      path: this.main,
      cName: 'preview',
      rtn: [],
      onclick: () => {
        if(!this.video.paused) this.video.pause();
        else this.video.play();
      }
    });

    this.video=new Video({
      path: this.preview,
      cName: 'gif',
      autoplay: true,
      loop: true,
      mute: true,
      rtn: []
    });

    this.list=new Div({
      path: this.main,
      cName: 'list',
      rtn: true,
      func: (list) => {
        if(mode === 'Default'){
          list.className='list default';
          for(let g in gifsDB){
            if(!mainCfg['gif picker']['groups to show'][g]) continue;
            this.group=this.GifGroup({
              path: list,
              groupName: g
            });
            for(let item in gifsDB[g]){
              this.Gif({
                path: this.group,
                item: gifsDB[g][item],
                name: item
              });
            }
          }
        }
      }
    });
  }
};
