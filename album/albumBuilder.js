class AlbumBuilder {
  constructor(path){
    if(document.getElementById('albumBuilder')) return;
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
        for(let i = 0, arr = document.querySelectorAll(`input[class='input url']`); i < arr.length; i++){
          if(arr[i].classList.value.match(/url/)){
            arr[i].value ? al.push({
              u:urlCoder.decoder(arr[i].value),
              t:arr[i].parentNode.nextElementSibling.children[0].value||'',
              s:arr[i].parentNode.nextElementSibling.nextElementSibling.children[0].checked}) : '';
          }
        }

        al.length > 0 ? document.querySelector(`.content_editable`).textContent += `:alb:${JSON.stringify(al)}:alb:` : '';
        // this.main.remove();
      }
    })

    this.albumList=new Album({
      path: this.main,
      type: 'preview',
      rtn: 'list'
    });

    new AlbumUrlAdd({
      path: this.form,
      num: 1,
      list: this.albumList
    })
    new AlbumUrlAdd({
      path: this.form,
      num: 2,
      list: this.albumList
    })
    new AlbumUrlAdd({
      path: this.form,
      num: 3,
      list: this.albumList
    })
    new AlbumUrlAdd({
      path: this.form,
      num: 4,
      list: this.albumList
    })
    
  }
}

class AlbumUrlAdd {
  constructor({path, addBefore, num, list}){
    this.main=new Div({
      path: path,
      cName: 'container',
      rtn: []
    });

    this.cont1=new Div({
      path: this.main,
      cName: 'contUrl',
      rtn: []
    });
    this.mainUrl=new Input({
      path: this.cont1,
      cName: 'input url',
      id: `albumUrl-${num}`,
      type: 'url',
      rtn: [],
      onblur: () => {
        if(!this.mainUrl.value) return;
      new AlbumPreviewItem({
        path: list,
        id: `albumItem-${num}`,
        url: this.mainUrl.value,
        spoiler: this.mainUrl.parentNode.nextElementSibling.nextElementSibling.children[0].checked
      });
      list.parentNode.children[0].children[0].textContent = list.children.length;
      },
      onpaste: (e) => {
        if(!e.type === 'paste') return;
        if(!Object.keys(e.clipboardData.files).length > 0){
          console.log('Paaaaste link');
          this.mainUrl.value = e.clipboardData.getData('text');
          this.mainUrl.blur();
          return;
        }else
        {
          console.log('Paaaaste file');
          imgurUploader(e.clipboardData.files[0], this.mainUrl);
        }
      }
    });

    this.cont2=new Div({
      path: this.main,
      cName: 'contText',
      rtn: []
    });

    this.mainText=new Input({
      path: this.cont2,
      cName: 'input text',
      id: `albumText-${num}`,
      type: 'text'
    });

    this.cont3=new Div({
      path: this.main,
      cName: 'contSpoiler',
      rtn: []
    });
    this.spoiler=new Input({
      path: this.cont3,
      cName: 'input spoiler',
      id: `albumSpoiler-${num}`,
      type: 'checkbox',
      label: ['Спойлер', true],
      onchange: () => {
        if(!this.mainUrl.value) return;
        new AlbumPreviewItem({
          path: list,
          id: `albumItem-${num}`,
          url: this.mainUrl.value,
          spoiler: this.spoiler.checked
        });
      }
    });
  }
}

class AlbumPreviewItem {
  constructor({path, id, url, spoiler}){
    if(!document.getElementById(id)){
      this.mask=document.createElement('div');
      spoiler ? this.mask.className='mask spoiler' : this.mask.className='mask';
      this.mask.id=id;
      this.mask.setAttribute('tabindex', '-1');
      path.appendChild(this.mask);

      this.img=document.createElement('img');
      this.img.className='img';
      this.img.src=url;
      console.log('UPD', this.img.src)
      this.img.onerror= () => {
        this.img.src='https://i.imgur.com/ymAqNjU.png';
        this.img.onerror = null;
      }
      this.mask.appendChild(this.img);
    }else
    {
      // alert('P2')
      this.mask=document.getElementById(id);
      spoiler ? this.mask.className='mask spoiler' : this.mask.className='mask';
      // console.log('Mask:', this.mask)
      this.mask.children[0].src=url;
      // console.log('UPD2', this.mask.children[1].src)
      this.mask.children[0].onerror= () => {
        this.img.src='https://i.imgur.com/ymAqNjU.png';
        this.img.onerror = null;
      }
    }
  }
}

function imgurUploader(file, input){
  let formdata = new FormData()
  formdata.append("image", file)
  fetch("https://api.imgur.com/3/image", {
    method: "post",
    headers: {
        Authorization: `Bearer ${ms.tokens.imgur}`
    },
    body: formdata
  }).then(data => data.json()).then(data => {
    console.log(data)
    if(data.status === 200){
      // alert(data.data.link)
      input.value = data.data.link;
      input.blur();
    }else
    input.blur();
    // img.src = data.data.link
    // url.innerText = data.data.link
  })
}
