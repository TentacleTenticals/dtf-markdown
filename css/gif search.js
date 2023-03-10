let gifSearch = `
.gifSearcher .header {
  background-color: rgb(255 255 255);
  color: black;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  padding: 2px 0px 1px 0px;
  line-height: 14px;
} */

.gifSearcher form {
  display: flex;
  gap: 0 5px;
}

.gifSearcher .preview {
  display: flex;
  width: 100%;
  height: 200px;
  margin: 6px 0 0 0;
  background-color: rgb(30 30 30);
  border-radius: 3px;
  box-shadow: 0px 0px 2px 0px rgb(255 255 255);
}

.gifSearcher .preview video {
  max-width: 100%;
  max-height: 200px;
  margin: auto;
}
.gifSearcher .preview :is(.image, .gif) {
  max-width: 100%;
  max-height: 200px;
}
.gifSearcher .preview :is(.sticker, .stickerGif) {
  max-width: 120px;
  max-height: 120px;
}
.gifSearcher .preview :is(.emoji, .emojiGif) {
  max-width: 30px;
  max-height: 30px;
}

.gifSearcher .list {
  display: grid;
  padding: 7px 12px 7px 4px;
  margin: 10px 0px 0px 0px;
  gap: 7px 7px;
  grid-template-columns: repeat(3, 106px);
  height: 200px;
  border-radius: 2px;
  overflow-y: auto;
  box-shadow: 0 0 2px 0px rgb(255 255 255);
}
.gifSearcher .list.default {
  display: block;
}
.gifSearcher .gifGroup .gifList {
  display: grid;
  padding: 0 6px 6px 6px;
  grid-template-columns: repeat(3, 106px);
  gap: 7px 7px;
}
.gifSearcher .gifGroup {
  background-color: rgb(44 44 44);
  border-radius: 2px;
}
.gifSearcher .gifGroup.hidden {
  height: 30px;
  overflow-y: hidden;
}

.gifSearcher .list .mask {
  display: flex;
  background-color: rgb(0 0 0);
  width: 100px;
  height: 100px;
  padding: 3px;
  box-shadow: 0px 0px 2px 1px rgb(255 255 255);
  cursor: pointer;
}
.gifSearcher .list .mask:focus {
  outline: none;
  box-shadow: 0px 0px 2px 1px rgb(255 25 189);
}
.gifSearcher .list .mask :is(img, video) {
  margin: auto;
  max-width: 97px;
  max-height: 97px;
}
.gifSearcher::after {
  display: block;
  position: absolute;
  top: calc(100% - 20px);
  content: '';
  width: calc(100% - 6px);
  height: 20px;
  box-shadow: inset 0 -10px 12px 0px rgb(0 0 0);
}

.gifSearcher .groupHeader {
  text-align: center;
  background-color: rgb(255 255 255);
  color: rgb(0 0 0);
  padding: 12px 0 8px 0;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 0px;
  text-transform: uppercase;
  font-family: 'Teko';
  border: 1px dashed rgb(0 0 0);
  /* box-shadow: inset 0px 0px 4px 0px rgb(0 0 0); */
  margin-bottom: 10px;
  cursor: pointer;
}
.gifSearcher .groupHeader:hover {
  background-color: rgb(185 249 245);
}

.gifSearcher .search {
  width: 100%;
  padding: 2px;
  border-radius: unset;
  /* border: 1px solid transparent; */
  box-shadow: inset 0 0 1px 1px rgb(53 109 116);
}

.gifSearcher select {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  font-family: 'Fira Sans Condensed';
  font-style: italic;
  outline: none;
  box-shadow: inset 0 0 2px 0px rgb(255 255 255);
}
.gifSearcher select optgroup {
  background-color: rgb(58 58 58);
  color: rgb(255 255 255);
  font-style: normal;
  font-weight: 300;
}
.gifSearcher select option {
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
}`;
