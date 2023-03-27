export class Album {
  AlbumItem({path, url, text, spoiler}){
    let mask=new Div({
      path: path,
      cName: `mask${spoiler ? ' spoiler' : ''}`,
      rtn: [],
      tab: -1,
      // onclick: (e) => {
      //   e.target.focus();
      // },
      onfocus: (e) => {
        // this.dtfHeader.classList.add('hidden');
        // this.dtfCommentRail.classList.add('hidden');
        e.target.classList.add('picked');
        mainVars.picked = e.target;
        this.AlbumMiniPreviewer({
          path: document.body
        });
      },
      onkeydown: (e) => {
        if(!mainVars.picked) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if(e.code === 'ArrowLeft'){
          this.prevAlbumItem(e);
        }else
        if(e.code === 'ArrowRight'){
          this.nextAlbumItem(e);
        }else
        if(e.code === 'Escape'){
          mainVars.picked.blur();
          mainVars.picked.children[1].style.scale = '1';
          mainVars.picked.classList.remove('picked');
          mainVars.picked.classList.remove('zoomed');
          document.getElementById('dtf-previewer')?.remove();
          this.dtfHeader.classList.remove('hidden');
          this.dtfCommentRail.classList.remove('hidden');
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
          if(e.deltaY > 0) this.zoom('out')
          else
          if(e.deltaY < 0) this.zoom('in');
        }
      }
    });

    let buttonPanel=new Div({
      path: mask,
      cName: 'buttonPanel',
      rtn: []
    });
    new Button({
      path: buttonPanel,
      cName: 'maskButton copyLink',
      label: 'L'
    });
    new Button({
      path: buttonPanel,
      cName: 'maskButton copyImg',
      label: 'I'
    });
    if(text) new Div({
      path: buttonPanel,
      cName: 'hasText',
      text: 'T'
    });

    new Image({
      path: mask,
      cName: 'img',
      url: url,
      text: text,
      scale: '1'
    });
  }
  AlbumMiniPreviewer({path}){
    if(!document.getElementById('dtf-previewer')){
      this.dtfHeader=document.querySelector(`.site-header-container`);
      this.dtfCommentRail=document.querySelector(`.comments_updates_rail`);
      this.dtfHeader.classList.add('hidden');
      this.previewer=new Div({
        path: path,
        cName: 'dtf-previewer',
        id: 'dtf-previewer',
        tab: '-1',
        rtn: [],
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
            mainVars.picked.children[1].style.transform = 'scale(1.0)';
            mainVars.picked.classList.remove('picked', 'zoomed');
            // mainVars.picked.classList.remove('zoomed');
            // this.main.remove();
            this.dtfHeader.classList.remove('hidden');
            this.dtfCommentRail.classList.remove('hidden');
            this.previewer.remove();
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
            if(e.deltaY > 0) this.zoom('out')
            else
            if(e.deltaY < 0) this.zoom('in');
          }
        }
      });

      this.statsList=new Div({
        path: this.previewer,
        cName: 'statsList',
        id: 'AMP-statsList',
        rtn: []
      });

      this.imageCount=new Div({
        path: this.statsList,
        rtn: [],
        // cName: 'statsList',
        // id: 'AMP-statsList',
        text: `Images: ${Array.prototype.indexOf.call(mainVars.picked.parentNode.children, mainVars.picked) + 1} / ${mainVars.picked.parentNode.childElementCount}`
      });

      this.zoomLevel=new Div({
        path: this.statsList,
        rtn: [],
        // cName: 'statsList',
        // id: 'AMP-zoomLevel',
        text: `Zoom: ${mainVars.picked.children[1].style.scale * 100}% (${mainVars.picked.classList.value.match(/zoomed/) ? 'zoomed' : 'normal'})`
      });

      this.itemText=new Div({
        path: this.statsList,
        rtn: [],
        text: `Text: ${mainVars.picked.children[1].getAttribute('text')||'-'}`
      });
    }else
    {
      this.imageCount.textContent=`Images: ${Array.prototype.indexOf.call(mainVars.picked.parentNode.children, mainVars.picked) + 1} / ${mainVars.picked.parentNode.childElementCount}`;
      this.zoomLevel.textContent=`Zoom: ${mainVars.picked.children[1].style.scale * 100}% (${mainVars.picked.classList.value.match(/zoomed/) ? 'zoomed' : 'normal'})`;
      this.itemText.textContent=`Text: ${mainVars.picked.children[1].getAttribute('text')||'-'}`;
    }
  }
  zoom(mode){
    if(mode === 'in') {
      if(((+mainVars.picked.children[1].style.scale + mainCfg['album']['previewer']['zoom power']) * 100) == 100) mainVars.picked.classList.remove('zoomed');
      mainVars.picked.children[1].style.scale = +mainVars.picked.children[1].style.scale + mainCfg['album']['previewer']['zoom power'];
      this.zoomLevel.textContent = `Zoom: ${(+mainVars.picked.children[1].style.scale * 100)}% (${mainVars.picked.classList.value.match(/zoomed/) ? 'zoomed' : 'normal'})`;
    }
    else
    if(mode === 'out'){
      if(+mainVars.picked.children[1].style.scale > 0 && (+mainVars.picked.children[1].style.scale - mainCfg['album']['previewer']['zoom power']) > 0){
        if(((+mainVars.picked.children[1].style.scale - mainCfg['album']['previewer']['zoom power']) * 100) == 100) mainVars.picked.classList.remove('zoomed');
        mainVars.picked.children[1].style.scale = +mainVars.picked.children[1].style.scale - mainCfg['album']['previewer']['zoom power'];
        this.zoomLevel.textContent = `Zoom: ${(+mainVars.picked.children[1].style.scale * 100)}% (${mainVars.picked.classList.value.match(/zoomed/) ? 'zoomed' : 'normal'})`;
      }
    };
  }
  prevAlbumItem(e) {
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
  nextAlbumItem(e) {
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
  constructor({path, type, albumArr, rtn}){
    this.dtfHeader=document.querySelector(`.site-header-container`);
    this.dtfCommentRail=document.querySelector(`.comments_updates_rail`);
    this.main=new Div({
      path: path,
      cName: `dtf-attach albumMini${type ? ` ${type}` : ''}`,
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
      this.AlbumItem({
        path: this.list,
        url: urlCoder.encoder(albumArr[i].u),
        text: albumArr[i].t,
        spoiler: albumArr[i].s
      })
    }

    if(rtn === 'list') return this.list;
  }
};
