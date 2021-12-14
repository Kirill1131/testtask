


var app = new Vue({
  el: "#app",
  data:{
    mistakes_amount: 0,
    mistakesCountWord:"ошибок",
    typed_amount: 0,
    right_amount:0,
    chars_amount: 0,
    typing_speed: 0,
    //accuracy: 100,
    isTypingStarted: false,
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
    currentRegExp:/^[а-яё]+$/i,
    exPaths:[],
    currentExPath:[],
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
      //this.countAccuracy();
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
          //this.isMistaken = false;
          this.handleCurrentLetter(true);

          if (this.currentId==this.values.length) {
            this.handleEnd();
            return;
          }


          this.setCurrentLetter();
          //lat_kb.setCurrent(this.values[this.currentId]);
          //cyr_kb.setCurrent(this.values[this.currentId]);
          this.kbd[this.currentKbdId].setCurrent(this.values[this.currentId]);


        }else{
          this.handleCurrentLetter(false);
          //console.log(ts.mistakes_amount);
          this.addMistake();
          // if (!this.isMistaken) {
          //  this.isMistaken = true;
          // }
        }
      }
    },
    switchLang(){
      this.kbd[this.currentKbdId].hide();
      this.currentKbdId++;
      if (this.currentKbdId>=this.kbd.length) {
        this.currentKbdId = 0;
      }
      this.kbd[this.currentKbdId].show();
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

      //this.kbd = [new KeyBoard(cyr_alphabet)];
      //console.log(alphabet,this.kbd);
    },
    async initExercise(str,lang){
      //console.log(this.kbd);
      this.setLang(lang);

      let alphabet = await getJsonData('php/getKBD.php?kbdCode='+lang).then(
        response => {return  response},
        error => console.log('Ошибка: ${error}')
      );
      normalizeStringArr(alphabet[0]);
      normalizeStringArr(alphabet[1]);
      this.kbd = [new KeyBoard(alphabet)];

      this.values = str;
      this.reloadSpans();
      //console.log(this.spans);
      this.currentId = 0;
      this.sec = 0;
      this.typing_speed = 0;
      this.typed_amount = 0;
      this.right_amount = 0;
      this.mistakes_amount = 0;
      this.isTypingStarted = false;
      //lat_kb.setCurrent(this.values[this.currentId]);
      //this.setCurrentLetter();
      this.chars_amount = this.values.length;
      //console.log(this.kbd[this.currentKbdId]);
      this.kbd[this.currentKbdId].show();
      this.kbd[this.currentKbdId].setCurrent(this.values[this.currentId]);
      this.active = true;
      //this.currentExPath = this.
      this.$forceUpdate();
      //this.handleEnd();
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
        btns_arr = [{text:"Заново",func:this.restart},{text:"Следующее упражнение",func:this.nextExercise}];
      }else{
        btns_arr = [{text:"Заново",func:this.restart},{text:"К списку уроков",func:this.backToList}];
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
      this.initExercise(this.values,this.lang);
    },
    backToList(){
      this.active = false;
      for (var i = 0; i < this.kbd.length; i++) {
        this.kbd[i].clear();
      }
      this.kbd = [];
    },
    nextExercise(exPath){
      for (var i = 0; i < this.exPaths.length; i++) {
        if (
            this.exPaths[i][0]==this.currentExPath[0]&&
            this.exPaths[i][1]==this.currentExPath[1]&&
            this.exPaths[i][2]==this.currentExPath[2]
          ) {
            if (this.checkNextPath(this.exPaths,i)) {
              this.loadExercise(null,this.exPaths[i+1]);
              return;
            }
        }
      }
    },
    checkWholeNextPath(exPath){
      for (var i = 0; i < this.exPaths.length; i++) {
        if (
            this.exPaths[i][0]==exPath[0]&&
            this.exPaths[i][1]==exPath[1]&&
            this.exPaths[i][2]==exPath[2]
          ) {
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
      //console.log(exPaths,i);
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
      //console.log(this.exPaths);
    },
    async loadExercise(e,exPath){
      let path;
      let lang;
      //console.log(e,exPath);
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

      //console.log(this.currentExPath);
      let json_data = await getJsonData('php/getExercise.php?path=' + path).then(
        response => {return  response},
        error => console.log('Ошибка: ${error}')
      );
      //console.log(json_data);
      normalizeStringArr(json_data);

      if (json_data.length>10) {
        json_data.splice(10,json_data.length-1);
      }
      str = json_data.join(' ');
      this.initExercise(str,lang);
      //getRecursive(json_data[0],this.lessonsData);
      //var obj = getRecursive(json_data[0],this.lessonsData);
      //this.lessonsData = obj;
    }

  }
})
app.getLessons();



function normalizeLessonsData(data){
  var arr = [];
  var path_arr = [];
  for (var i = 0; i < data.length; i++) {
    var obj;
    var langName;
    if (data[i][1] =='dir') {
      //console.log(data[i][4]);
      langName = data[i][4];
      obj = {
        path:data[i][0],
        name:data[i][3],
        data:[]
      }
      //console.log(obj);
      arr.push(obj);
      continue;
    }else if(data[i][1] !='dir'&&data[i][1] !='file'){
      for (var j = 0; j < data[i].length; j++) {
        var sub_obj;
        if (data[i][j][1]=='dir') {
          let name = data[i][j][3];
          name = name[0].toUpperCase() + name.substr(1,name.length);
          sub_obj = {
            path:data[i][j][0],
            name:name,
            data:[]
          }
          //console.log(obj);
          obj.data.push(sub_obj);
        }else if (data[i][j][1]!='dir'&&data[i][j][1]!='file') {
          for (var k = 0; k < data[i][j].length; k++) {
            if (data[i][j][k][1]=='file'&&data[i][j][k][2]!='$dirInfo.txt') {
              let name = data[i][j][k][3];
              if (name[0]=='$') {
                name = name.slice(1);
                name = name[0].toUpperCase() + name.substr(1,name.length);
              }
              var sub_sub_obj = {
                path: data[i][j][k][0],
                name: name,
                langName:langName,
                layNum:i,lessNum:j,exNum:k
              }
              path_arr.push([i,j,k,data[i][j][k][0],langName]);
              sub_obj.data.push(sub_sub_obj);
            }
          }
        }
      }
    }
  }

  return [arr,path_arr];
}
