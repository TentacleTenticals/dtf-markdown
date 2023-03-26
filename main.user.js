// ==UserScript==
// @name         DTF-Markdown
// @namespace    TentacleTenticals
// @version      1.0
// @description  Markdown for DTF
// @author       TentacleTenticals
// @match        https://dtf.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dtf.ru
// @homepage     https://github.com/TentacleTenticals/dtf-markdown
// @updateURL    https://github.com/TentacleTenticals/dtf-markdown/raw/master/main.user.js
// @downloadURL  https://github.com/TentacleTenticals/dtf-markdown/raw/master/main.user.js
// @grant        none
//
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://code.jquery.com/ui/1.12.1/jquery-ui.js
//
// @require https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/indexedDB.js
// @require https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/infoMenu.js
// @require https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/settingsMenu.js
// @require https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/opener.js
//
// @require https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/css/menuLoader.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/css/main.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/css/attachments.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/css/gif_picker.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/css/emoji_picker.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/css/album_builder.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/css/album.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/css/link_converter.js
//
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/emoji/db.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/gif/db.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/settings/defaultSettings.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/init/info.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/init/settings.js
//
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/vars/cfg.js
//
// @require https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/main%20classes.js

// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/markdown/panel.js?

// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/album/album.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/album/albumBuilder.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/album/albumPreviewer.js

// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/attachments/checker.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/comments/previewer.js

// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/emoji/emoji_picker.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/gif/gif_picker.js?

// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/link/coder.js
// @require https://github.com/TentacleTenticals/dtf-markdown/raw/main/link/converter.js
// ==/UserScript==


(() => {
  'use strict';

  function getPageType(url){
    return url.replace(/https:\/\/dtf\.ru\/([^]+)/, (d, text) => {
      let arr = text.split('/');

      if(arr[0] && arr[0].match(/^popular$/)){
        if(!arr[1]) {
          return 'popular';
        }
      }else
      if(arr[0] && arr[0].match(/^new$/)){
        if(!arr[1]) {
          return 'new';
        }
      }else
      if(arr[0] && arr[0].match(/^my$/)){
        if(arr[1] && arr[1].match(/^new$/)) {
          return 'my new';
        }
      }else

      if(arr[0] && arr[0].match(/^u$/)){
        if(arr[1] && !arr[2]) {
          return 'user pages';
        }
        if(arr[1] && arr[2]) {
          return 'topics';
        }
      }else
      if(arr[0] && arr[0].match(/^s$/)){
        if(arr[1] && !arr[2]) {
          return 'subsites';
        }
        if(arr[1] && arr[2]) {
          return 'topics';
        }
      }else
      if(arr[0] && !arr[0].match(/^(u|s)$/)){
        if(arr[0] && !arr[1]) {
          return 'subsites';
        }
        if(arr[0] && arr[1]) {
          return 'topics';
        }
      }
    })
  }

  function commentsSearch(){
    let filter = /(<(?:b|i|s|a)>|\|\||:(?:e|eg|s|sg|i|g|v|emb|alb):)[^]+(\1)/i;
    for(let i = 0, cmm = document.querySelectorAll(`.comments .comment__text`), cmmLength = cmm.length; i < cmmLength; i++){
      if(cmm[i].textContent.trim().match(filter)){
        attachmentsChecker(cmm[i].textContent.trim(), cmm[i]);
      }
    }
  }


  onPageLoad(() => {
    console.log('Начинаю запуск DTF-Markdown...');
    run();
  });

// mainCfg = defaultSettings;
// console.log(setSettings)
  async function run(){
    console.log('RUN');
    initCfg = {
      func: () => {
        console.log('Встраивание инициализации в DTF-Markdown...');
        mainVars = {
          btnPressed: {}
        };
        // Пример перезаписи стандартных настроек. mainCfg['album builder']['close after pick'] = false;
        // mainCfg['album builder']['close after pick'] = false;

        new Css('DTF-Markdown', mainCSS+attachmentsCSS(mainCfg)+albumCSS(mainCfg)+albumBuilderCSS+emojiPickerCSS+gifPickerCSS+linkConverterCSS);
        new Css('settingsLoader', menuLoaderCSS);
        // new MarkdownPanel(document.querySelector(`.comment-writing`), document.querySelector(`.comment-writing *:nth-child(1)`));
      }
    }
    if(!mainCfg){
      db = dbGen(defaultSettings['scriptInfo']);
      await settingsLoader(db, initCfg);
      console.log(db);
    }
    if(getPageType(document.location.href) === 'topics'){
      new MarkdownPanel(
        document.querySelector(`.comment-writing__content`).children[0],
        document.querySelector(`.comment-writing__content`).children[0].children[0]);
      if(mainCfg['attachments']['comments']['search']['obs']) new Obs({
        target: document.querySelector(`.comments__content.l-island-a`),
        check: true,
        search: /comment/,
        name: 'comments',
        mode: 'start',
        cfg: {attributes: false, childList: true, subtree: false, characterData: false},
        func: (item) => {
          if(!item.classList.value > 0) return;
          if(item.classList.value.match(/comment/)){
            // console.log(item)
            let filter = /(<(?:b|i|s|a)>|\|\||:(?:e|eg|s|sg|i|g|v|emb|alb):)[^]+(\1)/i;
            if(item.querySelector(`.comment__text`).textContent.trim().match(filter)){
              console.log('OBS founded item!');
              attachmentsChecker(item.querySelector(`.comment__text`).textContent.trim(), item.querySelector(`.comment__text`));
            }
          }
        }
      });
      if(mainCfg['attachments']['comments']['search']['onLoad']) commentsSearch();
    }
  }

})();
