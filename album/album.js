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
      // onclick: (e) => {
      //   e.target.focus();
      // },
      onfocus: (e) => {
        e.target.classList.add('picked');
        mainVars.picked = e.target;
        new AlbumMiniPreviewer({
          path: document.body
        });
      },
      onkeydown: (e) => {
        if(!mainVars.picked) return;
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
          mainVars.picked.blur();
          mainVars.picked.children[1].style.scale = '1';
          mainVars.picked.classList.remove('picked');
          mainVars.picked.classList.remove('zoomed');
          document.getElementById('dtf-previewer').remove();
        }else
        if(e.code === 'ControlLeft'){
          mainVars.btnPressed.ctrl = true;
        }
      },
      onkeyup: (e) => {
        if(!mainVars.picked) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if(e.code === 'ControlLeft'){
          mainVars.btnPressed.ctrl = false;
        }
      },
      onwheel: (e) => {
        // if(!e.target.className.match('picked')){
        //   if(e.deltaY > 10 && e.target.nextSibling){
        //     // alert('Yo')
        //   e.preventDefault();
        //   e.target.nextElementSibling.scrollIntoView();
        //   }
        // }
        if(!mainVars.btnPressed.ctrl) return;
        if(!mainVars.picked) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('Zoom mode on', e);
        if(!mainVars.picked.classList.value.match(/zoomed/)){
          mainVars.picked.classList.add('zoomed');
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
  if(!mainVars.picked) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  if(mainVars.picked.previousElementSibling) {
    mainVars.picked.children[1].style.scale = '1';
    mainVars.picked.classList.remove('picked');
    mainVars.picked.classList.remove('zoomed');
    mainVars.picked.previousElementSibling.focus();
  }else
  if(!mainVars.picked.previousElementSibling) {
    if(mainVars.picked.parentElement.children.length === 1) return;
    mainVars.picked.children[1].style.scale = '1';
    mainVars.picked.classList.remove('picked');
    mainVars.picked.classList.remove('zoomed');
    mainVars.picked.parentElement.lastElementChild.focus();
  }
}
function nextAlbumItem(e) {
  if(!mainVars.picked) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  if(mainVars.picked.nextElementSibling) {
    mainVars.picked.children[1].style.scale = '1';
    mainVars.picked.classList.remove('picked');
    mainVars.picked.classList.remove('zoomed');
    mainVars.picked.nextElementSibling.focus();
  }else
  if(!mainVars.picked.nextElementSibling) {
    if(mainVars.picked.parentElement.children.length === 1) return;
    mainVars.picked.children[1].style.scale = '1';
    mainVars.picked.classList.remove('picked');
    mainVars.picked.classList.remove('zoomed');
    console.log(mainVars.picked.parentElement.firstElementChild);
    mainVars.picked.parentElement.firstElementChild.click();
  }
}

function zoom(mode){
  if(mode === 'in') {
      if(((+mainVars.picked.children[1].style.scale + mainCfg['album']['previewer']['zoom power']) * 100) == 100) mainVars.picked.classList.remove('zoomed');
      mainVars.picked.children[1].style.scale = +mainVars.picked.children[1].style.scale + mainCfg['album']['previewer']['zoom power'];
      document.getElementById('AMP-statsList').children[1].textContent = `Zoom: ${(+mainVars.picked.children[1].style.scale * 100)}%`;
  }
  else
  if(mode === 'out'){
    if(+mainVars.picked.children[1].style.scale > 0 && (+mainVars.picked.children[1].style.scale - mainCfg['album']['previewer']['zoom power']) > 0){
      if(((+mainVars.picked.children[1].style.scale - mainCfg['album']['previewer']['zoom power']) * 100) == 100) mainVars.picked.classList.remove('zoomed');
      mainVars.picked.children[1].style.scale = +mainVars.picked.children[1].style.scale - mainCfg['album']['previewer']['zoom power'];
      document.getElementById('AMP-statsList').children[1].textContent = `Zoom: ${(+mainVars.picked.children[1].style.scale * 100)}%`;
    }
  };
}
