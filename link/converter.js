class LinkConverter{
  constructor(path){
    if(document.getElementById('dtf-linkConverter')) return;
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
    this.headerLabel=new Div({
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
        setTimeout(() => {
          e.target.setAttribute('added', e.target.value);
        }, 100);
        this.preview.className=this.type.value;

        if(this.type.value.match(/gif|emojiGif/)){
          this.preview.src=e.target.value;
          this.preview.poster='';
        }else{
          this.preview.poster=e.target.value;
          this.preview.src='';
        }
      },
      onkeyup: (e) => {
        if(!e.target.value) return;
        if(e.target.value.match(/http(s):\/\/.+/) && e.target.getAttribute('added') === e.target.value && e.code === 'Enter'){
          document.querySelector(`.content_editable`).textContent += (() => {
            switch(this.type.value){
              case 'gif': return `:g:${urlCoder.decoder(e.target.value)}:g:`;
              case 'image': `:i:${urlCoder.decoder(e.target.value)}:i:`;
              case 'emoji': return `:e:${urlCoder.decoder(e.target.value)}:e:`;
              case 'sticker': return `:s:${urlCoder.decoder(e.target.value)}:s:`;
              case 'emojiGif': return `:eg:${urlCoder.decoder(e.target.value)}:eg:`;
              case 'stickerGif': return `:sg:${urlCoder.decoder(e.target.value)}:sg:`;
              case 'gifUrl': return e.target.value;
              case 'imageUrl': return e.target.value;
            }
          })();
        }
      }
    })

    this.type=new Select({
      path: this.form,
      name: 'linkMode',
      value: 'gif',
      rtn: [],
      onchange: (e) => {
        console.log(this.input)
        this.preview.className=e.target.value;
        if(e.target.value.match(/gif|emojiGif/)){
          this.preview.src=this.input.value;
          this.preview.poster='';
        }else{
          this.preview.poster=this.input.value;
          this.preview.src='';
        }
      },
      body: (path, Optgroup) => {
        this.gifs=new Optgroup({
          path: path,
          label: 'Gifs',
          option: 'gif'
        });
        this.images=new Optgroup({
          path: path,
          label: 'Images',
          option: 'image'
        });
        this.emojis=new Optgroup({
          path: path,
          label: 'Emojis',
          options: ['emoji', 'emojiGif']
        });
        this.stickers=new Optgroup({
          path: path,
          label: 'Stickers',
          options: ['sticker', 'stickerGif']
        });
        this.urls=new Optgroup({
          path: path,
          label: 'Urls',
          options: ['gifUrl', 'imageUrl']
        });
      }
    });

    this.mask=new Div({
      path: this.main,
      cName: 'mask',
      rtn: []
    });

    this.preview=document.createElement('video');
    this.preview.className='preview';
    this.preview.src='';
    this.preview.poster='';
    this.mask.appendChild(this.preview);
  }
}
