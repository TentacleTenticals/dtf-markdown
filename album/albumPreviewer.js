class AlbumMiniPreviewer {
  constructor({path}){
    if(!document.getElementById('dtf-previewer')){
      this.main=new Div({
        path: path,
        cName: 'dtf-previewer',
        id: 'dtf-previewer',
        tab: '-1',
        rtn: [],
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
            picked.children[1].style.transform = 'scale(1.0)';
            picked.classList.remove('picked', 'zoomed');
            // picked.classList.remove('zoomed');
            // this.main.remove();
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

      this.statsList=new Div({
        path: this.main,
        cName: 'statsList',
        rtn: []
      });

      this.imageCount=new Div({
        path: this.main,
        // cName: 'statsList',
        // id: 'AMP-statsList',
        text: `Images: ${Array.prototype.indexOf.call(picked.parentNode.children, picked) + 1} / ${picked.parentNode.childElementCount}`
      });

      this.zommLevel=new Div({
        path: this.main,
        // cName: 'statsList',
        // id: 'AMP-zoomLevel',
        text: 'Zoom: 100%'
      });

      this.text=new Div({
        path: this.main,
        text: `Text: ${picked.children[1].getAttribute('text')}`
      });
    }else
    {
      this.statsList=document.getElementById('AMP-statsList');
      this.statsList.children[0].textContent=`Images: ${Array.prototype.indexOf.call(picked.parentNode.children, picked) + 1} / ${picked.parentNode.childElementCount}`;
      this.statsList.children[1].textContent=`Zoom: 100%`;
      this.statsList.children[2].textContent=`Text: ${picked.children[1].getAttribute('text')}`;
    }
  }
}
