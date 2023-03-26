let albumBuilderCSS = `
.dtf-albumBuilder .btn {
    background-image: repeating-linear-gradient(180deg, rgb(90 90 90) 0%, rgb(30 30 30) 50%, rgb(90 90 90) 100%);
    background-color: rgb(0 0 0);
    color: rgb(215 212 212);
    margin: 0px auto 6px auto;
    padding: 1px 3px 1px 3px;
    font-size: 13px;
    border-radius: 3px;
    box-shadow: inset 0 0 2px 0px rgb(255 255 255);
}
.dtf-albumBuilder .btn:hover {
  filter: brightness(1.1);
}

.dtf-albumBuilder .form {
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 0 0 10px 0;
  max-height: 199px;
  overflow-y: auto;
  gap: 5px 5px;
  border-radius: 3px;
  box-shadow: 0 0 2px 0px rgb(255 255 255);
}

.dtf-albumBuilder .input:is(.url, .text) {
  border: 1px solid rgb(100 100 100);
  border-radius: 3px;
  box-shadow: 0px 1px rgb(0 0 0);
  width: calc(100% - 6px);
}

.dtf-albumBuilder .container {
  display: flex;
  flex-direction: column;
  padding: 3px;
  gap: 5px 5px;
  box-shadow: 0px 0px 2px 1px rgb(255 255 255);
}

/* .dtf-albumBuilder .contText {
  margin: 2px 0px 0px 0px;
} */
/* .dtf-albumBuilder .contSpoiler {
  margin: 0px 0px 4px 0px;
} */
.dtf-albumBuilder .contSpoiler .label {
  position: relative;
  top: -2px;
  color: white;
  font-size: 13px;
  font-family: 'Play', sans-serif;
}
.dtf-albumBuilder .input:focus {
  outline: none;
}
.dtf-albumBuilder label.input-label {
  position: relative;
  color: rgb(255 255 255);
  font-size: 13px;
  font-family: 'Teko', sans-serif;
  top: -2px;
}

.dtf-albumBuilder .addInput {
  display: flex;
  margin: 0px 0px 6px 0px;
}
.dtf-albumBuilder .addInput button {
  margin: auto;
}`;
