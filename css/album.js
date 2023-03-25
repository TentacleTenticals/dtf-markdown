let albumCSS = (cfg) => {
  return `
.album:is(:not(.preview), .preview) {
  background: black;
  width: max-content;
  height: max-content;
  margin: 5px 5px 5px 5px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0px 0px 3px 1px rgb(165 214 247);
}
.album:is(:not(.preview), .preview) .header {
  display: flex;
  flex-direction: column;
  background-color: rgb(40 40 40);
  position: relative;
  width: calc(100% - 9px);
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  padding: 0px 0px 2px 0px;
  margin: 5px auto 0px auto;
  box-shadow: 0px 0px 2px 0px rgb(255 255 255);
}
.album:is(:not(.preview), .preview) .header .num {
  position: absolute;
  top: 1px;
  left: 1px;
  background-color: rgb(0 0 0);
  padding: 1px 8px 3px 4px;
  font-size: 12px;
  border-radius: 0px 10px 3px 0px;
  box-shadow: inset 0px 0px 3px 2px rgb(104 29 67);
}
/* .album:is(:not(.preview), .preview) .header .label {
  display: flex;
  background-color: rgb(16 44 52);
  width: max-content;
  padding: 0px 10px 0px 10px;
  text-align: center;
  margin: auto;
  z-index: 10;
} */
.album:is(:not(.preview), .preview) .header .label {
  font-size: 13px;
  font-family: 'Chakra Petch', sans-serif;
  letter-spacing: 0.5px;
}
/* .album:is(:not(.preview), .preview) .header .label::before {
  display: inline;
  content: '';
  color: black;
  border: 1px solid rgb(185 0 87);
  top: 10px;
  left: -10px;
  width: 50px;
  height: 1px;
  position: relative;
}
.album:is(:not(.preview), .preview) .header .label::after {
  display: inline;
  content: '';
  color: black;
  border: 1px solid rgb(185 0 87);
  top: 10px;
  right: -10px;
  width: 50px;
  height: 1px;
  position: relative;
} */
.album:is(:not(.preview), .preview) .header .label::before {
  display: inline-block;
  content: '';
  color: black;
  top: -4px;
  left: -10px;
  width: 20%;
  height: 1px;
  position: relative;
  box-shadow: 0px 0px 1px 1px rgb(185 0 87);
}
.album:is(:not(.preview), .preview) .header .label::after {
  display: inline-block;
  content: '';
  color: black;
  top: -4px;
  right: -10px;
  width: 20%;
  height: 1px;
  position: relative;
  box-shadow: 0px 0px 1px 1px rgb(185 0 87);
}
.album .list {
  display: grid;
  background-color: ${cfg['album']['list']['background']};
  height: 105px;
  grid-template-columns: repeat(3, calc(${cfg['album']['items']['size']}px + ${cfg['album']['items']['padding']}px * 2));
  padding: 5px 6px 5px 6px;
  gap: 5px 10px;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
}
.album:is(:not(.preview)) .list {
  grid-template-columns: repeat(4, calc(${cfg['album']['items']['size']}px + ${cfg['album']['items']['padding']}px * 2));
}

.album:is(:not(.preview), .preview) :is(.mask, .mask.spoiler) {
  flex-direction: column;
  width: ${cfg['album']['items']['size']}px;
  height: ${cfg['album']['items']['size']}px;
  display: flex;
  background: rgb(0, 0, 0);
  /* border-radius: 3px; */
  padding: ${cfg['album']['items']['padding']}px;
  box-shadow: 0px 0px 2px 1px rgb(225 71 152);
  scroll-snap-align: center;
  cursor: pointer;
}
.album:is(:not(.preview), .preview) .mask.spoiler:not(.picked) img {
  filter: blur(10px);
}
.album:is(:not(.preview), .preview) .mask.spoiler:not(.picked):hover img {
  filter: none;
}
.album:is(:not(.preview), .preview) .mask.spoiler:not(.picked):hover::after {
  display: none;
}
.album:is(:not(.preview), .preview) .mask.spoiler:not(.picked)::after {
  display: block;
  content: 'SPOILER';
  color: white;
  background: black;
  width: 100px;
  position: absolute;
  text-align: center;
  z-index: 2;
  margin-top: 40px;
  box-shadow: inset 0px 0px 20px 0px rgb(102 102 102);
}

.album:is(:not(.preview), .preview) :is(.mask, .mask.spoiler) .buttonPanel {
  position: absolute;
  display: flex;
  width: 100px;
  padding: 2px 0px 2px 0px;
  background-color: rgb(0 0 0 / 60%);
  z-index: 2;
  opacity: 0;
  line-height: 0;
  gap: 0px 5px;
  cursor: default;
}
.album:is(:not(.preview), .preview)
  :is(.mask, .mask.spoiler)
  .buttonPanel:hover {
  opacity: 1;
}

.album:is(:not(.preview), .preview) .mask img {
  max-width: calc(100px - 6px);
  max-height: calc(100px - 6px);
  position: relative;
  margin: auto;
  transform-origin: 0% 0%;
}

.album:is(:not(.preview), .preview) .mask.picked {
  width: 70%;
  height: 99.3%;
  top: 0px;
  left: 15%;
  position: fixed;
  display: flex;
  overflow: auto;
  z-index: 11;
}
.album:is(:not(.preview), .preview) .mask.picked img {
  max-width: unset;
  max-height: unset;
}`;
}
