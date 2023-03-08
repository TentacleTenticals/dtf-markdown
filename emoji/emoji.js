class List{
  constructor({path, id, func, rtn}){
    class Option{
      constructor(path, value){
        this.main=docment.createElement('option');
        this.main.value=value;
        path.appendChild(this.main);
      }
    }
    this.main=document.createElement('datalist');
    this.main.id=id;
    func(this.main);
    path.appendChild(this.main);

    if(rtn) return this.main;
  }
}
class ListOption{
  constructor(path, value){
    this.main=document.createElement('option');
    this.main.value=value;
    path.appendChild(this.main);
  }
}

class EmojiPicker {
  constructor(path) {
    class EmojiGroup {
      constructor({ path, type }) {
        for (let group in emoji) {
          this.main=new Div({
            path: path,
            cName: 'emojiGroup',
            rtn: []
          });

          this.name=new Div({
            path: this.main,
            cName: 'groupName',
            text: group,
            onclick: (e) => {
              e.target.nextSibling.classList.toggle('hidden');
            }
          });

          this.g=new Div({
            path: this.main,
            cName: 'emojiList',
            rtn: []
          });
          for(let e in emoji[group]){
            if(emoji[group][e].type === type){
              new Emoji({
                url: emoji[group][e].url,
                name: e,
                path: this.g,
                type: emoji[group][e].type,
              });
            }
          };
        }
      }
    }
    class Emoji{
      constructor({path, name, url, type}){
        this.mask=new Div({
          path: path,
          cName: 'emojiMask',
          name: name,
          tab: '-1',
          rtn: [],
          onmouseenter: () => {
            this.mask.focus();
          },
          onfocus: () => {
            this.ep = this.mask.closest('.emojiPicker');
            this.ep.children[4].children[0].textContent = `:${name}:`;
            if(type === 'a'){
              this.ep.children[4].children[1].children[0].src = url;
              this.ep.children[4].children[1].children[0].poster = '';
            }else{
              this.ep.children[4].children[1].children[0].src = '';
              this.ep.children[4].children[1].children[0].poster = url;
            }
          }
        });

        type === 'a' ? new Video({
          path: this.mask,
          cName: 'emoji',
          url: url,
          preload: 'metadata',
          pIp: true,
          onclick: () => {
            document.querySelector(
              `p[class=content_editable]`
            ).innerHTML += this.mask.closest('.emojiPicker').value === 'Emoji' ? `::${name}::` : `:s:${name}:s:`;
          }
        }) : new Image({
          path: this.mask,
          cName: 'emoji',
          url: url,
          onclick: () => {
            document.querySelector(
              `p[class=content_editable]`
            ).innerHTML += this.mask.closest('.emojiPicker').value === 'Emoji' ? `::${name}::` : `:s:${name}:s:`;
          }
        });
      }
    }
    if(document.getElementById('dtf-emojiPicker')) return;
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

    this.list=new List({
      path: this.main,
      id: 'yo',
      rtn: true,
      func: (path) => {
        for(let g in emoji){
          console.log(g);
          for(let e in emoji[g]){
            new ListOption(path, e);
          }
        }
      }
    });

    this.search=new Input({
      path: this.main,
      cName: 'search',
      name: 'search',
      id: 'search',
      type: 'text',
      // list: 'yo',
      rtn: true,
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
    $( "#search" ).autocomplete({
      delay: 500,
      source: (() => {
        let arr = [];
        for(let g in emoji){
          // console.log(g);
          for(let e in emoji[g]){
            arr.push(e);
          }
        }
        console.log(arr)
        return arr;
      })(),
      select: (e, ui) => {
        setTimeout(() => {
          if(!e.target.value) return;
          if(document.querySelector(`.emojiMask[name=${e.target.value}]`)) document.querySelector(`.emojiMask[name=${e.target.value}]`).focus();
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
      value: 'Emoji',
      rtn: [],
      options: ['Emoji', 'Sticker', 'url'],
      onchange: (e) => {
        if(e.target.value === 'Emoji'){
          this.mask.children[0].className='emoji';
        }else{
          this.mask.children[0].className='sticker';
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
      text: '-'
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
      pIp: true
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
      text: 'Не анимированы',
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
      text: 'Анимированы',
      onclick: (e) => {
        e.target.nextSibling.classList.toggle('hidden');
      }
    });
    this.groupListAnimated=new Div({
      path: this.animated,
      cName: 'groupList',
      rtn: []
    });

      new EmojiGroup({
        path: this.groupList,
        type: 'na',
      });
      new EmojiGroup({
        path: this.groupListAnimated,
        type: 'a',
      });
    }
};
