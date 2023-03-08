class Album {
  constructor({path, type, albumArr, rtn}){
    this.main=new Div({
      path: path,
      cName: `album${type ? ` ${type}` : ''}`,
      rtn: []
    });

    this.header=new Div({
      path: this.main,
      cName: 'header',
      rtn: []
    });
    this.artsNumber=new Div({
      path: this.header,
      cName: 'num',
      text: albumArr ? albumArr.length : '',
      rtn: []
    });
    this.headerLabel=new Div({
      path: this.header,
      cName: 'label',
      text: 'ALBUM'
    });

    this.list=new Div({
      path: this.main,
      cName: 'list',
      rtn: []
    });



    if(albumArr) for(let i = 0; i < albumArr.length; i++){
      new AlbumItem({
        path: this.list,
        url: urlCoder.encoder(albumArr[i].u),
        text: albumArr[i].t
      })
    }

    if(rtn === 'list') return this.list;
  }
}

class AlbumItem {
  constructor({path, url, text, spoiler}){
    this.mask=new Div({
      path: path,
      cName: `mask${spoiler ? ' spoiler' : ''}`,
      rtn: [],
      tab: -1,
      onclick: (e) => {
        e.target.focus();
      },
      onfocus: (e) => {
        e.target.classList.add('picked');
        picked = e.target;
        new AlbumMiniPreviewer({
          path: document.body
        });
      },
      onkeydown: (e) => {
        if(!picked) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if(e.code === 'ArrowLeft'){
          prevAlbumItem(e);
        }else
        if(e.code === 'ArrowRight'){
          nextAlbumItem(e);
        }else
        if(e.code === 'Escape'){
          picked.blur();
          picked.children[1].style.scale = '1';
          picked.classList.remove('picked');
          picked.classList.remove('zoomed');
          document.getElementById('dtf-previewer').remove();
        }else
        if(e.code === 'ControlLeft'){
          btnPressed.ctrl = true;
        }
      },
      onkeyup: (e) => {
        if(!picked) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if(e.code === 'ControlLeft'){
          btnPressed.ctrl = false;
        }
      },
      onwheel: (e) => {
        if(!btnPressed.ctrl) return;
        if(!picked) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('Zoom mode on', e);
        if(!picked.classList.value.match(/zoomed/)){
          picked.classList.add('zoomed');
        }else
        {
          if(e.deltaY > 0) zoom('out')
          else
          if(e.deltaY < 0) zoom('in');
        }
      }
    });

    this.buttonPanel=new Div({
      path: this.mask,
      cName: 'buttonPanel',
      rtn: []
    });
    this.btnCopyLink=new Button({
      path: this.buttonPanel,
      cName: 'maskButton copyLink',
      label: 'L'
    });
    this.btnCopyImg=new Button({
      path: this.buttonPanel,
      cName: 'maskButton copyImg',
      label: 'I'
    });

    if(text){
      this.hasText=new Div({
        path: this.buttonPanel,
        cName: 'hasText',
        text: 'T'
      });
    }

    this.img=new Image({
      path: this.mask,
      cName: 'img',
      url: url,
      text: text,
      scale: '1',
      onclick: () => {
        console.log('Yo!');
      }
    });
  }
}

function prevAlbumItem(e) {
  if(!picked) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  if(picked.previousElementSibling) {
    picked.children[1].style.scale = '1';
    picked.classList.remove('picked');
    picked.classList.remove('zoomed');
    picked.previousElementSibling.focus();
  }else
  if(!picked.previousElementSibling) {
    if(picked.parentElement.children.length === 1) return;
    picked.children[1].style.scale = '1';
    picked.classList.remove('picked');
    picked.classList.remove('zoomed');
    picked.parentElement.lastElementChild.focus();
  }
}
function nextAlbumItem(e) {
  if(!picked) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  if(picked.nextElementSibling) {
    picked.children[1].style.scale = '1';
    picked.classList.remove('picked');
    picked.classList.remove('zoomed');
    picked.nextElementSibling.focus();
  }else
  if(!picked.nextElementSibling) {
    if(picked.parentElement.children.length === 1) return;
    picked.children[1].style.scale = '1';
    picked.classList.remove('picked');
    picked.classList.remove('zoomed');
    console.log(picked.parentElement.firstElementChild);
    picked.parentElement.firstElementChild.click();
  }
}

function zoom(mode){
  if(mode === 'in') {
      if(((+picked.children[1].style.scale + mainSettings['album settings']['preview zoom power']) * 100) == 100) picked.classList.remove('zoomed');
      picked.children[1].style.scale = +picked.children[1].style.scale + mainSettings['album settings']['preview zoom power'];
      document.getElementById('AMP-zoomLevel').textContent = `Zoom: ${(+picked.children[1].style.scale * 100)}%`;
  }
  else
  if(mode === 'out'){
    if(+picked.children[1].style.scale > 0 && (+picked.children[1].style.scale - mainSettings['album settings']['preview zoom power']) > 0){
      if(((+picked.children[1].style.scale - mainSettings['album settings']['preview zoom power']) * 100) == 100) picked.classList.remove('zoomed');
      picked.children[1].style.scale = +picked.children[1].style.scale - mainSettings['album settings']['preview zoom power'];
      document.getElementById('AMP-zoomLevel').textContent = `Zoom: ${(+picked.children[1].style.scale * 100)}%`;
    }
  };
}
