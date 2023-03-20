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
      text.match(rW.filter) ? writer(text, this.main) : this.P({
        path: this.main,
        text: text
      })
    }
    I({path, text}){
      this.main = document.createElement('i');
      this.main.className = 'dtf-attach i';
      path.appendChild(this.main);
      text.match(rW.filter) ? writer(text, this.main) : this.P({
        path: this.main,
        text: text
      })
    }
    S({path, text}){
      this.main = document.createElement('s');
      this.main.className = 'dtf-attach s';
      path.appendChild(this.main);
      text.match(rW.filter) ? writer(text, this.main) : this.P({
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
      text.match(rW.filter) ? writer(text, this.main) : this.P({
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
    Iframe({path, url, type}){
      let filter = /https(?:s)*:\/\/.+(?:youtube\.com|youtu\.be).+\/([^?]+).*/gm;
      this.main=new Div({
        path: path,
        cName: `dtf-attach ${type}`,
        rtn: [],
        style: `background-image:url(https://img.youtube.com/vi/${url.replace(filter, '$1')}/sddefault.jpg)`
      });
      this.starter=new Div({
        path: this.main,
        cName: 'mediaStarter',
        rtn: [],
        onclick: () => {
          this.starter.remove();
          this.embed=document.createElement('iframe');
          this.embed.src=`${url}?modestbranding=1&rel=0`;
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
  }
  let rW = {
    tag: '<(?:b|i|s|a)>|:(?:|g|i|s|e|sg|eg|a|emb|alb):|\\|\\|',
    text: '[^]+',
    get filter(){
      return new RegExp(`(${rW.tag})(${rW.text}?)(${rW.tag})`, 'gmi')
    },
    get filter2(){
      return new RegExp(`(${rW.tag})(${rW.text}?)(\\1)`, 'gmi')
    },
    get fix(){
      return new RegExp(`((?:${rW.tag})(?:${rW.text})(?:${rW.tag}))`, 'gmi')
    }
  };
  // let filter = new RegExp(`(${rW.tag})(${rW.text}?)(${rW.tag})`, 'gmi'),
  // filter2 = new RegExp(`(${rW.tag})(${rW.text}?)(\\1)`, 'gmi'),
  // fix = new RegExp(`((?:${rW.tag})(?:${rW.text})(?:${rW.tag}))`, 'gmi'),
  // arr,
  // num = 0,
  // txt1;
  // function splitter(text){
  //   return text.split(fix);
  // }
  function writer(t, path, first){
    function splitter(text){
      return text.split(rW.fix);
    }
    if(first){
      path.textContent = '';
      path.className = 'dtf-commentText';
      t = t.replace(/(https:\/\/[^ ]+)/gm, '<a>$1<a>');
    }
    const words = splitter(t);

    words.forEach(i => {
      if(i && !i.match(rW.filter)){
        new Attachment().P({
          path: path,
          type: 'p',
          text: i
        });
        // console.log(`new P (${i})`);
      }else
      if (i.match(rW.filter)) {
        // console.log(i)
        i.replace(rW.filter2, (d, op, text, ed) => {
          // console.log(`${op} / ${text} / ${ed}`);
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
            case ':a:' && ':a:': {
              const enc = urlCoder.encoder(text);
              if(text.match(/\\/)){
                const l = enc.split('\\');
                new Attachment().A({
                  path: path,
                  type: 'a',
                  url: l[0],
                  name: l[1]
                });
              }else
              new Attachment().A({
                path: path,
                type: 'a',
                url: enc,
                text: enc
              });
            }
            break;
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
                if(enc.match(/youtube\.com|youtu\.be/) && mainCfg['attachments']['comments']['show']['embeds']['Youtube'])
                new Attachment().Iframe({
                  path: path,
                  url: enc,
                  type: 'embed yt'
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

  // if(t.match(rW.filter)){
  for(let i = 0, p = path.children, pLength = p.length; i < pLength; i++){
    if(!p[i].nodeName === 'P') continue;
    if(p[i].textContent.match(rW.filter)) writer(p[i].textContent.trim(), p[i], true);
    // console.log(path.children[i])
  }
    // path.children[0].textContent='';
    // path.textContent='';
    // writer(t, path);
// }
};
