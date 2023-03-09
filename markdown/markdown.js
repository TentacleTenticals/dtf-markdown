class Formatter {
  constructor({ path, text }) {
    function injector(s, e){
      let t = {
        s: window.getSelection().anchorNode.textContent.substring(0, window.getSelection().anchorOffset),
        t: window.getSelection().anchorNode.textContent.substring(window.getSelection().anchorOffset, window.getSelection().focusOffset),
        e: window.getSelection().anchorNode.textContent.substring(window.getSelection().focusOffset, window.getSelection().anchorNode.textContent.length)
      }

      if(window.getSelection().anchorNode.textContent.length === window.getSelection().anchorOffset){
        window.getSelection().anchorNode.parentElement.innerText = `${s}${window.getSelection().anchorNode.textContent}${e}`;
      }else
      {
        window.getSelection().anchorNode.parentElement.innerText = `${t.s}${s}${t.t}${e}${t.e}`;
      }
    }
    
    this.main=document.createElement('div');
    this.main.className='formatter';
    this.main.id='formatter';
    this.main.style.top=`${text.getRangeAt(0).getBoundingClientRect().top-20}px`;
    this.main.style.left=`${text.getRangeAt(0).getBoundingClientRect().left}px`;
    this.main.tabindex=this.main.setAttribute('tabindex', '-1');
    this.main.onblur=() => {
      setTimeout(() => {
        this.main.remove();
      }, 100);
    }
    path.appendChild(this.main);
    this.main.focus();

    this.bSpoiler = document.createElement('button');
    this.bSpoiler.className = 'formatter-button';
    this.bSpoiler.innerText='Sp';
    this.bSpoiler.onclick=() => {
      injector('||', '||');
      // text.removeAllRanges();
      // document.selection.empty();
    }
    this.main.appendChild(this.bSpoiler);

    this.bBold = document.createElement('button');
    this.bBold.className = 'formatter-button';
    this.bBold.innerText='B';
    this.bBold.onclick=() => {
      text.anchorNode.textContent = `${t.s}<b>${t.t}</b>${t.e}`

      console.log(`${window.getSelection().anchorNode.textContent.substring(0, window.getSelection().anchorOffset)}<test>${window.getSelection().anchorNode.textContent.substring(window.getSelection().anchorOffset, window.getSelection().focusOffset)}</test>${window.getSelection().anchorNode.textContent.substring(window.getSelection().focusOffset, window.getSelection().anchorNode.textContent.length)}`)
    }
    this.main.appendChild(this.bBold);

    this.bIdio = document.createElement('button');
    this.bIdio.className = 'formatter-button';
    this.bIdio.innerText='i';
    this.bIdio.onclick=() => {
      text.anchorNode.textContent = `${t.s}<i>${t.t}</i>${t.e}`
    }
    this.main.appendChild(this.bIdio);

    this.bStrike = document.createElement('button');
    this.bStrike.className = 'formatter-button';
    this.bStrike.innerText='S';
    this.bStrike.onclick=() => {
      text.anchorNode.textContent = `${t.s}<s>${t.t}</s>${t.e}`
    }
    this.main.appendChild(this.bStrike);
  }
}

class MarkdownPanel {
  constructor(path, addBefore, tokens) {
    function injector(s, e){
      if(!window.getSelection()) return;
      if(!window.getSelection().toString().length > 0) return;
      let t = {
      s: window.getSelection().anchorNode.textContent.substring(0, window.getSelection().anchorOffset),
      t: window.getSelection().anchorNode.textContent.substring(window.getSelection().anchorOffset, window.getSelection().focusOffset),
      e: window.getSelection().anchorNode.textContent.substring(window.getSelection().focusOffset, window.getSelection().anchorNode.textContent.length)
      }

      if(window.getSelection().anchorNode.textContent.length === window.getSelection().anchorOffset){
        window.getSelection().anchorNode.parentElement.innerText = `${s}${window.getSelection().anchorNode.textContent}${e}`;
      }else
      {
        window.getSelection().anchorNode.parentElement.innerText = `${t.s}${s}${t.t}${e}${t.e}`;
      }
    };

    this.main=new Div({
      path: path,
      cName: 'dtf-markdownPanel',
      id: 'dtf-markdownPanel',
      tabIndex: -1,
      addBefore: addBefore,
      rtn: []
    });

    this.bSpoiler=new Button({
      path: this.main,
      cName: 'button',
      text: 'Sp',
      onclick: () => {
        injector('||', '||');
      }
    });
    this.bBold=new Button({
      path: this.main,
      cName: 'button',
      text: 'B',
      onclick: () => {
        injector('<b>', '</b>');
      }
    });
    this.bIdio=new Button({
      path: this.main,
      cName: 'button',
      text: 'i',
      onclick: () => {
        injector('<i>', '</i>');
      }
    });
    this.bStrike=new Button({
      path: this.main,
      cName: 'button',
      text: 'S',
      onclick: () => {
        injector('<s>', '</s>');
      }
    });
    this.bAlbum=new Button({
      path: this.main,
      cName: 'button',
      text: '🖼️',
      onclick: () => {
        new AlbumBuilder(document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    this.bAlbum=new Button({
      path: this.main,
      cName: 'button',
      text: '😉',
      onclick: () => {
        new EmojiPicker(document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
    this.bGif=new Button({
      path: this.main,
      cName: 'button',
      text: 'GIF',
      onclick: () => {
        new GifSearch('Default', document.querySelector(`div[class='comment-writing'] .thesis__panel`, tokens));
      }
    });
    this.bGif=new Button({
      path: this.main,
      cName: 'button',
      text: 'Tenor',
      onclick: () => {
        new GifSearch('Tenor', document.querySelector(`div[class='comment-writing'] .thesis__panel`, tokens));
      }
    });
    this.bLinkConverter=new Button({
      path: this.main,
      cName: 'button',
      text: 'LK',
      onclick: () => {
        new LinkConverter(document.querySelector(`div[class='comment-writing'] .thesis__panel`));
      }
    });
  }
}

function checkSelection() {
  // console.log(window.getSelection())
  if (window.getSelection()) {
    if(window.getSelection().toString().length > 0 && !document.getElementById('formatter')){
      new Formatter({
        text: window.getSelection(),
        path: document.body
      })
    }
  }
};
