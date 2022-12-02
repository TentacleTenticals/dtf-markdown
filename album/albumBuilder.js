// ==UserScript==
// @name         albumBuilder class for DTF-markdown
// @namespace    https://github.com/TentacleTenticals
// @version      0.0.1
// @description  albumBuilder class
// @author       Tentacle Tenticals
// @license MIT
// ==/UserScript==
 
(function () {
'use strict';

function urlDecoder(s){
  let chars = {'https://':'᎑', 'http://':'᎔', '/':'᎓','.':'᎐'};
  s = s.replace(/(https:\/\/|http:\/\/|[/.])/g, m => chars[m]);
  console.log(s);
  return s;
}
function urlEncoder(s){
  var ch = {'᎑':'https://', '᎔':'http://', '᎓':'/','᎐':'.'};
  s = s.replace(/[᎑᎔^᎓᎐]/g, m => ch[m]);
  console.log(s);
  return s;
}

let filter = /(<b>|<s>|::|<album>)([^]+?)(<\/b>|<\/s>|::|<\/album>)/gmi;
class NewLine {
  constructor(path, addBefore){
    this.main=document.createElement('br');
    addBefore ? path.insertBefore(this.main, addBefore) : path.appendChild(this.main);
  }
}

window.AlbumBuilder = class AlbumBuilder {
  constructor(path){
    if(document.getElementById('albumBuilder')) return;
    this.main=document.createElement('div');
    this.main.className='albumBuilder';
    this.main.id='albumBuilder';
    path.appendChild(this.main);

    this.mainLabel=document.createElement('div');
    this.mainLabel.className='label';
    this.mainLabel.textContent='Album Builder';
    this.mainLabel.onclick=() => {
      this.main.remove();
    }
    this.main.appendChild(this.mainLabel);

    // this.submit=document.createElement('submit');

    this.form=document.createElement('form');
    this.form.className='form';
    this.form.action='';
    this.form.method='';
    this.form.onsubmit= () => {
      // this.submit.click();
      // let al = [];
      // for(let i = 0, arr = document.querySelectorAll(`input[class^='albumBuilder-input']`); i < arr.length; i++){
      //   if(arr[i].classList.value.match(/url/)){
      //     arr[i].value ? al.push({u:urlDecoder(arr[i].value), t:arr[i].nextElementSibling.nextElementSibling.value||''}) : '';
      //   }
      // }

      // al.length > 0 ? document.querySelector(`div[class='writeComment']`).innerText += `<album>${JSON.stringify(al)}</album>` : '';
      // this.main.remove();
      return false;
    };
    this.main.appendChild(this.form);

    // this.albumPreview=document.createElement('div');
    this.albumList=document.createElement('div');

    new AlbumUrlAdd({
      path: this.form,
      num: 1,
      alb: this.albumList
    })
    new AlbumUrlAdd({
      path: this.form,
      num: 2,
      alb: this.albumList
    })
    new AlbumUrlAdd({
      path: this.form,
      num: 3,
      alb: this.albumList
    })
    new AlbumUrlAdd({
      path: this.form,
      num: 4,
      alb: this.albumList
    })

    this.addField=document.createElement('div');
    this.addField.className='addInput';
    this.form.appendChild(this.addField);

    this.addFieldBtn=document.createElement('button');
    this.addFieldBtn.className='addInput';
    this.addFieldBtn.textContent='Add field';
    this.addFieldBtn.onclick = () => {
      // alert(this.addField.previousElementSibling.for)
      new AlbumUrlAdd({
        path: this.form,
        addBefore: this.addField,
        num: +this.addField.previousElementSibling.children[0].id.replace(/.+(\d+)/, '$1')+1,
        alb: this.albumList
      })
    }
    this.addField.appendChild(this.addFieldBtn);

    this.albumPreview=document.createElement('div');
    this.albumPreview.className='albumPreview';
    this.form.appendChild(this.albumPreview);

    this.albumPreviewLabel=document.createElement('div');
    this.albumPreviewLabel.className='albumPreview-label';
    this.albumPreviewLabel.textContent='Album Preview';
    this.albumPreview.appendChild(this.albumPreviewLabel);

    this.albumList.className='albumPreview-list';
    this.albumList.id='albumPreview-list';
    this.albumPreview.appendChild(this.albumList);

    this.submit=document.createElement('input');
    this.submit.type='submit';
    this.submit.value='Create album';
    this.submit.onclick = () => {
      // alert('Clicked!')
      let al = [];
      for(let i = 0, arr = document.querySelectorAll(`input[class='input url']`); i < arr.length; i++){
        if(arr[i].classList.value.match(/url/)){
          arr[i].value ? al.push({
            u:urlDecoder(arr[i].value),
            t:arr[i].parentNode.nextElementSibling.children[0].value||'',
            s:arr[i].parentNode.nextElementSibling.nextElementSibling.children[0].checked}) : '';
        }
      }

      al.length > 0 ? document.querySelector(`p[class='content_editable']`).innerText += `<album>${JSON.stringify(al)}</album>` : '';
      // this.main.remove();
    }
    this.form.appendChild(this.submit);
  }
}

class AlbumUrlAdd {
  constructor({path, addBefore, num, alb}){
    // alert(num)
    this.cont1=document.createElement('div');
    this.cont1.className='contUrl';
    addBefore ? path.insertBefore(this.cont1, addBefore) : path.appendChild(this.cont1);
    // this.form.appendChild(this.cont1);

    this.mainUrl=document.createElement('input');
    this.mainUrl.className='input url';
    this.mainUrl.id=`albumUrl-${num}`;
    this.mainUrl.type='url';
    this.mainUrl.autocomplete='off';
    // this.mainUrl.onchange= () => {
    //   // alert(this.mainUrl.value)
    //   if(!this.mainUrl.value) return;
    //   new AlbumPreviewItem({
    //     path: alb,
    //     id: `albumPreview-${num}`,
    //     url: this.mainUrl.value
    //   });
    //   // this.mainUrl.value ? fetch(this.mainUrl.value).then(res => {
    //   //   if(!res.status) return;
    //   //   console.log(res.status)
    //   //   res.status === 200 ? new AlbumPreviewItem({
    //   //     path: alb,
    //   //     id: `albumPreview-${num}`,
    //   //     url: this.mainUrl.value
    //   //   }) : '';
    //   // }) : '';
    // }
    this.mainUrl.onblur= () => {
      // alert('blur')
      if(!this.mainUrl.value) return;
      new AlbumPreviewItem({
        path: alb,
        id: `albumPreview-${num}`,
        url: this.mainUrl.value,
        spoiler: this.mainUrl.parentNode.nextElementSibling.nextElementSibling.children[0].checked
      });
      // this.mainUrl.value ? fetch(this.mainUrl.value).then(res => {
      //   if(!res.status) return;
      //   console.log(res.status)
      //   res.status === 200 ? new AlbumPreviewItem({
      //     path: alb,
      //     id: `albumPreview-${num}`,
      //     url: this.mainUrl.value
      //   }) : '';
      // }) : '';
    }
    this.mainUrl.onpaste= (e) => {
      if(!e.type === 'paste') return;
      // e.preventDefault();
      // if(!e.clipboardData.getData('text') === '') return;
      if(!Object.keys(e.clipboardData.files).length > 0){
        console.log('Paaaaste link');
        // this.mainUrl.focus();
        this.mainUrl.value = e.clipboardData.getData('text');
        // this.mainUrl.focus();
        this.mainUrl.blur();
        return;
      }else
      {
        // console.log(e.clipboardData.files[0])
        console.log('Paaaaste file');
        // this.mainUrl.focus();
        imgurUploader(e.clipboardData.files[0], this.mainUrl);
      }
    }
    this.cont1.appendChild(this.mainUrl);
    // addBefore ? path.insertBefore(this.mainUrl, addBefore) : path.appendChild(this.mainUrl);
    //

    // this.mainName=document.createElement('label');
    // this.mainName.className='input-label';
    // this.mainName.for=`albumUrl-${num}`;
    // this.mainName.textContent=`URL ${num}`;
    // this.cont1.appendChild(this.mainName);
    // new NewLine(this.mainName);
    // addBefore ? path.insertBefore(this.mainName, addBefore) : path.appendChild(this.mainName);
    // new NewLine(this.mainName);

    this.cont2=document.createElement('div');
    this.cont2.className='contText';
    addBefore ? path.insertBefore(this.cont2, addBefore) : path.appendChild(this.cont2);

    this.mainText=document.createElement('input');
    this.mainText.className='input text';
    this.mainText.id=`albumText-${num}`;
    this.mainText.type='text';
    this.cont2.appendChild(this.mainText);
    // addBefore ? path.insertBefore(this.mainText, addBefore) : path.appendChild(this.mainText);
    //
    // this.mainName=document.createElement('label');
    // this.mainName.className='input-label';
    // this.mainName.for=`albumText-${num}`;
    // this.mainName.textContent=`TEXT ${num}`;
    // this.cont2.appendChild(this.mainName);
    // new NewLine(this.mainName);
    // addBefore ? path.insertBefore(this.mainName, addBefore) : path.appendChild(this.mainName);
    // new NewLine(this.mainName);
    this.cont3=document.createElement('div');
    this.cont3.className='contSpoiler';
    addBefore ? path.insertBefore(this.cont3, addBefore) : path.appendChild(this.cont3);

    this.spoilerImage=document.createElement('input');
    this.spoilerImage.className='input spoiler';
    this.spoilerImage.id=`albumSpoiler-${num}`;
    this.spoilerImage.type='checkbox';
    this.spoilerImage.onchange=() => {
      if(!this.mainUrl.value) return;
      new AlbumPreviewItem({
        path: alb,
        id: `albumPreview-${num}`,
        url: this.mainUrl.value,
        spoiler: this.spoilerImage.checked
      });
    }
    this.cont3.appendChild(this.spoilerImage);

    this.spoilerImageLabel=document.createElement('label');
    this.spoilerImageLabel.className='label';
    this.spoilerImageLabel.for=`albumSpoiler-${num}`;
    this.spoilerImageLabel.textContent='Спойлер?';
    this.cont3.appendChild(this.spoilerImageLabel);
  }
}

class AlbumPreviewItem {
  constructor({path, id, url, spoiler}){
    if(!document.getElementById(id)){
      this.mask=document.createElement('div');
      spoiler ? this.mask.className='albumPreview-mask spoiler' : this.mask.className='albumPreview-mask';
      this.mask.id=id;
      path.appendChild(this.mask);

      this.img=document.createElement('img');
      this.img.className='albumPreview-img';
      this.img.src=url;
      console.log('UPD', this.img.src)
      this.img.onerror= () => {
        this.img.src='https://i.imgur.com/ymAqNjU.png';
        this.img.onerror = null;
      }
      this.mask.appendChild(this.img);
      return;
    }else
    {
      // alert('P2')
      this.mask=document.getElementById(id);
      spoiler ? this.mask.className='albumPreview-mask spoiler' : this.mask.className='albumPreview-mask';
      // console.log('Mask:', this.mask)
      this.mask.children[0].src=url;
      // console.log('UPD2', this.mask.children[1].src)
      this.mask.children[0].onerror= () => {
        this.img.src='https://i.imgur.com/ymAqNjU.png';
        this.img.onerror = null;
      }
    }
  }
}

function imgurUploader(file, input, token){
  let formdata = new FormData()
  formdata.append("image", file)
  fetch("https://api.imgur.com/3/image", {
    method: "post",
    headers: {
        Authorization: `Bearer ${token}`
    },
    body: formdata
  }).then(data => data.json()).then(data => {
    console.log(data)
    if(data.status === 200){
      // alert(data.data.link)
      input.value = data.data.link;
      input.blur();
    }else
    input.blur();
    // img.src = data.data.link
    // url.innerText = data.data.link
  })

}
 
})();
