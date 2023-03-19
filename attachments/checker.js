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
      if (text.match(rW.filter)) writer(text, this.main);
      else this.main.textContent = text;
      path.appendChild(this.main);
    }
    I({path, text}){
      this.main = document.createElement('i');
      this.main.className = 'dtf-attach i';
      if (text.match(rW.filter)) writer(text, this.main);
      else this.main.textContent = text;
      path.appendChild(this.main);
    }
    S({path, text}){
      this.main = document.createElement('s');
      this.main.className = 'dtf-attach s';
      if (text.match(rW.filter)) writer(text, this.main);
      else this.main.textContent = text;
      path.appendChild(this.main);
    }
    A({path, text}){
      this.main = document.createElement('a');
      this.main.className = 'dtf-attach link';
      this.main.textContent = text.length > 25 ? `${text.slice(0, 25)}...` : text;
      this.main.href=text;
      this.main.target='_blank';
      path.appendChild(this.main);
    }
    Spoiler({path, text}){
      this.main=new Div({
        path: path,
        cName: 'dtf-attach spoiler',
        text: text.match(rW.filter) ? writer(text, this.main) : text,
        onclick: () => {
          this.main.classList.toggle('opened');
        }
      });
    }
    Emoji({path, url, type, title}){
      this.main=new Div({
        path: path,
        cName: `dtf-attach ${type}`,
        rtn: [],
        title: title
      });

      // if(type.match(/^(emoji s)$/)){
        new Image({
          path: this.main,
          url: url
        });
      // }
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
          cName: 'gifStarter',
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
  }
  let rW = {
    tag: '<(?:b|i|s|a)>|:(?:|g|i|s|e|sg|eg|alb):|\\|\\|',
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
            case '<a>' && '<a>':
              new Attachment().A({
                path: path,
                type: 'spoiler',
                text: text
              });
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
                  url:urlCoder.encoder(text),
                  type: 'gif ns'
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
