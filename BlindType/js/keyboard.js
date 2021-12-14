
class Key
{
    constructor(name,upper){
      //console.log(name);
      let css_class = "keyboard-item keyboard-square-item";
      if (name[0]=="$") {
        name=name.slice(1);
        css_class = "keyboard-item keyboard-grow-item";
      }
      //console.log(name);
      this.isColor = false;
      this.isBorder = false;
      this.lower = name;
      this.upper = upper

      this._lower = [];
      this._upper = [];

      this.dom = document.createElement("div");
      this.dom.setAttribute("class", css_class);
      this.content = document.createElement("div");
      this.content.setAttribute("class","keyboard-item-content");
      this.content.innerHTML = name.toUpperCase();
      this.dom.appendChild(this.content);
    }
    setColor(char){
      this.color = colors_set.get(char);
      if (this.color!='#fff988ff') {
        this.sub_color = this.color;
      }else{
        this.sub_color = '#9999';
      }
    }
    addLayoyt(lowerValue, upperValue){
      //this._layouts
      this._lower.push(lowerValue);
      this._upper.push(upperValue);

    }
    setBorder(){
      this.isBorder = true;
      if (this.isColor) {
        // this.dom.style.boxShadow = "inset 0px 0px 0px 2px #fff,0px 0px 0px 3px #9999"//+this.color;
        this.dom.style.boxShadow = "inset 0px 0px 0px 2px #fff,0px 0px 0px 3px"+this.sub_color;

      }else{
        this.dom.style.boxShadow = "0px 0px 5px 1px #696";
      }
    }
    removeBorder(){
      this.isBorder = false;
      this.dom.style.boxShadow = "0px 0px 5px 1px #0002";
    }
    press(){
      this.dom.style.background = "#0002";
    }
    unPress(){
      if (!this.isColor) {
        this.dom.style.background = "none";
      }else{
        this.dom.style.background = this.color;
      }
    }
    showColor(){
      this.dom.style.background = this.color;
      this.isColor = this.color==null?false:true;
      //console.log(this.color);
      if (this.isBorder) {
        this.setBorder();
      }
    }
    hideColor(){
      this.isColor = false;
      this.dom.style.background = "none";
      if (this.isBorder) {
        this.setBorder();
      }
    }
    toUpper(){
      //console.log(this.upper);
      if (this.upper!=null) {
        this.content.innerHTML = this.upper;
      }
    }
    toLower(){
      this.content.innerHTML = this.lower;
    }
}

var svg_palette  =`
<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
  <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
</svg>

`
var svg_quest =
`
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-patch-question" viewBox="0 0 16 16">
  <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
  <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
</svg>
`
var svg_hand =
`
<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-fingerprint" viewBox="0 0 16 16">
  <path d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z"/>
  <path d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332c0 .409-.022.816-.066 1.221A.5.5 0 0 1 6 8.447c.04-.37.06-.742.06-1.115V7Zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8Zm-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329Z"/>
  <path d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334Zm.3 1.67a.5.5 0 0 1 .449.546 10.72 10.72 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.72 9.72 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z"/>
  <path d="M3.902 4.222a4.996 4.996 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 3.996 3.996 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556Zm6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705ZM3.68 5.842a.5.5 0 0 1 .422.568c-.029.192-.044.39-.044.59 0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.531 6.531 0 0 0 3.058 7c0-.25.019-.496.054-.736a.5.5 0 0 1 .568-.422Zm8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.51 10.51 0 0 0 .584-2.678.5.5 0 0 1 .54-.456Z"/>
  <path d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865Zm-.89 1.257a.5.5 0 0 1 .04.706A5.478 5.478 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346Zm12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49Z"/>
</svg>
`

class SettingsPanel
{
  constructor(cssClass){
    this.dom = dce("div",cssClass);
  }
  addBtn(innerHTML,callback){
    let btn = dce("div","keyboard-settings-btn");
    btn.innerHTML = innerHTML;
    btn.onclick = callback;
    this.dom.appendChild(btn);
  }
}

