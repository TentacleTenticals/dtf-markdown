function getToken(tokens){
if(tokens.token) return;
return fetch('https://api.gfycat.com/v1/oauth/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({
      client_id: tokens.catID,
      client_secret: tokens.catSecret,
      grant_type: "client_credentials"})
}).then(res => {
  return res.json();
}).catch(err => console.log(err));
}

function searchCat(token, search){
  return fetch(`https://api.gfycat.com/v1/gfycats/search?search_text=${search}&count=20`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`
    }
  }).then(res => res.json())
}
function checkCat(token, search){
  return fetch(`https://api.gfycat.com/v1/gfycats/${search}`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`
    }
  }).then(res => res.json())
}

// getToken().then(res => {
//   checkCat(res.access_token, 'craftygrotesquedanishswedishfarmdog').then(res => console.log('GIF', res))
// })

function searchTenor(search, tokens){
  return fetch(`https://tenor.googleapis.com/v2/search?q=${search}&key=${tokens.tenorSecret}&client_key=my_test_app&limit=20`, {
    method: 'GET'
  }).then(res => res.json());
}

class GifSearch{
  constructor(mode, path, tokens){
    console.log('Tok', tokens);
    if(document.getElementById('dtf-gifSearcher')) return;
    class GifItem{
      constructor(path, item){
        this.mask=new Div({
          path: path,
          cName: 'mask',
          tab: '-1',
          rtn: [],
          onmouseenter: () => {
            this.mask.focus();
          },
          onfocus: (e) => {
            this.previewType=this.mask.closest('.gifSearcher').children[1].children[2];
            this.preview=this.mask.closest('.gifSearcher').children[2].children[0];
            if(mode === 'Gfycat'){
              if(this.previewType.value.match(/^gif$|^stickerGif$|^emojiGif$|^gifUrl$/)){
                this.preview.src=item.miniUrl;
                this.preview.poster=item.posterUrl;
              }else{
                this.preview.src='';
                this.preview.poster=item.posterUrl;
              }
            }
            if(mode === 'Tenor'){
              console.log('Preview', this.previewType)
              if(this.previewType.value.match(/^gif$|^stickerGif$|^emojiGif$|^gifUrl$/)){
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
            document.querySelector(
              `.content_editable`
            ).textContent += (() => {
              if(mode === 'Gfycat'){
                console.log('Picked', item)
                switch(this.mask.closest('.gifSearcher').children[1].children[2].value){
                  case 'gif': return `:g:${urlCoder.decoder(item.miniUrl)}:g:`;
                  case 'image': `:i:${urlCoder.decoder(item.posterUrl)}:i:`;
                  case 'emoji': return `:e:${urlCoder.decoder(item.posterUrl)}:e:`;
                  case 'sticker': return `:s:${urlCoder.decoder(item.posterUrl)}:s:`;
                  case 'emoji Gif': return `:eg:${urlCoder.decoder(item.miniUrl)}:eg:`;
                  case 'sticker Gif': return `:sg:${urlCoder.decoder(item.miniUrl)}:sg:`;
                  case 'gif Url': return item.gifUrl;
                  case 'image Url': return item.posterUrl;
                  case 'video Url': return item.miniUrl;
                }
              }else
              if(mode === 'Tenor'){
                console.log('URL', item.media_formats.tinywebm.url)
                switch(this.mask.closest('.gifSearcher').children[1].children[2].value){
                  case 'gif': return `:g:${urlCoder.decoder(item.media_formats.tinywebm.url)}:g:`;
                  case 'image': `:i:${urlCoder.decoder(item.media_formats.gifpreview.url)}:i:`;
                  case 'emoji': return `:e:${urlCoder.decoder(item.media_formats.gifpreview.url)}:e:`;
                  case 'sticker': return `:s:${urlCoder.decoder(item.media_formats.gifpreview.url)}:s:`;
                  case 'emoji Gif': return `:eg:${urlCoder.decoder(item.media_formats.tinywebm.url)}:eg:`;
                  case 'sticker Gif': return `:sg:${urlCoder.decoder(item.media_formats.tinywebm.url)}:sg:`;
                  case 'gif Url': return item.media_formats.gif.url;
                  case 'image Url': return item.media_formats.gifpreview.url;
                  case 'video Url': return item.media_formats.tinywebm.url;
                }
              }
            })()
          }
        });

        this.img=new Image({
          path: this.mask,
          url: mode === 'Gfycat' ? item.miniPosterUrl : item.media_formats.gifpreview.url
        });
      }
    }

    class GifGroup {
      constructor({path, groupName}){
        if(document.getElementById(`gifGroup-${groupName}`)) return document.getElementById(`gifGroup-${groupName}`).children[1];
        this.main=new Div({
          path: path,
          cName: 'gifGroup',
          id: `gifGroup-${groupName}`,
          rtn: []
        });

        this.groupName=new Div({
          path: this.main,
          cName: 'groupHeader',
          text: groupName,
          onclick: () => {
            this.main.classList.toggle('hidden');
          }
        });

        this.list=new Div({
          path: this.main,
          cName: 'gifList',
          rtn: []
        });

        return this.list;
        
      }
    };
    class Gif{
      constructor({path, item, name}){
        this.mask=new Div({
          path: path,
          cName: 'mask',
          rtn: [],
          tab: '-1',
          onmouseenter: () => {
            this.mask.focus();
          },
          onfocus: (e) => {
            this.previewType=this.mask.closest('.gifSearcher').children[1].children[2];
            this.preview=this.mask.closest('.gifSearcher').children[2].children[0];
            // console.log(this.searchType)
            if(this.previewType.value.match(/^(gif|sticker Gif|emoji Gif|gif Url|video Url)$/)){
              this.preview.src=`https://thumbs.gfycat.com/${item.gifId}-mobile.mp4`;
              this.preview.poster=`https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`;
            }else{
              this.preview.src='';
              this.preview.poster=`https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`;
            }
          },
          onclick: () => {
            console.log(item);
            document.querySelector(
              `.content_editable`
            ).textContent += (() => {
                switch(this.mask.closest('.gifSearcher').children[1].children[2].value){
                  case 'gif': return `:g:${item.id}:g:`;
                  case 'image': `:i:${item.id}:i:`;
                  case 'emoji': return `:e:${item.id}:e:`;
                  case 'sticker': return `:s:${item.id}:s:`;
                  case 'emoji Gif': return `:eg:${item.id}:eg:`;
                  case 'sticker Gif': return `:sg:${item.id}:sg:`;
                  case 'gif Url': return `https://thumbs.gfycat.com/${item.gifId}-size_restricted.gif`;
                  case 'image Url': return `https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`;
                  case 'video Url': return `https://thumbs.gfycat.com/${item.gifId}-mobile.mp4`;
                };
            })();
          },
        });

        this.gif=new Video({
          path: this.mask,
          cName: 'gif',
          name: item.name,
          src: `https://thumbs.gfycat.com/${item.gifId}-mobile.mp4`,
          poster: `https://thumbs.gfycat.com/${item.gifId}-mobile.jpg`,
          pIp: true,
          muted: true
        });
      }
    };

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
      autocomplete: 'off',
      rtn: [],
      onkeydown: (e) => {
        if(!e.code.match('Enter')) return;
        if(e.target.value.length === 0) return;
        if(this.list.children.length > 0) this.list.replaceChildren();
        this.video.src='';
        this.video.poster='';
        if(mode === 'Gfycat'){
          getToken(tokens).then(res => {
            console.log(res)
            if(res) searchCat(res.access_token, e.target.value).then(s => {
              s.gfycats.forEach(e => {
                new GifItem(this.list, e, mode);
              })
            }).catch(err => console.log(err))
          }).catch(err => console.log(err))
        }else
        if(mode === 'Tenor'){
          searchTenor(e.target.value, tokens).then(s => {
            s.results.forEach(e => {
              new GifItem(this.list, e, mode);
            })
          }).catch(err => console.log(err))
        }
      }
    })

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

          for(let g in gifs){
            this.group=new GifGroup({
              path: this.list,
              groupName: g
            });
            for(let item in gifs[g]){
              new Gif({
                item: gifs[g][item],
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
      value: 'gif',
      onchange: (e) => {
        this.video.className=e.target.value;
      },
      body: (path, Optgroup) => {
        this.gifs=new Optgroup({
          path: path,
          label: 'GIFs',
          option: 'gif'
        });

        this.gifs=new Optgroup({
          path: path,
          label: 'Images',
          option: 'image'
        });

        this.gifs=new Optgroup({
          path: path,
          label: 'Emojis',
          options: ['emoji', 'emoji Gif']
        });

        this.gifs=new Optgroup({
          path: path,
          label: 'Stickers',
          options: ['sticker', 'sticker Gif']
        });

        this.gifs=new Optgroup({
          path: path,
          label: 'URLs',
          options: ['gif Url', 'image Url', 'video Url']
        });
      }
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
      pIp: true,
      rtn: []
    });

    this.list=new Div({
      path: this.main,
      cName: 'list',
      rtn: true,
      func: (list) => {
        if(mode === 'Default'){
          list.className='list default';
          for(let g in gifs){
            this.group=new GifGroup({
              path: list,
              groupName: g
            });
            for(let item in gifs[g]){
              new Gif({
                item: gifs[g][item],
                path: this.group
              });
            }
          }
        }
      }
    });
  }
};
