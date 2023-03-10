let attachments = (cfg) => {
  return `
.dtf-attach.gif {
  max-width: ${cfg['attachments']['gif']['size']}px;
  max-height: ${cfg['attachments']['gif']['size']}px;
  display: inline-flex;
  position: relative;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
  cursor: pointer;
}
.dtf-attach.gif video {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.emoji {
  max-width: ${cfg['attachments']['emoji']['size']}px;
  max-height: ${cfg['attachments']['emoji']['size']}px;
  display: inline-flex;
  position: relative;
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
  max-width: ${cfg['attachments']['emoji gif']['size']}px;
  height: ${cfg['attachments']['emoji gif']['size']}px;
  display: inline-flex;
  position: relative;
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
  max-width: ${cfg['attachments']['sticker']['size']}px;
  max-height: ${cfg['attachments']['sticker']['size']}px;
  display: inline-flex;
  position: relative;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
}
.dtf-attach.sticker img {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.image {
  max-width: ${cfg['attachments']['image']['size']}px;
  max-height: ${cfg['attachments']['image']['size']}px;
  display: inline-flex;
  position: relative;
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
  display: block;
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
}`
};
