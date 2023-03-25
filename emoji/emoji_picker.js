class EmojiPicker{
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
  EmojiGroup({path, type}){
    for(let group in emojisDB){
      if(!mainCfg['emoji picker']['groups to show'][group]) continue;
      let main=new Div({
        path: path,
        cName: 'emojiGroup',
        rtn: []
      });

      new Div({
        path: main,
        cName: 'groupName',
        text: group,
        onclick: (e) => {
          e.target.nextSibling.classList.toggle('hidden');
        }
      });

      let g=new Div({
        path: main,
        group: group,
        cName: 'emojiList',
        rtn: []
      });
      for(let e in emojisDB[group]){
        if(emojisDB[group][e].type === type){
          this.Emoji({
            url: emojisDB[group][e].url,
            name: e,
            path: g,
            type: emojisDB[group][e].type,
          });
        }
      };
      if(!g.children.length > 0) main.classList.add('hidden');
    }
  }
  Emoji({path, name, url, type}){
    let mask=new Div({
      path: path,
      cName: 'emojiMask',
      name: name,
      tab: '-1',
      rtn: [],
      onmouseenter: () => {
        mask.focus();
      },
      onfocus: () => {
        this.emojiName.textContent = `:${name}:`;
        if(type === 'a'){
          this.file.src = url;
          this.file.poster = '';
        }else{
          this.file.src = '';
          this.file.poster = url;
        }
      }
    });

    type === 'a' ? new Video({
      path: mask,
      cName: 'emoji',
      url: url,
      preload: 'metadata',
      onclick: () => {
        let res = (() => {
          switch(this.emojiType.value){
            case 'Emoji': return `:eg:${mask.parentNode.getAttribute('group')}.${name}:eg:`;
            case 'Sticker': return `:sg:${mask.parentNode.getAttribute('group')}.${name}:sg:`
            case 'Image': return `:g:${mask.parentNode.getAttribute('group')}.${name}:g:`
            case 'Url': return emojisDB[mask.parentNode.getAttribute('group')][name].url;
          }
        })();
        this.Modify(res);
      }
    }) : new Image({
      path: mask,
      cName: 'emoji',
      url: url,
      onclick: () => {
        let res = (() => {
          switch(this.emojiType.value){
            case 'Emoji': return `:e:${mask.parentNode.getAttribute('group')}.${name}:e:`;
            case 'Sticker': return `:s:${mask.parentNode.getAttribute('group')}.${name}:s:`
            case 'Image': return `:i:${mask.parentNode.getAttribute('group')}.${name}:i:`
            case 'Url': return emojisDB[mask.parentNode.getAttribute('group')][name].url;
          }
        })();
        this.Modify(res);
      }
    });
  }
  constructor(path){
    if(document.getElementById('dtf-emojiPicker')) return;
    this.Selection();
    this.main=new Div({
      path: path,
      cName: 'dtf-window emojiPicker',
      id: 'dtf-emojiPicker',
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
      text: 'EMOJI PICKER'
    });

    // this.list=new List({
    //   path: this.main,
    //   id: 'yo',
    //   rtn: true,
    //   func: (path) => {
    //     for(let g in emojisDB){
    //       console.log(g);
    //       for(let e in emojisDB[g]){
    //         new ListOption(path, e);
    //       }
    //     }
    //   }
    // });

    this.search=new Input({
      path: this.main,
      cName: 'search',
      name: 'search',
      id: 'search',
      type: 'text',
      placeholder: 'Введите название смайла',
      // list: 'yo',
      rtn: [],
      style: `display: flex;
      margin-top: 3px;`,
      onchange: (e) => {
        if(!e.target.value) return;
        if(document.querySelector(`.emojiMask[name=${e.target.value}]`)) document.querySelector(`.emojiMask[name=${e.target.value}]`).focus();
        // console.log(e.target.value)
        // console.log(document.querySelector(`.emojiMask[name=${e.target.value}]`))
      }
    });
    // console.log($( "#search" )[0])
    $(this.search).autocomplete({
      delay: 500,
      source: (() => {
        let arr = [];
        for(let g in emojisDB){
          // console.log(g);
          for(let e in emojisDB[g]){
            arr.push(e);
          }
        }
        console.log(arr)
        return arr;
      })(),
      select: (e, ui) => {
        setTimeout(() => {
          if(!e.target.value) return;
          if(this.main.querySelector(`.emojiMask[name=${e.target.value}]`)) this.main.querySelector(`.emojiMask[name=${e.target.value}]`).focus();
        }, 100)
        // console.log(e.val())
        // console.log(ui)
      }
    });
  //   $( "#search" ).keyup(function(){
  //     $( "#search" ).autocomplete({
  //        source: ['test']
  //     });
  //  });
  // this.mode=new Div({
  //   path: this.main,
  //   cName: 'mode',
  //   rtn: []
  // });

  // this.field=new Div({
  //   path: this.main,
  //   cName: 'field',
  //   rtn: []
  // });

    this.emojiType=new Select({
      path: this.main,
      // container: true,
      name: 'emojiType',
      value: mainCfg['emoji picker']['default mode'],
      rtn: [],
      options: ['Emoji', 'Sticker', 'Image', 'Url'],
      onchange: (e) => {
        if(e.target.value.match(/Emoji|Sticker|Image/)){
          this.mask.children[0].className=e.target.value;
        }else{
          this.mask.children[0].className='Image';
        }
      }
    });

    this.preview=new Div({
      path: this.main,
      cName: 'preview',
      rtn: []
    });
    this.emojiName=new Div({
      path: this.preview,
      cName: 'emojiCmd',
      text: '-',
      rtn: []
    });
    this.mask=new Div({
      path: this.preview,
      cName: 'mask',
      rtn: []
    });
    this.file=new Video({
      path: this.mask,
      cName: 'file',
      preload: 'metadata',
      autoplay: true,
      loop: true,
      rtn: []
    });

    this.typeList=new Div({
      path: this.main,
      cName: 'typeList',
      rtn: []
    });

    this.notAnimated=new Div({
      path: this.typeList,
      cName: 'groupType',
      rtn: []
    });
    new Div({
      path: this.notAnimated,
      cName: 'title',
      text: 'Обычные',
      onclick: (e) => {
        e.target.nextSibling.classList.toggle('hidden');
      }
    });
    this.groupList=new Div({
      path: this.notAnimated,
      cName: 'groupList',
      rtn: []
    });

    this.animated=new Div({
      path: this.typeList,
      cName: 'groupType',
      rtn: []
    });
    new Div({
      path: this.animated,
      cName: 'title',
      text: 'Анимированные',
      onclick: (e) => {
        e.target.nextSibling.classList.toggle('hidden');
      }
    });
    this.groupListAnimated=new Div({
      path: this.animated,
      cName: 'groupList',
      rtn: []
    });

      this.EmojiGroup({
        path: this.groupList,
        type: 'na',
      });
      this.EmojiGroup({
        path: this.groupListAnimated,
        type: 'a',
      });
    }
};
