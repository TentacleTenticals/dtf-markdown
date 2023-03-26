let attachmentsCSS = (cfg) => {
  return `
.dtf-comment.text {
  display: inline;
  padding: unset;
  margin: unset;
}
.dtf-attach.spoiler {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 5px 2px;
  box-shadow: 0 0 3px 0px rgb(0 0 0);
}
.dtf-attach.spoiler * {
  /*pointer-events: none;*/
}
.dtf-attach.spoiler::before {
  display: inline;
  content: 'SP ⤵️';
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  padding: 0 5px 0 5px;
  margin: 0 5px 0 0;
  border-radius: 8px;
  cursor: pointer;
}
.dtf-attach.spoiler.opened::before {
  content: 'SP ⤴️';
}
.dtf-attach.spoiler:hover::before {
  filter: brightness(1.2);
}

.dtf-attach.spoiler:not(.opened) .dtf-comment.text {
  background-color: ${cfg['attachments']['spoiler']['closed']['background']['text']};
  border-radius: 3px;
  color: transparent;
  user-select: none;
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['text']}px);
}
.dtf-attach.spoiler:not(.opened) .dtf-attach.link {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['link']}px) brightness(0.3);
}

.dtf-attach.spoiler:not(.opened) .dtf-attach.image img {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['image']}px);
}

.dtf-attach.spoiler:not(.opened) .dtf-attach:is(.emoji, .emojiGif) :is(img, video) {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['emoji']}px);
}
.dtf-attach.spoiler .dtf-attach:is(.sticker, .stickerGif) :is(img, video) {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['sticker']}px);
}
.dtf-attach.spoiler:not(.opened) .dtf-attach.gif video {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['gif']}px);
}

.dtf-attach.spoiler:not(.opened) .dtf-attach.video video {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['video']}px);
}

.dtf-attach.spoiler:not(.opened) .album {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['album']}px) brightness(0.3);
}

.dtf-attach.spoiler:not(.opened) .dtf-attach.embed.yt .mediaStarter {
  backdrop-filter: brightness(0.1) blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['embeds']['Youtube']}px);
  opacity: 0.8;
}
.dtf-attach.spoiler:not(.opened) .dtf-attach.embed.yt iframe {
  filter: brightness(0.1) blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['embeds']['Youtube']}px);
  opacity: 0.8;
}
.dtf-attach.spoiler:not(.opened) .dtf-attach.embed.spt .mediaStarter {
  backdrop-filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['embeds']['Spotify']}px);
  opacity: 0.8;
}
.dtf-attach.spoiler:not(.opened) .dtf-attach.embed.spt iframe {
  filter: blur(${cfg['attachments']['spoiler']['closed']['attachments']['blur']['embeds']['Spotify']}px);
  opacity: 0.8;
}

.dtf-attach.spoiler.opened .dtf-comment.text {
  background-color: ${cfg['attachments']['spoiler']['opened']['background']['text']};
}

.dtf-commentText {
  display: inline-flex;
  display: inline;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  gap: 5px 2px;
  margin: unset;
  padding: unset;
}

.dtf-attach.link {
  background-color: rgb(249 249 249 / 60%);
  color: rgb(8 117 135);
  font-weight: 500;
  text-decoration: unset;
  padding: 0 5px 0 5px;
  border-radius: 2px;
  /* box-shadow: inset 0 0 6px 0px rgb(0 0 0); */
}
.dtf-attach.link::before {
  display: inline;
  content: '🔗';
  color: rgb(0 0 0);
  padding: 0 3px 0 3px;
  margin: 0 3px 0 0;
  border-radius: 10px;
  box-shadow: inset 0 0 6px 0px rgb(0 0 0);
}
.dtf-attach.link:hover {
  filter: brightness(1.2);
}

.dtf-attach.embed {
  display: inline-flex;
  position: relative;
  background-position: center !important;
  background-size: cover;
  background-repeat: no-repeat !important;
  aspect-ratio: 1/0.5;
  overflow: hidden;
  box-shadow: 0 0 3px 1px rgb(0 0 0);
}
.dtf-attach.embed.yt {
  background-color: rgb(0 0 0);
  background-image: url(https://i.imgur.com/m8F3Dgo.png);
  background-size: 97%;
  width: ${cfg['attachments']['size']['embeds']['Youtube']}px;
}
.dtf-attach.embed.yd {
  background-color: rgb(0 0 0);
  background-image: url(https://i.imgur.com/dAnyh1P.png);
  background-size: cover;
  width: ${cfg['attachments']['size']['embeds']['Yandex']}px;
}
.dtf-attach.embed.yd .mediaStarter::before {
  display: inline;
  color: rgb(255 255 255);
  padding: 1px 0 0 5px;
  font-size: 15px;
  font-family: 'Roboto Flex', sans-serif;
}
.dtf-attach.embed.yd.track .mediaStarter::before {
  content: 'TRACK';
}
.dtf-attach.embed.yd.album .mediaStarter::before {
  content: 'ALBUM';
}
.dtf-attach.embed.spt {
  background-color: rgb(0 0 0);
  background-image: url(https://i.imgur.com/zaX2aMO.png);
  background-size: 98%;
  width: ${cfg['attachments']['size']['embeds']['Spotify']}px;
  border-radius: 15px;
  aspect-ratio: 1/0.422;
}
.dtf-attach.embed.spt .mediaStarter {
  border-radius: 15px;
}
.dtf-attach.embed.spt .mediaStarter::before {
  display: inline;
  position: absolute;
  top: 0px;
  padding: 8px 0 0 10px;
  color: rgb(255 255 255);
  font-size: 15px;
  font-family: 'Roboto Flex', sans-serif;
}
.dtf-attach.embed.spt.track .mediaStarter::before {
  content: 'S';
}
.dtf-attach.embed.spt.playlist .mediaStarter::before {
  content: 'PL';
}
.dtf-attach.embed.spt.artist .mediaStarter::before {
  content: 'A';
}
.dtf-attach.embed.spt.album .mediaStarter::before {
  content: 'AL';
}
.dtf-attach.embed iframe {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
  border: unset;
  border-radius: 1px;
  box-shadow: 0 0 3px 1px rgb(255 255 255);
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

.dtf-attach.video {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['video']}px;
  max-height: ${cfg['attachments']['size']['video']}px;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
  cursor: pointer;
}
.dtf-attach.video video {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.dtf-attach.emoji {
  display: inline-flex;
  position: relative;
  max-width: ${cfg['attachments']['size']['emoji']}px;
  max-height: ${cfg['attachments']['size']['emoji']}px;
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

.dtf-attach.playing .mediaStarter {
  display: none;
}

.mediaStarter {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 40%);
  position: absolute;
  /* justify-content: center; */
  align-items: center;
  z-index: 10;
  cursor: pointer;
}
.mediaStarter .btn {
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
.mediaStarter .btn img {
  width: 35%;
  margin: 0px 0px 0px 10%;
}
.dtf-attach.gif:hover .mediaStarter .btn {
  background-color: rgb(255 0 0);
}
.dtf-attach.embed.yt:hover .mediaStarter .btn {
  background-color: rgb(255 0 0);
}
.dtf-attach.embed.spt:hover .mediaStarter .btn {
  background-color: rgb(255 0 0);
}
.dtf-attach.embed.yd:hover .mediaStarter .btn {
  background-color: rgb(255 0 0);
}

.dtf-attach.playing .mediaStarter {
  display: none;
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
