let linkConverterCSS = `
.linkConverter button {
  background-image: repeating-linear-gradient( 180deg, rgb(90 90 90) 0%, rgb(30 30 30) 50%, rgb(90 90 90) 100% );
  background-color: rgb(0 0 0);
  color: rgb(215 212 212);
  margin: 0px auto 6px auto;
  padding: 1px 3px 1px 3px;
  font-size: 13px;
  border-radius: 3px;
  box-shadow: inset 0 0 2px 0px rgb(255 255 255);
}
.linkConverter button:hover {
  filter: brightness(1.1);
}

.linkConverter form {
  display: flex;
  flex-direction: row;
  gap: 5px 5px;
  margin: 0 0 5px 0;
}

.linkConverter .mask {
  display: flex;
  width: 150px;
  height: 150px;
  margin: auto;
  padding: 3px;
  border-radius: 2px;
  box-shadow: 0px 0px 2px 0px rgb(255 255 255);
}

.linkConverter video {
  max-width: 150px;
  max-height: 150px;
  margin: auto;
}
.linkConverter .image {
  max-width: 150px;
  max-height: 150px;
}
.linkConverter .sticker {
  max-width: 120px;
  max-height: 120px;
}
.linkConverter .emoji {
  max-width: 30px;
  max-height: 30px;
}`;
