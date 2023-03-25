class AlbumMiniPreviewer {
  constructor({path}){
    if(!document.getElementById('dtf-previewer')){
      this.dtfHeader=document.querySelector(`.site-header-container`);
      this.dtfCommentRail=document.querySelector(`.comments_updates_rail`);
      this.dtfHeader.classList.add('hidden');
      this.main=new Div({
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
            this.main.remove();
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
            if(e.deltaY > 0) zoom('out')
            else
            if(e.deltaY < 0) zoom('in');
          }
        }
      });

      this.statsList=new Div({
        path: this.main,
        cName: 'statsList',
        id: 'AMP-statsList',
        rtn: []
      });

      this.imageCount=new Div({
        path: this.statsList,
        // cName: 'statsList',
        // id: 'AMP-statsList',
        text: `Images: ${Array.prototype.indexOf.call(mainVars.picked.parentNode.children, mainVars.picked) + 1} / ${mainVars.picked.parentNode.childElementCount}`
      });

      this.zommLevel=new Div({
        path: this.statsList,
        // cName: 'statsList',
        // id: 'AMP-zoomLevel',
        text: 'Zoom: 100%'
      });

      this.text=new Div({
        path: this.statsList,
        text: `Text: ${mainVars.picked.children[1].getAttribute('text')}`
      });
    }else
    {
      this.statsList=document.getElementById('AMP-statsList');
      this.statsList.children[0].textContent=`Images: ${Array.prototype.indexOf.call(mainVars.picked.parentNode.children, mainVars.picked) + 1} / ${mainVars.picked.parentNode.childElementCount}`;
      this.statsList.children[1].textContent=`Zoom: 100%`;
      this.statsList.children[2].textContent=`Text: ${mainVars.picked.children[1].getAttribute('text')}`;
    }
  }
}
