class AlbumBuilder {
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
    if(mainCfg['album builder']['close after pick']) this.main.remove();
  }
  AlbumUrlAdd({path, addBefore, num, list}){
    let main=new Div({
      path: path,
      cName: 'container',
      rtn: []
    });

    let cont1=new Div({
      path: main,
      cName: 'contUrl',
      rtn: []
    });
    let mainUrl=new Input({
      path: cont1,
      cName: 'input url',
      id: `albumUrl-${num}`,
      type: 'url',
      placeholder: 'Введите URL / вставьте URL/image из буфера обмена',
      rtn: [],
      onblur: () => {
        if(!mainUrl.value) return;
      this.AlbumPreviewItem({
        path: list,
        id: `albumItem-${num}`,
        url: mainUrl.value,
        spoiler: spoiler.checked
      });
      list.parentNode.children[0].children[0].textContent = list.children.length;
      },
      onpaste: (e) => {
        if(!e.type === 'paste') return;
        if(!Object.keys(e.clipboardData.files).length > 0){
          console.log('Paaaaste link');
          mainUrl.value = e.clipboardData.getData('text');
          mainUrl.blur();
          return;
        }else
        {
          console.log('Paaaaste file');
          if(!mainCfg['album builder']['allow items upload']) return;
          if(!mainCfg['album builder']['tokens']['ImgBB']['clientToken']) return;
          new Promise((resolve, error) => {
            console.log(e.clipboardData.files[0].size)
            resolve(this.getSize(e.clipboardData.files[0].size));
          }).then(res => {
            if(res.type === 'б' || res.type === 'кб' || res.type === 'мб' && res.num <= 32){
              console.log(`Starting upload... ${res.num}${res.type}`);
              e.stopImmediatePropagation();
              this.uploader(e.clipboardData.files[0], mainUrl);
            }else{
              console.log(`Too big! ${res.num}${res.type}`);
              mainUrl.blur();
            }
          })
          // imgurUploader(e.clipboardData.files[0], mainUrl);
        }
      }
    });

    let cont2=new Div({
      path: main,
      cName: 'contText',
      rtn: []
    });

    new Input({
      path: cont2,
      cName: 'input text',
      id: `albumText-${num}`,
      placeholder: 'Введите описание изображения',
      type: 'text'
    });

    let cont3=new Div({
      path: main,
      cName: 'contSpoiler',
      rtn: []
    });
    let spoiler=new Input({
      path: cont3,
      cName: 'input spoiler',
      id: `albumSpoiler-${num}`,
      type: 'checkbox',
      label: 'Спойлер',
      rtn: [],
      onchange: () => {
        if(!mainUrl.value) return;
        this.AlbumPreviewItem({
          path: list,
          id: `albumItem-${num}`,
          url: mainUrl.value,
          spoiler: spoiler.checked
        });
      }
    });
  }
  AlbumPreviewItem({path, id, url, spoiler}){
    if(!document.getElementById(id)){
      let mask=document.createElement('div');
      spoiler ? mask.className='mask spoiler' : mask.className='mask';
      mask.id=id;
      mask.setAttribute('tabindex', '-1');
      path.appendChild(mask);

      let img=document.createElement('img');
      img.className='img';
      img.src=url;
      console.log('UPD', img.src)
      img.onerror= () => {
        img.src='https://i.imgur.com/ymAqNjU.png';
        img.onerror = null;
      }
      mask.appendChild(img);
    }else
    {
      // alert('P2')
      let mask=document.getElementById(id);
      spoiler ? mask.className='mask spoiler' : mask.className='mask';
      // console.log('Mask:', this.mask)
      mask.children[0].src=url;
      // console.log('UPD2', this.mask.children[1].src)
      mask.children[0].onerror= () => {
        mask.children[0].src='https://i.imgur.com/ymAqNjU.png';
        mask.children[0].onerror = null;
      }
    }
  }
  uploader(image, input){
    const form = new FormData();
    form.append('image', image);

    fetch(`https://api.imgbb.com/1/upload?key=${mainCfg['album builder']['tokens']['ImgBB']['clientToken']}`, {
      method: 'POST',
      body: form
    }).then(d => d.json()).then(res => {
      if(res.status === 200){
        console.log(res.data.url);
        input.value = res.data.url;
        input.blur();
      }else{
        console.log('Upload error');
        input.blur();
      }
    }).catch(err => console.log(err))
  }
  getSize(b){
    let kb, mb, gb, tb, pb, hw;
    if (!b || b === 0) return b = '';
    if (b < 1024) return { num: b.toFixed(2), type: 'б' };
    else
    if (b >= 1024) kb = (b / 1024);

    if (kb < 1024) return { num: kb.toFixed(2), type: 'кб' };
    else
    if (kb >= 1024) mb = (kb / 1024);

    if (mb < 1024) return { num: mb.toFixed(2), type: 'мб' };
    else
    if (mb >= 1024) gb = (mb / 1024);
  }
  constructor(path){
    if(document.getElementById('albumBuilder')) return;
    this.Selection();
    this.main=new Div({
      path: path,
      cName: 'dtf-window dtf-albumBuilder',
      id: 'dtf-albumBuilder',
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
      text: 'ALBUM BUILDER'
    });

    this.form=new Form({
      path: this.main,
      cName: 'form',
      rtn: [],
      action: '',
      method: '',
      onsubmit: () => {
        return false;
      }
    });

    this.addFieldBtn=new Button({
      path: this.main,
      cName: 'btn',
      text: 'Add field',
      onclick: () => {
        new AlbumUrlAdd({
          path: this.form,
          num: this.form.children.length / 3+1,
          list: this.albumList
        })
      }
    })

    this.submit=new Input({
      path: this.main,
      type: 'submit',
      cName: 'btn',
      value: 'Create album',
      style: 'width:100%',
      onclick: () => {
        console.log('Click')
        let al = [];
        for(let i = 0, arr = this.main.querySelectorAll(`input[class='input url']`); i < arr.length; i++){
          if(arr[i].classList.value.match(/url/)){
            arr[i].value ? al.push({
              u:urlCoder.decoder(arr[i].value),
              t:arr[i].parentNode.nextElementSibling.children[0].value||'',
              s:arr[i].parentNode.nextElementSibling.nextElementSibling.children[0].checked}) : '';
          }
        }

        this.Modify(`:alb:${JSON.stringify(al)}:alb:`);
        // this.main.remove();
      }
    })

    this.albumList=new Album({
      path: this.main,
      type: 'preview',
      rtn: 'list'
    });

    this.AlbumUrlAdd({
      path: this.form,
      num: 1,
      list: this.albumList
    })
    this.AlbumUrlAdd({
      path: this.form,
      num: 2,
      list: this.albumList
    })
    this.AlbumUrlAdd({
      path: this.form,
      num: 3,
      list: this.albumList
    })
    this.AlbumUrlAdd({
      path: this.form,
      num: 4,
      list: this.albumList
    })
    
  }
};