class KeyBoard
{
  constructor(_alph){


    this.dom = dce("div","keyboard");// document.getElementById("keyboard");
    this.clear();

    this.container = document.getElementById("keyboard");
    this.container.appendChild(this.dom);

    this.isColor = false;
    this.colors_ = [];

    this.hangsImg;
    //console.log(this._alph);
    //this._alph
    this.lat_alphabet = _alph[0];
    this.lat_alphabet_UPPER = _alph[1];

    this.alphabet = [];
    this.alphabet_UPPER = [];

    this.keys = new Map();
    this.keys_upper = new Map();

    this.before_key = null;

    this.servKeys = new Map();
    this.servKeys.set('ShiftRight','$RSHIFT');
    this.servKeys.set('ShiftLeft','$LSHIFT');
    this.servKeys.set('Space','$SPACE');
    this.servKeys.set('Tab','$TAB');
    this.servKeys.set('CapsLock','$CAPS');
    this.servKeys.set('Enter','$ENTER');
    this.servKeys.set('Backspace','←');

    this.initAlphabet();
    //this.initAlphabets();
    this.initDom();
    this.initSettingsPanel();
    this.handleShiftDown();
    this.hide();
    this.curLayout = 0;
  }
  clear(){
    document.getElementById("keyboard").innerHTML = "";

  }
  show(){
    this.dom.style.display = "inline-block";
  }
  hide(){
    this.dom.style.display = "none";
  }
  initAlphabet(){
    for (var i = 0; i < this.lat_alphabet.length; i++) {
      this.alphabet.push([]);
      this.alphabet_UPPER.push([]);
      this.colors_.push([]);
      for (var j = 0; j < this.lat_alphabet[i].length; j++) {
        this.alphabet[i].push(this.lat_alphabet[i][j]);
        this.alphabet_UPPER[i].push(this.lat_alphabet_UPPER[i][j]);
        this.colors_[i].push(colors[i][j]);
        //this.addKey(i, this.lat_alphabet[i][j], this.lat_alphabet_UPPER[i][j]);
      }
    }
    this.addServKeys(1,"$TAB");
    this.addServKeys(2,"$CAPS","$ENTER");
    this.addServKeys(3,"$LSHIFT","$RSHIFT");
    this.addServKeys(4,"$SPACE");

    //console.log(this.alphabet_UPPER);
  }
  addServKeys(line_lvl, leftK, rightK)
  {
    if (line_lvl >= this.alphabet.length) {
      this.alphabet.push([]);
      this.alphabet_UPPER.push([]);
      this.colors_.push([]);

      this.alphabet[line_lvl].push(leftK);
      this.alphabet_UPPER[line_lvl].push(null);
      this.colors_[line_lvl].push(null);
      return;
    }

    if (leftK){
      this.alphabet[line_lvl].unshift(leftK);
      this.alphabet_UPPER[line_lvl].unshift(null);
      this.colors_[line_lvl].unshift(null);
    }
    if (rightK){
      this.alphabet[line_lvl].push(rightK);
      this.alphabet_UPPER[line_lvl].push(null);
      this.colors_[line_lvl].push(null);
    }
  }
  addKey(line_lvl, lowerK, upperK){
    this.alphabet[line_lvl].push(lowerK);
    this.alphabet_UPPER[line_lvl].push(upperK);
  }
  initDom(){
    for (var i = 0; i < this.alphabet.length; i++) {
      let line = document.createElement("div");
      line.setAttribute("class","flex-row keyboard-hide-block");
      for (var j = 0; j < this.alphabet[i].length; j++) {
        let key = new Key(this.alphabet[i][j],this.alphabet_UPPER[i][j]);
        key.setColor(this.colors_[i][j]);
        //console.log(this.colors_[i][j],key.color);
        line.appendChild(key.dom);
        this.keys.set(this.alphabet[i][j],key);
        this.keys_upper.set(this.alphabet_UPPER[i][j],key);
        //console.log(this.alphabet[i][j],this.alphabet_UPPER[i][j]);
      }
      this.dom.appendChild(line);
    }
    let line = document.createElement("div");
    line.setAttribute("class","flex-row");
    this.dom.appendChild(line);
    this.container.onmouseenter = this.showSettings.bind(this);
    this.container.onmouseleave = this.hideSettings.bind(this);

    this.settingsPanelCrutch = dce("div","keyboard-settings-panel-crutch");

    this.settingsPanel = new SettingsPanel("keyboard-settings-panel flex-row");
    this.settingsPanelCrutch.appendChild(this.settingsPanel.dom);
    this.container.appendChild(this.settingsPanelCrutch);
    //this.dom.appendChild(this.settingsPanel);
    this.hangsImg = dce("div","keyboard-hands-img");
    this.dom.appendChild(this.hangsImg);
  }
  initSettingsPanel(){
    this.settingsPanel.addBtn(svg_palette,this.toggleColor.bind(this));
    this.settingsPanel.addBtn(svg_hand,this.showHands.bind(this));
    this.settingsPanel.addBtn(svg_quest,this.showInstruction.bind(this));
  }
  showSettings(){
    //console.log("in");
    //this.settingsPanel.style.bottom = '0px';
    //this.settingsPanel.style.opacity = '1';
    this.settingsPanelCrutch.style.height = '100px';

  }
  hideSettings(){
    //console.log("out");
    //this.settingsPanel.style.bottom = '20px';
    //this.settingsPanel.style.opacity = '0';
    this.settingsPanelCrutch.style.height = '0px';

  }
  showInstruction(){
    //console.log("in");
    let div = dce('div');
    div.innerHTML = `<div style = "width:30px; height:30px; background:#000;"></div>`;
    mBox.initMessage(
      'Инструкция',
      [
        ["Начальная расстановка пальцев на клавишах:"],
        ["-левая рука: ФЫВА/ASDF"],
        ["-правая рука: ОЛДЖ/JKL:"],
        ["Соответствие пальцев и клавиш можно установить влючив подсказки."],
      ]
    );
  }
  showHands(){
    this.areHandsShowed = !this.areHandsShowed;
    if (this.areHandsShowed) {
      this.hangsImg.style.opacity = 1;
    }else{
      this.hangsImg.style.opacity = 0;
    }
  }
  toggleColor(){
    this.isColor = !this.isColor;
    //console.log(  this.isColor);
    if (this.isColor) {
      for (var i = 0; i < this.alphabet.length; i++) {
        for (var j = 0; j < this.alphabet[i].length; j++) {
          //array[i]
          this.keys.get(this.alphabet[i][j]).showColor();
        }
      }
    }else{
      for (var i = 0; i < this.alphabet.length; i++) {
        for (var j = 0; j < this.alphabet[i].length; j++) {
          //array[i]
          this.keys.get(this.alphabet[i][j]).hideColor();
        }
      }
    }
  }
  setCurrent(val)
  {
    //console.log(this.keys.get(val));
    this.servKeyOff("$LSHIFT");
    this.servKeyOff("$RSHIFT");
    try {
      if (val == ' ') {
        val = "$SPACE";
      }
      if (this.prevKey!=null) {
        this.prevKey.removeBorder();
      }
      if (this.keys.get(val)) {
        this.prevKey = this.keys.get(val);
      }else if (this.keys_upper.get(val)) {
        this.prevKey = this.keys_upper.get(val);
        //console.log(this.keys_upper.get(val));
        this.servKeyOn("$LSHIFT");
      }
      this.prevKey.setBorder();
    } catch (e) {

    } finally {

    }
  }
  servKey(key){
    //console.log(key);
    return{
      on: this.keys.get(key).setBorder(),
      off: this.keys.get(key).removeBorder()
    }
  }
  servKeyOn(key){
    this.keys.get(key).setBorder();
  }
  servKeyOff(key){
    this.keys.get(key).removeBorder();
  }
  handleShiftUp(){
    //console.log(this);
    for (var i = 0; i < this.alphabet.length; i++) {
      for (var j = 0; j < this.alphabet[i].length; j++) {
        //array[i]
        this.keys.get(this.alphabet[i][j]).toUpper();
      }
    }
  }
  handleShiftDown(){
    for (var i = 0; i < this.alphabet.length; i++) {
      for (var j = 0; j < this.alphabet[i].length; j++) {
        //array[i]
        this.keys.get(this.alphabet[i][j]).toLower();
      }
    }
    // for (var i = 0; i < this.alphabet[0].length; i++) {
    //   this.keys.get(this.alphabet[0][i]).toLower();
    // }
  }
  pressKey(key,code){
    //console.log(key,code);
    //console.log(this.keys,this.keys_upper);
    try {
      if (this.servKeys.get(code)) {
        this.keys.get(this.servKeys.get(code)).press();
        if (code == "ShiftLeft" || code == "ShiftRight") {
          this.handleShiftUp();
          //console.log(this.handleShift().down);
        }
      }else{
        if (this.keys.get(key)) {
            this.keys.get(key).press();
            return;
        }
        this.keys_upper.get(key).press();
      }
    } catch (e) {

    }
  }
  unPressKey(key,code){
    try {
      if (this.servKeys.get(code)) {
        this.keys.get(this.servKeys.get(code)).unPress();
        if (code == "ShiftLeft" || code == "ShiftRight") {
          this.handleShiftDown();
        }
      }else{
        if (this.keys.get(key)) {
            this.keys.get(key).unPress();
            return;
        }
        this.keys_upper.get(key).unPress();
      }
    } catch (e) {

    }
  }
}

let colors = [
  "01123445321110",
  "1234455321110",
  "12344553211",
  "1234455321",
];
let colors_set = new Map();
colors_set.set('0','#0000');
colors_set.set('1','#000faf5e');
colors_set.set('2','#ffc107bf');
colors_set.set('3','#ff000077');
colors_set.set('4','#fff988ff');
colors_set.set('5','#0707');


let lat_alphabet = [
      [
        "`1234567890-=←",
        "qwertyuiop[]\\",
        "asdfghjkl;'",
        "zxcvbnm,./"
      ],
      [
        "~!@#$%^&*()_+←",
        "QWERTYUIOP{}|",
        "ASDFGHJKL:\"",
        "ZXCVBNM<>?"
      ]
];

let cyr_alphabet = [
      [
        "ё1234567890-=←",
        "йцукенгшщзхъ\\",
        "фывапролджэ",
        "ячсмитьбю."
      ],
      [
        "Ё!\"№;%:?*()_\+\"←",
        "ЙЦУКЕНГШЩЗХЪ/",
        "ФЫВАПРОЛДЖЭ",
        "ЯЧСМИТЬБЮ,"
      ]
];

var keyboard_alphabets = {
  'cyr':cyr_alphabet,
  'lat':lat_alphabet
}
