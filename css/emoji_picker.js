export let emojiPickerCSS = `
.emojiPicker .srch {
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  border: unset;
  border-radius: 2px;
  box-shadow: inset 0 0 5px 0px rgb(179 39 161);
}
.emojiPicker .srch::placeholder {
  color: rgb(173 173 173);
  font-size: 14px;
  font-weight: 700;
  font-family: 'Nunito Sans', sans-serif;
}

.emojiPicker select {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  margin: 3px 0 3px 0;
  text-align: center;
  font-family: 'Fira Sans Condensed';
  font-style: italic;
  text-transform: uppercase;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-shadow: inset 0 0 2px 0px rgb(255 255 255);
  cursor: pointer;
}
.emojiPicker select optgroup {
  background-color: rgb(58 58 58);
  color: rgb(255 255 255);
  font-style: normal;
  font-weight: 300;
}
.emojiPicker select option {
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  text-transform: none;
}

.emojiPicker .mode {
  display: flex;
  color: rgb(255 255 255);
  justify-content: center;
}

.emojiPicker .preview {
  display: flex;
  flex-direction: column;
  background-color: rgb(44 44 44);
  gap: 5px 0;
  box-shadow: 0 0 2px 0px rgb(255 255 255);
}
.emojiPicker .preview .emojiCmd {
  text-align: center;
  color: rgb(255 255 255);
  font-size: 15px;
  font-family: 'Raleway';
  box-shadow: inset 0 0 3px 0px rgb(160 217 255);
}
.emojiPicker .preview .mask {
  display: flex;
  background-color: rgb(0 0 0);
  width: 200px;
  height: 150px;
  padding: 3px;
  margin: auto;
}
.emojiPicker .preview .mask video {
  max-width: 40px;
  max-height: 40px;
  margin: auto;
}
.emojiPicker .preview .mask video.sticker {
  max-width: 140px;
  max-height: 140px;
  margin: auto;
}

.emojiPicker .field {
  display: block;
  position: relative;
  background: rgb(0, 0, 0);
  color: rgb(227 156 202);
  text-align: center;
  font-family: 'Play', sans-serif;
  width: 100%;
  height: 19px;
}

.emojiPicker .emojiGroup {
  background-color: rgb(0 0 0);
  padding: 3px;
  margin: 1px 1px 1px 1px;
  border-radius: 2px;
  box-shadow: 0px 0px 2px 1px rgb(137 137 137);
}
.emojiPicker .emojiGroup.hidden {
  display: none;
}

.emojiPicker .groupName {
  text-align: center;
  background-color: rgb(255 255 255);
  color: rgb(0 0 0);
  padding: 4px 0 0 0;
  margin: 0 0 6px 0;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  line-height: 12px;
  font-family: 'Teko', sans-serif;
  text-transform: uppercase;
  border: 1px dashed rgb(0 0 0);
  cursor: pointer;
}

.emojiPicker .groupList {
  display: flex;
  background-color: rgb(44 44 44);
  padding: 3px;
  margin: 5px 0 0 0;
  border-radius: 2px;
  gap: 10px 0px;
  max-height: 150px;
  overflow-y: scroll;
  flex-direction: column;
}
.emojiPicker .groupList.hidden {
  height: 0px;
}

.emojiPicker .emoji {
  max-width: 30px;
  max-height: 30px;
  position: relative;
  margin: auto;
}
.emojiPicker .emojiName {
  display: block;
  margin: auto 0px auto 0px;
  color: white;
  text-align: right;
  width: 80px;
}
.emojiPicker .emojiMask {
  width: 33px;
  height: 33px;
  display: flex;
  background: rgb(0, 0, 0);
  box-shadow: 0px 0px 2px 1px rgb(255 255 255);
}
.emojiPicker .emojiContainer {
  display: grid;
  grid-template-columns: repeat(2, auto);
  position: relative;
  justify-content: flex-end;
  border-right: 1px solid rgb(255 255 255);
}
.emojiPicker .groupType {
  padding: 3px;
}
.emojiPicker .emojiList {
  width: max-content;
  display: grid;
  grid-template-columns: repeat(6, 33px);
  padding: 1px 3px 5px 3px;
  gap: 5px 8px;
}
.emojiPicker .emojiList.hidden {
  display: none;
}`;
