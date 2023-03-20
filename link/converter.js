class LinkConverter{
  Selection(){
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
    if(mainCfg['link converter']['close after pick']) this.main.remove();
  }
  constructor(path){
    if(document.getElementById('dtf-linkConverter')) return;
    this.Selection();
    this.main=new Div({
      path: path,
      cName: 'dtf-window linkConverter',
      id: 'dtf-linkConverter',
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
    new Div({
      path: this.header,
      cName: 'label',
      text: 'LINK CONVERTER'
    });

    this.form=new Form({
      path: this.main,
      name: 'form',
      id: 'dtf-linkConverter',
      rtn: []
    });

    this.input=new Input({
      path: this.form,
      name: 'converter',
      type: 'text',
      required: true,
      placeholder: 'Введите URL',
      pattern: 'http(s):\/\/.+',
      rtn: [],
      onchange: (e) => {
        // if(e.target.getAttribute('added')) e.target.removeAttribute('added');
        // setTimeout(() => {
        //   e.target.setAttribute('added', e.target.value);
        // }, 100);
        this.preview.className=this.type.value;

        if(this.type.value.match(/^(gif|emojiGif)$/)){
          this.preview.src=e.target.value;
          this.preview.poster='';
        }else
        if(this.type.value.match(/^(emoji|sticker|image)$/)){
          this.preview.poster=e.target.value;
          this.preview.src='';
        }
      }
    })

    new Button({
      path: this.form,
      text: 'Ok',
      onclick: () => {
        if(!this.input.value) return;
        let res = (() => {
          switch(this.type.value){
            case 'gif': return `:g:${urlCoder.decoder(this.input.value)}:g:`;
            case 'image': `:i:${urlCoder.decoder(this.input.value)}:i:`;
            case 'emoji': return `:e:${urlCoder.decoder(this.input.value)}:e:`;
            case 'sticker': return `:s:${urlCoder.decoder(this.input.value)}:s:`;
            case 'emojiGif': return `:eg:${urlCoder.decoder(this.input.value)}:eg:`;
            case 'stickerGif': return `:sg:${urlCoder.decoder(this.input.value)}:sg:`;
            case 'embed': return `:emb:${urlCoder.decoder(this.input.value)}:emb:`;
            case 'link': return `<a>${urlCoder.decoder(this.input.value)}<a>`;
            case 'url': return urlCoder.decoder(this.input.value);
          }
        })();
        this.Modify(res);
      }
    })

    this.type=new Select({
      path: this.form,
      name: 'linkMode',
      value: mainCfg['link converter']['default mode'],
      rtn: [],
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
          label: 'Links',
          option: 'link'
        },
        {
          label: 'Urls',
          option: 'url'
        }
      ],
      onchange: (e) => {
        this.preview.className=e.target.value;
        if(this.type.value.match(/^(gif|emojiGif)$/)){
          this.preview.src=e.target.value;
          this.preview.poster='';
        }else
        if(this.type.value.match(/^(emoji|sticker|image)$/)){
          this.preview.poster=e.target.value;
          this.preview.src='';
        }
        // if(e.target.value.match(/gif|emojiGif/)){
        //   this.preview.src=this.input.value;
        //   this.preview.poster='';
        // }else{
        //   this.preview.poster=this.input.value;
        //   this.preview.src='';
        // }
      }
    });

    this.mask=new Div({
      path: this.main,
      cName: 'mask',
      rtn: []
    });

    this.preview=new Video({
      path: this.mask,
      cName: 'preview',
      rtn: []
    });
  }
}
