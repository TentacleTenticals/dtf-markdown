let mainCSS = `
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Teko&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,400;1,400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sofia+Sans+Semi+Condensed:wght@400;500;600;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;500;600;700&display=swap');

.dtf-window.commentsPreviewer {
  width: 100%;
}
.dtf-window.commentsPreviewer .preview {
  color: rgb(255 255 255);
  padding: 0 3px 3px 3px;
}

.dtf-albumBuilder.container {
  display: flex;
  flex-direction: column;
}

.dtf-markdownPanel {
  width: 100%;
  position: relative;
  background-color: black;
  padding: 2px 1px 2px 1px;
  display: flex;
  gap: 0 0;
}
.dtf-markdownPanel .button {
  background-color: rgb(37 54 72);
  /* background-image: repeating-linear-gradient(180deg, rgb(37 54 72), rgb(56 56 56) 100%); */
  color: rgb(255, 255, 255);
  /* margin: 1px; */
  padding: 0 3px 0 3px;
  text-align: center;
  font-family: 'Fira Sans Condensed';
  min-width: 20px;
  border-radius: 2px;
  margin: 2px;
  border: unset;
  box-shadow: inset 0 0 3px 0px rgb(255 255 255);
  cursor: pointer;
}
.dtf-markdownPanel .button:hover {
  background-color: rgb(80 80 80);
}

.typeList .groupType {
  text-align: center;
  color: rgb(197 197 197);
  font-size: 13px;
  padding: 3px 0px 3px 0px;
  margin-top: 5px;
  border: 1px solid rgb(70 70 70);
  font-family: 'Raleway', sans-serif;
}
.typeList .groupType .title {
  cursor: pointer;
}

:is(.emojiPicker .groupList, .dtf-albumBuilder form, .albumMini .list, .albumMini
    .mask.picked, .gifSearcher .list, .ui-autocomplete)::-webkit-scrollbar {
  width: 17px;
  background: unset;
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .albumMini .list, .albumMini
    .mask.picked, .gifSearcher
    .list, .ui-autocomplete)::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .albumMini .list, .albumMini
    .mask.picked, .ui-autocomplete)::-webkit-scrollbar-track-piece {
  background-color: unset;
  border: 3px solid rgba(155, 105, 105, 0);
  border-radius: 0px;
  width: 1px;
  height: 1px;
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .albumMini .list, .albumMini
    .mask.picked, .gifSearcher
    .list, .ui-autocomplete)::-webkit-scrollbar-thumb {
  border: 5px solid transparent;
  border-radius: 18px;
  box-shadow: inset 0px 0px 0px 1px rgb(41 206 145 / 12%),
    inset 0px 0px 5px 1px rgb(135 185 249 / 60%),
    inset 0px 0px 0px 1px rgb(41 206 145 / 12%);
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .albumMini .list, .albumMini
    .mask.picked, .gifSearcher
    .list, .ui-autocomplete)::-webkit-scrollbar-corner {
  background-color: unset;
}

.buttonPanel button {
  display: inline-flex;
  width: max-content;
  height: max-content;
  min-width: 15px;
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  line-height: normal;
  padding: unset;
  aspect-ratio: 1/1;
  border: unset;
  border-radius: 50%;
  box-shadow: 0 0 2px 1px rgb(255 255 255);
  cursor: pointer;
}
.buttonPanel button .label {
  margin: auto;
  font-size: 10px;
}

.search {
  margin: auto;
  background-color: black;
  color: white;
  border: unset;
  box-shadow: inset 0px 0px 3px 1px rgb(117 49 120);
  border-radius: 3px;
  outline: none;
}

`;
