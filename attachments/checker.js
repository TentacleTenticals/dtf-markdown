function attachmentsChecker(t, path){
  class Attachment {
    P({path, text}){
      this.main = document.createElement('p');
      this.main.className = 'dtf-comment text';
      this.main.textContent = text;
      path.appendChild(this.main);
    }
    B({path, text}){
      this.main = document.createElement('b');
      this.main.className = 'dtf-attach bold';
      path.appendChild(this.main);
      text.match(filter.search) ? writer(text, this.main) : this.P({
        path: this.main,
        text: text
      })
    }
    I({path, text}){
      this.main = document.createElement('i');
      this.main.className = 'dtf-attach i';
      path.appendChild(this.main);
      text.match(filter.search) ? writer(text, this.main) : this.P({
        path: this.main,
        text: text
      })
    }
    S({path, text}){
      this.main = document.createElement('s');
      this.main.className = 'dtf-attach s';
      path.appendChild(this.main);
      text.match(filter.search) ? writer(text, this.main) : this.P({
        path: this.main,
        text: text
      })
    }
    A({path, url, text, name}){
      this.main = document.createElement('a');
      this.main.className = 'dtf-attach link';
      this.main.textContent = name ? name : (text.length > 25 ? `${text.slice(0, 25)}...` : text);
      this.main.href=url;
      this.main.target='_blank';
      path.appendChild(this.main);
    }
    Spoiler({path, text}){
      this.main=new Div({
        path: path,
        cName: 'dtf-attach spoiler',
        rtn: [],
        onclick: (e) => {
          if(e.target !== e.currentTarget) return;
          e.currentTarget.classList.toggle('opened');
        }
      });
      text.match(filter.search) ? writer(text, this.main) : this.P({
        path: this.main,
        text: text
      });
    }
    Emoji({path, url, type, title}){
      this.main=new Div({
        path: path,
        cName: `dtf-attach ${type}`,
        rtn: [],
        title: title
      });

      new Image({
        path: this.main,
        url: url
      });
    }
    Gif({path, url, type, title}){
      this.main=new Div({
        path: path,
        cName: `dtf-attach ${type}`,
        rtn: [],
        title: title,
        onclick: (e) => {
          if(this.main.lastChild.paused) this.main.lastChild.play();
          else this.main.lastChild.pause();
        }
      });

      if(type.match(/^(gif|stickerGif) (s|ns)$/)){
        this.starter=new Div({
          path: this.main,
          cName: 'mediaStarter',
          rtn: []
        });
        this.prev=new Div({
          path: this.starter,
          cName: 'btn',
          rtn: []
        });
        new Image({
          path: this.prev,
          url: 'https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg'
        });
      }
      new Video({
        path: this.main,
        cName: type,
        url: url,
        loop: true,
        preload: type.match(/^(gif|stickerGif) (s|ns)$/) && 'metadata',
        autoplay: type.match(/^(gif) (s|ns)$/) && mainCfg['attachments']['gif']['autoplay'] && true,
        onplay: (e) => {
          e.target.parentNode.classList.toggle('playing');
        },
        onpause: (e) => {
          e.target.parentNode.classList.toggle('playing');
        },
        onended: (e) => {
          e.target.parentNode.classList.toggle('playing');
        }
      });
    }
    Iframe({path, url, type, embed}){
      // if(!this.urlCheck(url)) return;
      // // alert('Yo')
      // // let filter = /https(?:s)*:\/\/.+(?:youtube\.com|youtu\.be).+\/([^?]+).*/gm;
      // const embed = this.urlCheck(url);
      console.log(embed)
      this.main=new Div({
        path: path,
        cName: `dtf-attach ${type} ${embed.site} ${embed.type}`,
        rtn: [],
        style: (() => {
          if(embed.site === 'yt' && embed.type === 'video') return `background-image:url(https://img.youtube.com/vi/${embed.id}/sddefault.jpg)`;
        })()
      });
      this.starter=new Div({
        path: this.main,
        cName: 'mediaStarter',
        rtn: [],
        onclick: () => {
          this.starter.remove();
          this.embed=document.createElement('iframe');
          this.embed.src=`${embed.url}`;
          this.embed.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
          // if(embed.site === 'spt'){
            this.embed.width='100%';
            this.embed.height='100%';
          // }
          this.main.appendChild(this.embed);
        }
      });
      this.prev=new Div({
        path: this.starter,
        cName: 'btn',
        rtn: []
      });
      new Image({
        path: this.prev,
        url: 'https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg'
      });
    }
    urlCheck({path, url, attType}){
      console.log('Q', url)
      const sites = ['youtube', 'youtu\.be', 'spotify\.com', 'music\.yandex'];
      let res;
      switch (url.match(new RegExp(`${sites.join('|')}`))?.[0]) {
        case 'youtube': {
          if(!mainCfg['attachments']['comments']['show']['embeds']['Youtube']) return;
          url.replace(/http(?:s):\/\/[^/?]+\/(watch\?v=|\?=list|playlist\?list=|embed\/videoseries\?list=|embed\/|[^]+)([^=&]*).*/gm, (d, type, id) => {
            if(type.match(/^(watch\?v=|embed\/)$/)){
              this.Iframe({path:path, type:attType, embed:{site:'yt', type:'video', id:id, url:`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`}});
            }else
            if(type.match(/^(\?=list|embed\/videoseries\?list=|playlist\?list=)$/)){
              this.Iframe({path:path, type:attType, embed:{site:'yt', type:'list', id:id, url:`https://www.youtube.com/embed/videoseries?list=${id}`}});
            }else{
              this.Iframe({path:path, type:attType, embed:{site:'yt', type:'video', id:type, url:`https://www.youtube.com/embed/${type}?modestbranding=1&rel=0`}});
            }
          })
          return res;
        }
        case 'youtu.be': {
          if(!mainCfg['attachments']['comments']['show']['embeds']['Youtube']) return;
          url.replace(/http(?:s):\/\/[^/?]+\/(watch\?v=|\?=list|playlist\?list=|embed\/videoseries\?list=|embed\/|[^]+)([^=&]*).*/gm, (d, type, id) => {
            if(type && !id){
              this.Iframe({path:path, type:attType, embed:{site:'yt', type:'video', id:type, url:`https://www.youtube.com/embed/${type}?modestbranding=1&rel=0`}});
            }
          })
          return res;
        }
        case 'spotify.com': {
          console.log('Spotify');
          if(!mainCfg['attachments']['comments']['show']['embeds']['Spotify']) return;
          url.replace(/http(?:s):\/\/[^/]+\/(track|playlist|artist|album)\/([^?]+).*/gm, (d, type, id) => {
            if(type.match(/track|playlist|artist|album/)){
              this.Iframe({path:path, type:attType, embed:{site:'spt', type:type, id:id, url:`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}});
            }
          })
          return res;
        }
        case 'music.yandex': {
          if(!mainCfg['attachments']['comments']['show']['embeds']['Yandex']) return;
          url.replace(/http(?:s):\/\/.+album\/([^/]+)(?:\/track\/)*(.*)/gm, (d, albumID, trackID) => {
            if(albumID && trackID){
              this.Iframe({path:path, type:attType, embed:{site:'yd', type:'track', url:`https://music.yandex.ru/iframe/#track/${trackID}/${albumID}`}});
            }else
            if(albumID && !trackID){
              this.Iframe({path:path, type:attType, embed:{site:'yd', type:'album', url:`https://music.yandex.ru/iframe/#album/${albumID}`}});
            }
          })
          return res;
        }
        default:
          console.log(`Эмбед не поддерживается.`);
      }
    }
  }
  let filter = {
    htm: '<(?:b|i|s|a)>',
    tag: '<(?:b|s)>|:(?:|g|i|s|e|sg|eg|album):|\\|\\|',
    text: '[^]+',
    sp: '\\|\\|',
    scrTag: ':(?:e|eg|s|sg|i|g|emb|alb):',
    get search() {
      return new RegExp(`(${this.htm}|${this.sp}|${this.scrTag})[^]+(\\1)`)
    },
    get spl() {
      return new RegExp(`(${this.sp}[^]+${this.sp}|${this.scrTag}[^]*?${this.scrTag}|${this.htm}[^]+${this.htm})`, 'gmi')
    },
    get tags() {
      return new RegExp(`(${this.sp}|${this.scrTag}|${this.htm})([^]+)(\\1)`, 'gmi')
    }
  };
  function writer(t, path, first){
    function splitter(text){
      return text.split(filter.spl).filter(e => !!e);
    }
    if(first){
      path.textContent = '';
      path.className = 'dtf-commentText';
      t = t.replace(/(http(?:s)*:\/\/[^ ]+)(?= )/gm, '<a>$1<a>');
    }
    const words = splitter(t);
    console.log('W', words);

    words.forEach(i => {
      if(i && !i.match(filter.search)){
        new Attachment().P({
          path: path,
          type: 'p',
          text: i
        });
        // console.log(`new P (${i})`);
      }else
      if (i.match(filter.search)) {
        // console.log(i)
        i.replace(filter.tags, (d, op, text, ed) => {
          console.log(`[${op}] [${text}] [${ed}]`);
          switch(op && ed){
            case '||' && '||':
              new Attachment().Spoiler({
                path: path,
                type: 'spoiler',
                text: text
              });
            break;
            case '<b>' && '<b>':
              new Attachment().B({
                path: path,
                type: 'b',
                text: text
              });
            break;
            case '<i>' && '<i>':
              new Attachment().I({
                path: path,
                type: 'spoiler',
                text: text
              });
            break;
            case '<s>' && '<s>':
              new Attachment().S({
                path: path,
                type: 's',
                text: text
              });
            break;
            case '<a>' && '<a>': {
                const enc = urlCoder.encoder(text);
                new Attachment().A({
                  path: path,
                  type: 'a',
                  url: enc,
                  text: enc
                });
              }
            break;
            // case ':a:' && ':a:': {
            //   const enc = urlCoder.encoder(text);
            //   if(text.match(/\\/)){
            //     const l = enc.split('\\');
            //     new Attachment().A({
            //       path: path,
            //       type: 'a',
            //       url: l[0],
            //       name: l[1]
            //     });
            //   }else
            //   new Attachment().A({
            //     path: path,
            //     type: 'a',
            //     url: enc,
            //     text: enc
            //   });
            // }
            // break;
            case ':e:' && ':e:':
              if(text.match(/\./)){
                let emj = text.split('.');
                if(!emojisDB[emj[0]][emj[1]]) return;
                new Attachment().Emoji({
                  path: path,
                  url: emojisDB[emj[0]][emj[1]].url,
                  title: `${emj[0]}:${emj[1]}`,
                  type: 'emoji s'
                });
              }else{
                new Attachment().Emoji({
                  path: path,
                  url: urlCoder.encoder(text),
                  type: 'emoji ns'
                });
              }
              break;
            case ':s:' && ':s:':
              if(text.match(/\./)){
                let emj = text.split('.');
                if(!emojisDB[emj[0]][emj[1]]) return;
                new Attachment().Emoji({
                  path: path,
                  url: emojisDB[emj[0]][emj[1]].url,
                  title:`${emj[0]}:${emj[1]}`,
                  type: 'sticker s'
                });
              }else{
                new Attachment().Emoji({
                  path: path,
                  url: urlCoder.encoder(text),
                  type: 'sticker ns'
                });
              }
            break;
            case ':sg:' && ':sg:':
              if(text.match(/\./)){
                let emj = text.split('.');
                if(!emojisDB[emj[0]][emj[1]]) return;
                new Attachment().Gif({
                  path: path,
                  url:`https://thumbs.gfycat.com/${gifsDB[emj[0]][emj[1]].gifId}-mobile.mp4`,
                  title: `${emj[0]}:${emj[1]}`,
                  type: 'stickerGif s'
                });
              }else{
                new Attachment().Gif({
                  path: path,
                  url: urlCoder.encoder(text),
                  type: 'stickerGif ns'
                });
              }
            break;
            case ':g:' && ':g:':
              if(text.match(/\./)){
                let emj = text.split('.');
                if(!gifsDB[emj[0]][emj[1]]) return;
                new Attachment().Gif({
                  path: path,
                  url: `https://thumbs.gfycat.com/${gifsDB[emj[0]][emj[1]].gifId}-mobile.mp4`,
                  title: `${emj[0]}:${emj[1]}`,
                  type: 'gif s'
                });
              }else{
                new Attachment().Gif({
                  path: path,
                  url: urlCoder.encoder(text),
                  type: 'gif ns'
                });
              }
            break;
            case ':emb:' && ':emb:': {
                const enc = urlCoder.encoder(text);
                new Attachment().urlCheck({
                  path: path,
                  url: enc,
                  attType: 'embed'
                });
              }
            break;
            case ':alb:' && ':alb:':
              new Album({
                path: path,
                albumArr: JSON.parse(text.replace(/&amp;/gm, '&'))
              });
            break;
          }
        })
      }
    })
  }

  // if(t.match(filter.filter)){
    console.log(filter.search)
  for(let i = 0, p = path.children, pLength = p.length; i < pLength; i++){
    if(!p[i].nodeName === 'P') continue;
    if(p[i].textContent.match(filter.search)) writer(p[i].textContent.trim(), p[i], true) + console.log('Running');
    // console.log(path.children[i])
  }
    // path.children[0].textContent='';
    // path.textContent='';
    // writer(t, path);
// }
};
