


//
// Vue.component('layout', {
// props: ['value'],
// template: '<div>{{value.serviceTime}}</div>'
// })



Vue.component('close-button', {
  data: function () {
    return {
    }
  },
  template: `<button class = 'close-btn' @click="$emit('c-event')">&#10006;</button>`,
  methods:{
    close(){
      alert();
      // this.$emit('close', {
      //   });
    }
  }
})

Vue.component('dialog-button', {
  props: {
    text: String,
    callback: Function
  },
  data: function () {
    return {
      count: 0
    }
  },
  template: `<button class = 'message-dialog-btn' @click="clicked">{{text}}</button>`,
  methods:{
    clicked(){
      this.$emit('c-event');
      //this.callback();
      // this.$emit('close', {
      //   });
    }
    // close(){
    //   alert();
    //   this.$emit('close', {
    //       count: this.count
    //     });
    // }
  }
})



var mBox = new Vue({
  el: '#message_box',
  data:{
    active: false,
    //messageHeader:"Упражнение завершёно",
    //messageData:[["знаков в минуту: 43","ошибок: 4","точность: 99"],["Старайтесь делать меньше ошибок"]]
    messageHeader:"",
    messageData:[],
    messageBtns:[]
  },
  methods:{
    onClose(){
      this.active = false;
    },
    initMessage(h,args,btns){
      //console.log(h,args,btns);
      this.messageHeader = h;
      this.messageData = args;
      this.messageBtns = btns;
      //this.$forceUpdate();
      this.active = true;
    },
    confirm(){
      if (this.messageBtns.length>0) {
        this.messageBtns[this.messageBtns.length-1].func();
      }
      this.active = false;
    }
  }
})

Vue.component('choose-item', {
  props:{
    name:String,
    kbdshortname:String
  },
  data: function () {
    return {
    }
  },
  template:
  `
  <div class = 'dialog-btn choose-list-item' v-on:click='clicked' >
    <h6>{{name}}</h6>
    <div class="flex-row flex-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="156" height="156" fill="#0209" class="bi bi-keyboard" viewBox="0 0 16 16">
    <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z"/>
    <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z"/>
    </svg>
    </div>
  </div>
  `,
  methods:{
    clicked(){
      //console.log(this.kbdshortname,this.name);
      this.$emit('c-event',this.kbdshortname);
    }
  }
})

