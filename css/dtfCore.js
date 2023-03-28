let mainCSS = `
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap');

.dtf-window {
  display: flex;
  position: absolute;
  flex-direction: column;
  width: max-content;
  background-color: black;
  top: 100%;
  padding: 3px;
  margin: 5px 0 0 0;
  border-radius: 2px;
  box-shadow: 0px 0px 3px 0px rgb(0 0 0);
  z-index: 15;
}
.dtf-window .header {
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(54 43 43);
  border-radius: 2px;
  margin: 0 0 5px 0;
  box-shadow: inset 0px 0px 2px 0px rgb(173 171 171);
  cursor: pointer;
}
.dtf-window .header .label {
  font-size: 13px;
  font-family: 'Chakra Petch', sans-serif;
  letter-spacing: 0.5px;
}
.dtf-window .header .label::before {
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
.dtf-window .header .label::after {
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
`;
