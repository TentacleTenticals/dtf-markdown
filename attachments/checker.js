function attachmentsChecker(e){
  class Attachment{
    constructor({path, group, name, title, url, type}){
      this.mask=new Div({
        path: path,
        cName: `dtf-${type}`,
        rtn: [],
        title: title,
        onclick: type.match(/^(gif|emojiGif)$/) && ((e) => {
          if(this.mask.lastChild.paused) this.mask.lastChild.play();
          else this.mask.lastChild.pause();
        })
      })
  
      if(type.match(/^(gif|emojiGif)$/)){
        if(type === 'gif'){
        this.fix=new Div({
          path: this.mask,
          cName: 'gifStarter',
          rtn: []
        });
        this.prev=new Div({
          path: this.fix,
          cName: 'btn',
          rtn: []
        });
        this.svg=new Image({
          path: this.prev,
          url: 'https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg'
        });
        }
  
        this.attachment=new Video({
          path: this.mask,
          cName: type,
          url: url,
          pIp: true,
          loop: true,
          // controls: type === 'gif' ? true : '',
          preload: type === 'gif' && 'metadata',
          autoplay: type.match(/^(emojiGif|stickerGif)$/) && true,
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
      }else
      if(type.match(/^(image|emoji)$/)){
        this.attachment=new Image({
          path: this.mask,
          cName: type,
          url: type === 'image' ? url : emoji[group][name].url,
          loading: 'lazy'
        });
      };
    }
  };
  class P{
    constructor({path, cName, text}){
      this.main=document.createElement('p');
      if(cName) this.main.className=cName;
      this.main.textContent=text;
      path.appendChild(this.main);
    }
  };
  let filter = /(<(?:b|s)>|:(?:|g|i|s|e|sg|eg|album):|\|\|)([^]+?)(<\/(?:b|s)>|:(?:|g|i|s|e|sg|eg|album):|\|\|)/gmi,
  arr = [],
  num = 0,
  txt1;

  if(e.textContent.trim().match(filter)){
    e.textContent.trim().replace(filter, (d, op, text, ed, coord, q) => {
      arr.push(q.slice(num, coord));
      num = coord+op.length+text.length+ed.length;
      arr.push(`${op}${text}${ed}`);
      txt1 = q.slice(coord);
    })
    e.textContent = '';
    arr.push(txt1.replace(filter, ''));

    arr.forEach(i => {
      if(i.match(filter)) i.replace(filter, (d, op, text, ed) => {
        if(op === '::' && ed === '::'){
          for(let group in emoji){
            if(emoji[group][text]){
              new Attachment({
                path: e,
                group: group,
                name: text,
                title: text,
                type: 'emoji'
              });
            }
          }
        }else
        if(op === ':s:' && ed === ':s:'){
          // console.log(`Sticker detected!`);
          for(let group in emoji){
            if(emoji[group][text]){
              new Attachment({
                path: e,
                group: group,
                name: text,
                title: text,
                type: 'sticker'
              });
            }
          }
        }else
        if(op === ':g:' && ed === ':g:'){
          if(text.match(/:/)){
            let cmd = text.split(':');
            // console.log('Founded', gifs.find(e => e.group === cmd[0] && e.name === cmd[1]
            // ))
            new Attachment({
              path: e,
              url: `https://thumbs.gfycat.com/${gifs[cmd[0]][cmd[1]].gifId}-mobile.mp4`,
              type: 'gif'
            });
          }else
          // console.log(`Gifv detected!`);
          new Attachment({
            path: e,
            url: urlCoder.encoder(text),
            type: 'gif'
          });
        }else
        if(op === ':i:' && ed === ':i:'){
          // console.log(`Image detected!`);
          new Attachment({
            path: e,
            url: urlCoder.encoder(text),
            type: 'image'
          });
        }else
        if(op === ':eg:' && ed === ':eg:'){
          // console.log(`EmojiGif detected!`);
          new Attachment({
            path: e,
            url: urlCoder.encoder(text),
            type: 'emojiGif'
          });
        }else
        if(op === ':album:' && ed === ':album:'){
          // console.log('Before jso', text);
          new Album({
            path: e,
            albumArr: JSON.parse(text.replace(/&amp;/gm, '&'))
          })
        }
      })
      else
      new P({
        path: e,
        cName: 'dtf-commentText',
        text: i
      });
    })
  }
};