var app = new Vue({
  el: "#app",
  data:{
    mistakes_amount: 0,
    mistakesCountWord:"ошибок",
    typed_amount: 0,
    right_amount:0,
    chars_amount: 0,
    typing_speed: 0,
    accuracy: 100,
    isTypingStarted: false,
    isMistaken: false,
    sec: 0,
    values: "",
    currentId: 0,
    spans:[],
    active: false,
    stoped:true,
    kbd: [],
    currentKbdId: 0,
    soundHandler: null,
    soundOn:false,
    lessonsData: [],
    regexps:[],
    regexptemplates:{'cyr': /^[а-яё]+$/i, 'lat':/^[a-z`]+$/i},
    langs:[
      {name:'Русская клавиатура',   kbdShortName:'cyr'},

      {name:'Английская клавиатура',kbdShortName:'lat'}
    ],
    exPaths:[],
    currentExPath:[]
  },
  methods:{
    startTimer(){
        this.sec = 0;
        this.stoped = false;
        setTimeout(this.tick, 1000);
    },
    tick(){
      this.sec++
      if (this.active&&!this.stoped&&this.isTypingStarted) {
        this.countSpeed();
        setTimeout(this.tick, 1000);
      }
    },
    isSound(){
      //alert();
      if (this.soundHandler == null) this.soundHandler = new SoundHandler();
      this.soundOn = !this.soundOn;
    },
    addMistake(){
      this.mistakes_amount++;
      this.mistakesCountWord  = getCountWord("ошиб",this.mistakes_amount);
      this.countAccuracy();
    },
    type(){
      this.typed_amount++;
      if (!this.isTypingStarted) {
        this.startTimer();
        this.isTypingStarted = true;
      }
      this.countAccuracy();
    },
    countAccuracy(){
        //this.accuracy = Math.round(((100/this.typed_amount)*(this.typed_amount-this.mistakes_amount)) * 100) / 100;
        //this.accuracy = Math.round(((100/this.chars_amount)*(this.chars_amount-this.mistakes_amount)) * 100) / 100;
        this.accuracy = Math.round(((100/this.chars_amount)*(this.chars_amount-this.mistakes_amount))).toFixed(2);

    },
    countSpeed(){
      //this.typing_speed = Math.round((this.right_amount/this.sec) *60 * 100) / 100 ;
      this.typing_speed = Math.round((this.right_amount/this.sec) *60).toFixed(2) ;

    },
    layoutMessage(){
      //console.log(text);
      mBox.initMessage("",[["Пожалуйста, смените расскладку"]],[{text:"Продолжить",func:this.continue}]);
    },
    pressKey(key,code){
      if (this.kbd.length>0) this.kbd[this.currentKbdId].pressKey(key,code);
    },
    unPressKey(key,code){
      if (this.kbd.length>0) this.kbd[this.currentKbdId].unPressKey(key,code);
    },
    checkCurrent(key){
      if (!this.active) return;

      if (key.length==1) {
        //let regexp = /^[а-яё]+$/i;
        //let regexp = /^[a-z`]+$/i;
        for (var i = 0; i < this.regexps.length; i++) {
          if (key.match(this.regexps[i])) {
            this.layoutMessage();
            //alert("Смените раскладку");
            return;
          }
        }
        this.type();

        if (key==this.values[this.currentId]) {
          this.isMistaken = false;
          this.handleCurrentLetter(true);
          if (this.currentId==this.values.length) {
            this.handleEnd();
            return;
          }


          this.setCurrentLetter();
          //lat_kb.setCurrent(this.values[this.currentId]);
          //cyr_kb.setCurrent(this.values[this.currentId]);
          //this.kbd[this.currentKbdId].setCurrent(this.values[this.currentId]);


        }else{
          this.handleCurrentLetter(false);
          //console.log(ts.mistakes_amount);
          if (!this.isMistaken) {
           this.isMistaken = true;
           this.addMistake();
          }
        }
      }
    },
    switchLang(){
      // this.kbd[this.currentKbdId].hide();
      // this.currentKbdId++;
      // if (this.currentKbdId>=this.kbd.length) {
      //   this.currentKbdId = 0;
      // }
      // this.kbd[this.currentKbdId].show();
    },
    setCurrentLetter(){
      //console.log(this.spans);
      //console.log(this.spans[0]);
      this.spans[this.currentId].removeAttribute("class");
      this.spans[this.currentId].setAttribute("class","current-letter");
    },
    handleCurrentLetter(bool){
      this.spans[this.currentId].removeAttribute("class");
      this.spans[this.currentId].setAttribute("class",(bool?"inactive-letter":"wrong-letter" ));
      if (bool===true) {
        this.currentId++;
        this.right_amount++;
      }
      if (this.soundOn) {
        this.soundHandler.handleByBool(bool);
      }
      //console.log("|"+this.spans[this.currentId].innerHTML+"|");
    },
    setRegExp(lang){
      let obj_keys = Object.keys(this.regexptemplates);
      this.regexps = [];
      for (var i = 0; i < obj_keys.length; i++) {
        if (this.lang == obj_keys[i]) continue;
        this.regexps.push(this.regexptemplates[obj_keys[i]]);
      }
    },
    setLang(lang){
      this.lang = lang;
      this.setRegExp();
      this.kbd = [new KeyBoard(keyboard_alphabets[lang])];
    },
    initExercise(str,lang){
      //console.log(this.kbd);
      this.setLang(lang);
      this.values = str;
      this.spans = this.$el.getElementsByTagName("span");
      for (var i = 0; i < this.spans.length; i++) {
        this.spans[i].removeAttribute("class");
        this.spans[i].setAttribute("class","active-letter");

      }
      //console.log(this.spans);
      this.currentId = 0;
      this.sec = 0;
      this.typing_speed = 0;
      this.typed_amount = 0;
      this.mistakes_amount = 0;
      this.isTypingStarted = false;
      //lat_kb.setCurrent(this.values[this.currentId]);
      //this.setCurrentLetter();
      this.chars_amount = this.values.length;
      this.kbd[this.currentKbdId].show();
      this.kbd[this.currentKbdId].setCurrent(this.values[this.currentId]);
      this.active = true;
      //this.currentExPath = this.
      this.$forceUpdate();
      //this.handleEnd();
    },
    initTest(str,lang){
      this.lang = lang;
      this.setRegExp();
      this.values = str;
      this.reloadSpans();
      //console.log(this.spans);
      this.currentId = 0;
      this.sec = 0;
      this.typing_speed = 0;
      this.typed_amount = 0;
      this.mistakes_amount = 0;
      this.right_amount = 0;

      this.isTypingStarted = false;
      //lat_kb.setCurrent(this.values[this.currentId]);
      //this.setCurrentLetter();
      this.chars_amount = this.values.length;
      //this.kbd[this.currentKbdId].show();
      //this.kbd[this.currentKbdId].setCurrent(this.values[this.currentId]);
      this.isMistaken = false;
      this.active = true;
      //this.currentExPath = this.
      this.$forceUpdate();
    },
    reloadSpans(){
      this.spans = this.$el.getElementsByTagName("span");
      for (var i = 0; i < this.spans.length; i++) {
        this.spans[i].removeAttribute("class");
        this.spans[i].setAttribute("class","active-letter");

      }
    },
    handleEnd(){
      //this.active = false;
      this.stoped = true;
      this.countAccuracy();
      let msg = "";
      if (this.mistakes_amount>2) {
        msg = "Старайтесь делать меньше ошибок"
      }else if(this.mistakes_amount>0){
        msg = "Неплохо"
      }else if(this.mistakes_amount == 0){
        msg = "Превосходно!"
      }
      //console.log(deActiveApp);
      let btns_arr;
      //console.log(this.currentExPath);
      if (this.checkWholeNextPath(this.currentExPath)) {
        btns_arr = [{text:"К списку уроков",func:this.backToList},{text:"Следующее упражнение",func:this.nextExercise}];
      }else{
        btns_arr = [{text:"К списку уроков",func:this.backToList}];
      }
      let countWord = "ошибок";
      countWord = getCountWord("ошиб",this.mistakes_amount);

      mBox.initMessage(
          "Упражнение завершено",
          [
            [`${this.typing_speed} Зн./мин.`,`${this.mistakes_amount} ${countWord}`,`точность: ${this.accuracy}%`],
            [msg]
          ],
          btns_arr

      );
    },
    continue(){

    },
    restart(){
      //this.initTest(this.values,this.lang);
      this.loadTest(this.lang);
    },
    backToList(){
      this.active = false;
      // for (var i = 0; i < this.kbd.length; i++) {
      //   this.kbd[i].clear();
      // }
      // this.kbd = [];
    },
    nextExercise(){
      if (this.checkWholeNextPath(this.currentExPath)) {
        this.loadExercise(null,this.exPaths[i+1]);
        //return;
      }
    //  console.log(this.currentExPath);
    },
    checkWholeNextPath(exPath){
      for (var i = 0; i < this.exPaths.length; i++) {
      //  console.log(this.exPaths[i]);
        if (
            this.exPaths[i][0]==exPath[0]&&
            this.exPaths[i][1]==exPath[1]&&
            this.exPaths[i][2]==exPath[2]
          ) {
          //  console.log("erfolg",this.exPaths[i],i);
            if (this.checkNextPath(this.exPaths,i)) {
              return true;
            }else{
              return false;
            }
        }
      }
      return false;
    },
    checkNextPath(exPaths,i){
    //  console.log(exPaths,i);
      if (!exPaths[i+1]) {
        return;
      }
      if (
        exPaths[i+1][0]==exPaths[i][0]&&
        exPaths[i+1][1]==exPaths[i][1]
      ) {
        return true;
      }
      return false;
    },
    getPath(e){
      return[
        e.target.getAttribute('data-layout-id'),
        e.target.getAttribute('data-less-id'),
        e.target.getAttribute('data-ex-id'),
      ];
    },
    async getLessons(){
      //let json_data = getLessons();
      let json_data = await getJsonData('php/getLessons.php').then(
        response => {return  response},
        error => console.log('Ошибка: ${error}')
      );
      //getRecursive(json_data[0],this.lessonsData);
      var gL = normalizeLessonsData(json_data[0],this.lessonsData);
      var obj = gL[0];
      this.lessonsData = obj;
      this.exPaths = gL[1];
    //  console.log(this.exPaths);
    },
    async loadExercise(e,exPath){
      let path;
      let lang;
    //  console.log(e,exPath);
      if (exPath!=null) {
        path = exPath[3]
        lang = exPath[4]//e.target.getAttribute('data-keyboard');
        this.currentExPath = [
          exPath[0],
          exPath[1],
          exPath[2]
        ];
      }else{
        path = e.target.getAttribute('data-path');
        lang = e.target.getAttribute('data-keyboard');
        // this.currentExPath = [
        //   e.target.getAttribute('data-layout-id'),
        //   e.target.getAttribute('data-less-id'),
        //   e.target.getAttribute('data-ex-id'),
        // ];
        this.currentExPath = this.getPath(e);
      }

    //  console.log(this.currentExPath);
      let json_data = await getJsonData('php/getExercise.php?path=' + path).then(
        response => {return  response},
        error => console.log('Ошибка: ${error}')
      );
      //console.log(json_data);
      for (var i = 0; i < json_data.length; i++) {
        while (
          json_data[i][json_data[i].length-1]=='\n'||
          json_data[i][json_data[i].length-1]=='\r'
        ) {
          json_data[i] = json_data[i].slice(0,-1)
        }
      }
      if (json_data.length>10) {
        json_data.splice(10,json_data.length-1);
      }
      str = json_data.join(' ');
      this.initExercise(str,lang);
      //getRecursive(json_data[0],this.lessonsData);
      //var obj = getRecursive(json_data[0],this.lessonsData);
      //this.lessonsData = obj;
    },
    async loadTest(langName){
      let str;
      //console.log(langName);
      //console.log(_getDataUrlRouter.get(langName));
      let query = _getDataUrlRouter.get(langName);
      let json_data;
      try {
        json_data = await getJsonData(query).then(
         response => {return  response},
         error => console.log('Ошибка: ${error}')
        );
      } catch (e) {

      } finally {

      }

      //console.log(Object.keys(json_data));
      if ((typeof json_data)=='object') {
        if (Object.keys(json_data).includes('text')) {
          str = json_data.text;
        }else if((typeof json_data[0]) == 'string'){
          str = json_data[0];
        }
      }
      //console.log(typeof json_data);
      if (!json_data) {
        //console.log(json_data);
        query = _getDataAlternativeRouter.get(langName);
        json_data = await getJsonData(query).then(
         response => {return  response},
         error => console.log('Ошибка: ${error}')
        );
        str=json_data;
        //console.log(str);
      }
      this.initTest(str,langName);
      //console.log(str);
      //mBox.initMessage(null,[[json_data]]);
      //mBox.initMessage(null,[[str]]);

    }

  }
})
//app.getData









var _getDataUrlQueries = {
  lat:'https://baconipsum.com/api/?type=meat-and-filler&sentences=7',
  cyr:'https://fish-text.ru/get?number=4'
}

var _getDataUrlRouter = new Map();
_getDataUrlRouter.set('lat',_getDataUrlQueries.lat);
_getDataUrlRouter.set('cyr',_getDataUrlQueries.cyr);


var _getDataAlternativeQueries = {
  lat:'php/readFile.php?path=../Data/alternativeText/lat.txt',
  cyr:'php/readFile.php?path=../Data/alternativeText/cyr.txt'
}

var _getDataAlternativeRouter = new Map();
_getDataAlternativeRouter.set('lat',_getDataAlternativeQueries.lat);
_getDataAlternativeRouter.set('cyr',_getDataAlternativeQueries.cyr);
