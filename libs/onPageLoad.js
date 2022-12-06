// ==UserScript==
// @name        DTF function runner
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.1
// @author      Tentacle Tenticals
// @description Лоадер функций
// @homepage https://github.com/TentacleTenticals/
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

(function() {
'use strict';
  window.onPageLoad = (run) => {
    {
    const log = console.log.bind(console)
    console.log = (...args) => {
      if(Array.isArray(args)){
        if(args[0]){
          if(typeof args[0] === 'string'){
            if(args[0].match(/\[ Air \] Ready.*/)){
              run();
            }
          }
        }
      }
      log(...args);
    }}
  }
})();
