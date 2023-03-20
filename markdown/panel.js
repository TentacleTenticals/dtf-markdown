class MarkdownPanel {
  Selection(){
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
    this.main=new Div({
      path: path,
      cName: 'dtf-markdownPanel',
      id: 'dtf-markdownPanel',
      tabIndex: -1,
      addBefore: addBefore,
      rtn: []
    });

    if(mainCfg['markdown panel']['buttons']['spoiler']) this.bSpoiler=new Button({
      path: this.main,
      cName: 'button',
      text: 'Sp',
      onclick: () => {
        this.Modify('||', '||');
      }
    });
    if(mainCfg['markdown panel']['buttons']['<b>']) this.bBold=new Button({
      path: this.main,
      cName: 'button',
      text: 'B',
      onclick: () => {
        this.Modify('<b>', '<b>');
      }
    });
    if(mainCfg['markdown panel']['buttons']['<i>']) this.bIdio=new Button({
      path: this.main,
      cName: 'button',
      text: 'i',
      onclick: () => {
        this.Modify('<i>', '<i>');
      }
    });
    if(mainCfg['markdown panel']['buttons']['<s>']) this.bStrike=new Button({
      path: this.main,
      cName: 'button',
      text: 'S',
      onclick: () => {
        this.Modify('<s>', '<s>');
      }
    });
    if(mainCfg['markdown panel']['buttons']['album']) this.bAlbum=new Button({
      path: this.main,
      cName: 'button',
      text: '🖼️',
      onclick: () => {
        new AlbumBuilder(document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    if(mainCfg['markdown panel']['buttons']['emoji']) this.bAlbum=new Button({
      path: this.main,
      cName: 'button',
      text: '😉',
      onclick: () => {
        new EmojiPicker(document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    if(mainCfg['markdown panel']['buttons']['gif']['slots']['a']) this.bGif=new Button({
      path: this.main,
      cName: 'button',
      text: mainCfg['markdown panel']['buttons']['gif']['modes']['a'] === 'Default' ? 'GIF' : mainCfg['markdown panel']['buttons']['gif']['modes']['a'],
      onclick: () => {
        new GifSearch(mainCfg['markdown panel']['buttons']['gif']['modes']['a'], document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    if(mainCfg['markdown panel']['buttons']['gif']['slots']['b']) this.bGif2=new Button({
      path: this.main,
      cName: 'button',
      text: mainCfg['markdown panel']['buttons']['gif']['modes']['b'] === 'Default' ? 'GIF' : mainCfg['markdown panel']['buttons']['gif']['modes']['b'],
      onclick: () => {
        new GifSearch(mainCfg['markdown panel']['buttons']['gif']['modes']['b'], document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    if(mainCfg['markdown panel']['buttons']['gif']['slots']['c']) this.bGif3=new Button({
      path: this.main,
      cName: 'button',
      text: mainCfg['markdown panel']['buttons']['gif']['modes']['c'] === 'Default' ? 'GIF' : mainCfg['markdown panel']['buttons']['gif']['modes']['c'],
      onclick: () => {
        new GifSearch(mainCfg['markdown panel']['buttons']['gif']['modes']['c'], document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    if(mainCfg['markdown panel']['buttons']['lk']) this.bLinkConverter=new Button({
      path: this.main,
      cName: 'button',
      text: 'LK',
      onclick: () => {
        new LinkConverter(document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    new Button({
      path: this.main,
      cName: 'button',
      text: 'Preview',
      onclick: () => {
        new CommentPreviewer(document.querySelector(`.comment-writing .thesis__panel`), document.querySelector(`.comment-writing .content_editable`).textContent.trim());
      }
    });
  }
};
