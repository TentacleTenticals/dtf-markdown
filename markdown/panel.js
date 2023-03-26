class MarkdownPanel {
  Selection(){
    if(!window.getSelection().focusNode) return;
    if(!window.getSelection().focusNode.isContentEditable && !window.getSelection().focusNode.parentNode.isContentEditable) return console.log('Wrong element', window.getSelection().focusNode);
    // if(!window.getSelection()) return;
    // if(!window.getSelection().toString().length > 0) return;
    return {
      s: window.getSelection().focusNode.textContent.substring(0, window.getSelection().anchorOffset),
      t: window.getSelection().focusNode.textContent.substring(window.getSelection().anchorOffset, window.getSelection().focusOffset),
      e: window.getSelection().focusNode.textContent.substring(window.getSelection().focusOffset, window.getSelection().focusNode.textContent.length),
      target: window.getSelection().focusNode,
      offset: window.getSelection().anchorOffset
    }
  }
  Modify(s, e){
    if(!this.Selection()) return;
    let sel = this.Selection();

    if(sel.target.textContent.length === sel.offset){
      sel.target.textContent = `${s}${sel.target.textContent}${e}`;
      // sel.selection.removeAllRanges();
    }else{
      sel.target.textContent = `${sel.s}${s}${sel.t}${e}${sel.e}`;
      // sel.selection.removeAllRanges();
    }
  }
  constructor(path, addBefore) {
    if(document.getElementbyId('dtf-markdownPanel')) return;
    this.windowsPath=document.querySelector(`.comment-writing`);
    this.main=new Div({
      path: path,
      cName: 'dtf-markdownPanel',
      id: 'dtf-markdownPanel',
      tabIndex: -1,
      addBefore: addBefore,
      rtn: []
    });

    if(mainCfg['markdown panel']['buttons']['spoiler']) new Button({
      path: this.main,
      cName: 'button',
      text: 'Sp',
      onclick: () => {
        this.Modify('||', '||');
      }
    });
    if(mainCfg['markdown panel']['buttons']['<b>']) new Button({
      path: this.main,
      cName: 'button',
      text: 'B',
      onclick: () => {
        this.Modify('<b>', '<b>');
      }
    });
    if(mainCfg['markdown panel']['buttons']['<i>']) new Button({
      path: this.main,
      cName: 'button',
      text: 'i',
      onclick: () => {
        this.Modify('<i>', '<i>');
      }
    });
    if(mainCfg['markdown panel']['buttons']['<s>']) new Button({
      path: this.main,
      cName: 'button',
      text: 'S',
      onclick: () => {
        this.Modify('<s>', '<s>');
      }
    });
    if(mainCfg['markdown panel']['buttons']['album']) new Button({
      path: this.main,
      cName: 'button',
      text: '🖼️',
      onclick: () => {
        new AlbumBuilder(this.windowsPath);
      }
    });
    if(mainCfg['markdown panel']['buttons']['emoji']) new Button({
      path: this.main,
      cName: 'button',
      text: '😉',
      onclick: () => {
        new EmojiPicker(this.windowsPath);
      }
    });
    if(mainCfg['markdown panel']['buttons']['gif']['slots']['a']) new Button({
      path: this.main,
      cName: 'button',
      text: mainCfg['markdown panel']['buttons']['gif']['modes']['a'] === 'Default' ? 'GIF' : mainCfg['markdown panel']['buttons']['gif']['modes']['a'],
      onclick: () => {
        new GifSearch(mainCfg['markdown panel']['buttons']['gif']['modes']['a'], this.windowsPath);
      }
    });
    if(mainCfg['markdown panel']['buttons']['gif']['slots']['b']) new Button({
      path: this.main,
      cName: 'button',
      text: mainCfg['markdown panel']['buttons']['gif']['modes']['b'] === 'Default' ? 'GIF' : mainCfg['markdown panel']['buttons']['gif']['modes']['b'],
      onclick: () => {
        new GifSearch(mainCfg['markdown panel']['buttons']['gif']['modes']['b'], this.windowsPath);
      }
    });
    if(mainCfg['markdown panel']['buttons']['gif']['slots']['c']) new Button({
      path: this.main,
      cName: 'button',
      text: mainCfg['markdown panel']['buttons']['gif']['modes']['c'] === 'Default' ? 'GIF' : mainCfg['markdown panel']['buttons']['gif']['modes']['c'],
      onclick: () => {
        new GifSearch(mainCfg['markdown panel']['buttons']['gif']['modes']['c'], this.windowsPath);
      }
    });
    if(mainCfg['markdown panel']['buttons']['lk']) new Button({
      path: this.main,
      cName: 'button',
      text: 'LK',
      onclick: () => {
        new LinkConverter(this.windowsPath);
      }
    });
    if(mainCfg['markdown panel']['buttons']['comment preview']) new Button({
      path: this.main,
      cName: 'button',
      text: 'Preview',
      onclick: () => {
        new CommentPreviewer(this.windowsPath, document.querySelector(`.comment-writing .content_editable`).textContent.trim());
      }
    });
  }
};
