let attachmentsCSS = (cfg) => {
  return `
.dtf-comment.text {
  display: inline;
  padding: unset;
  margin: unset;
}
.dtf-attach.spoiler {
  display: inline;
}
.dtf-attach.spoiler:not(.opened) .dtf-comment.text {
  background-color: rgb(0 0 0);
  border-radius: 3px;
}
.dtf-attach.spoiler:not(.opened) .dtf-attach.emoji img {
  filter: blur(10px);
}

.dtf-commentText {
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  gap: 5px 5px;
  /* display: inline; */
  margin: unset;
  padding: unset;
}

.dtf-attach.gif {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['gif']}px;
  max-height: ${cfg['attachments']['size']['gif']}px;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
  cursor: pointer;
}
.dtf-attach.gif video {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.emoji {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['emoji']}px;
  max-height: ${cfg['attachments']['size']['emoji']}px;
  top: 8px;
  margin-top: -8px;
  /* box-shadow: 0px 0px 3px 1px rgb(0 0 0); */
}
.dtf-attach.emoji img {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.emojiGif {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['emoji gif']}px;
  height: ${cfg['attachments']['size']['emoji gif']}px;
  top: 8px;
  margin-top: -8px;
  /* box-shadow: 0px 0px 3px 1px rgb(0 0 0); */
  cursor: pointer;
}
.dtf-attach.emojiGif video {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.sticker {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['sticker']}px;
  max-height: ${cfg['attachments']['size']['sticker']}px;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
}
.dtf-attach.sticker img {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.stickerGif {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['stickerGif']}px;
  max-height: ${cfg['attachments']['size']['stickerGif']}px;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
}
.dtf-attach.stickerGif video {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.image {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['image']}px;
  max-height: ${cfg['attachments']['size']['image']}px;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
}
.dtf-attach.image img {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.playing .gifStarter {
  display: none;
}

.gifStarter {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 40%);
  position: absolute;
  /* justify-content: center; */
  align-items: center;
  z-index: 10;
  /* cursor: pointer; */
}
.gifStarter .btn {
  display: flex;
  background-color: rgb(255 255 255);
  margin: 0 auto;
  height: 50%;
  max-height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  /* top: calc(50% - 50% / 2); */
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0);
  z-index: 1;
  /* cursor: pointer; */
}
.gifStarter .btn img {
  width: 35%;
  margin: 0px 0px 0px 10%;
}
.dtf-attach.gif:hover .gifStarter .btn {
  background-color: rgb(255 0 0);
}
.dtf-attach.gif::after {
  display: ${cfg['attachments']['gif']['show gif ico'] ? 'block' : 'none'};
  content: 'GIF';
  position: absolute;
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  font-size: 10px;
  right: 0;
  margin: 3px 3px 0px 0px;
  padding: 3px;
  border-radius: 3px;
  opacity: 0.5;
  box-shadow: 0px 0px 3px 0px rgb(255 255 255);
}`;
};
