// Vue.component('key-board-row', {
//   data: function () {
//     return {
//       count: 0
//     }
//   },
//   template: '<button v-on:click="count++">Счётчик кликов — {{ count }}</button>'
// })
//
//
// new Vue({
//
// })
class Key
{
    constructor(name){
      let css_class = "keyboard-item keyboard-square-item";
      if (name[0]=="$") {
        name=name.slice(1);
        css_class = "keyboard-item keyboard-grow-item";
      }
      this.dom = document.createElement("div");
      this.dom.setAttribute("class", css_class);
      this.content = document.createElement("div");
      this.content.setAttribute("class","keyboard-item-content");
      this.content.innerHTML = name.toUpperCase();
      this.dom.appendChild(this.content);
    }
    setBorder(){
      this.dom.style.boxShadow = "0px 0px 5px 1px #696";
    }
    removeBorder(){
      this.dom.style.boxShadow = "0px 0px 5px 1px #0002";
    }
    press(){
      this.dom.style.background = "#0002";
    }
    unPress(){
      this.dom.style.background = "none";
    }
}
class KeyBoard
{
  constructor(){
    this.dom = document.getElementById("keyboard");
    this.lat_alphabet = [
      "`1234567890-=←",
      "qwertyuiop[]\\",
      "asdfghjkl;'",
      "zxcvbnm,./"
    ];
    this.lat_alphabet_UPPER = [
      "~!@#$%^&*()_+←",
      "QWERTYUIOP{}|",
      "ASDFGHJKL:\"",
      "ZXCVBNM<>?"
    ];
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
    this.initDom();
  }
  initAlphabet(){
    for (var i = 0; i < this.lat_alphabet.length; i++) {
      this.alphabet.push([]);
      this.alphabet_UPPER.push([]);
      for (var j = 0; j < this.lat_alphabet[i].length; j++) {
        this.alphabet[i].push(this.lat_alphabet[i][j]);
        this.alphabet_UPPER[i].push(this.lat_alphabet_UPPER[i][j]);
      }
    }
    //this.alphabet[0].push("$←");
    this.alphabet[1].unshift("$TAB");
    this.alphabet_UPPER[1].unshift(null);

    //this.alphabet[1].push("$←");
    this.alphabet[2].unshift("$CAPS");
    this.alphabet_UPPER[2].unshift(null);

    this.alphabet[2].push("$ENTER");
    this.alphabet_UPPER[2].push(null);

    this.alphabet[3].unshift("$LSHIFT");
    this.alphabet_UPPER[3].unshift(null);

    this.alphabet[3].push("$RSHIFT");
    this.alphabet_UPPER[3].push(null);

    this.alphabet.push([]);
    this.alphabet_UPPER.push([]);
    this.alphabet[4].push("$SPACE");
    this.alphabet_UPPER[4].push(null);

    console.log(this.alphabet_UPPER);
  }
  initDom(){
    for (var i = 0; i < this.alphabet.length; i++) {
      let line = document.createElement("div");
      line.setAttribute("class","flex-row");
      for (var j = 0; j < this.alphabet[i].length; j++) {
        let key = new Key(this.alphabet[i][j]);
        line.appendChild(key.dom);
        this.keys.set(this.alphabet[i][j],key);
        this.keys_upper.set(this.alphabet_UPPER[i][j],key);
        console.log(this.alphabet[i][j],this.alphabet_UPPER[i][j]);
      }
      this.dom.appendChild(line);
    }
    let line = document.createElement("div");
    line.setAttribute("class","flex-row");
    this.dom.appendChild(line);
  }
  setCurrent(val)
  {
    //console.log(this.keys.get(val));
    this.servKeyOff("$LSHIFT");
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
    console.log(key);
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
  pressKey(key,code){

    try {
      if (this.servKeys.get(code)) {
        this.keys.get(this.servKeys.get(code)).press();
      }else{
        this.keys.get(key).press();
      }
    } catch (e) {

    }
  }
  unPressKey(key,code){
    try {
      if (this.servKeys.get(code)) {
        this.keys.get(this.servKeys.get(code)).unPress();
      }else{
        this.keys.get(key).unPress();
      }
    } catch (e) {

    }
  }
}
var kb = new KeyBoard();
