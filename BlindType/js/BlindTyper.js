function loadData(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1',true);
  xhr.send();

  xhr.onload = function () {
      console.log("status:" + xhr.status);
      if (xhr.status !== 200) {
          //result = xhr.response;
      } else {
          result = true;
          app.changeValues(JSON.parse(xhr.response)[0]);
          setTimeout(()=>{app.setCurrentLetter();},1110);

          //console.log(xhr.response);
          //bt.values = JSON.parse(xhr.response)[0];
          //JSON.parse(xhr.response)[0];
      }
  };
  console.log("Click");
}

class SpanElement
{
  constructor()
  {
    this.dom
  }
}

var ti = new Vue({
  el: '#typing_info',
  data:{
    mistakes_amount: 0,
    typed_amount: 0,
    chars_amount: 0,
    typing_speed: 0,
    accuracy: 100
  },
  methods:{
    addMistake(){
      this.mistakes_amount++;
      this.countAccuracy();
    },
    type(){
      this.typed_amount++;
      this.countAccuracy();
    },
    countAccuracy(){
        //this.accuracy = Math.round(((100/this.typed_amount)*(this.typed_amount-this.mistakes_amount)) * 100) / 100;
        this.accuracy = Math.round(((100/this.chars_amount)*(this.chars_amount-this.mistakes_amount)) * 100) / 100;
    }
  }
});

//console.log(lat_kb);

var app = new Vue({
  el: '#type_space',
  data:{
    values: "",
    currentId: 0,
    spans:[],
    active: false,
    //kbd: [lat_kb,cyr_kb],
    currentKbdId: 1
  },
  created: function () {
    // `this` указывает на экземпляр vm
    //console.log('Значение a: ' + this.a)
    for (var i = 0; i < this.values.length; i++) {
      //this.spans.push()
    }
  },
  methods:{
    checkCurrent(key){
      if (!this.active) return;

      if (key.length==1) {
        let regexp = /^[а-яё]+$/i;
        //let regexp = /^[a-z`]+$/i;

        if (key.match(regexp)) {
          mainVue.message("Смените раскладку");
          //alert("Смените раскладку");
          return;
        }
        ti.type();

        if (key==this.values[this.currentId]) {
          this.isMistaken = false;
          this.handleCurrentLetter(true);
          this.currentId++;
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
            ti.addMistake();
            this.isMistaken = true;
          }
        }
      }
    },
    switchLang(){
      //this.kbd[this.currentKbdId].hide();
      this.currentKbdId++;
      if (this.currentKbdId>=this.kbd.length) {
        this.currentKbdId = 0;
      }
      //this.kbd[this.currentKbdId].show();
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
      console.log("|"+this.spans[this.currentId].innerHTML+"|");
    },
    changeValues(str){
      console.log(this.kbd);

      this.values = str;
      this.spans = this.$el.getElementsByTagName("span");
      //console.log(this.spans);
      this.currentId = 0;
      //lat_kb.setCurrent(this.values[this.currentId]);
      //this.setCurrentLetter();
      ti.chars_amount = this.values.length;
      this.active = true;
      //this.kbd[this.currentKbdId].show();
      //this.kbd[this.currentKbdId].setCurrent(this.values[this.currentId]);
    },
    handleEnd(){
      this.active = false;
    }
  }
});

//var str = "Bacon Ipsum dolor amet turducken pork chop spare ribs shoulder chuck meatloaf burgdoggen. Bacon ball tip sausage tongue beef ribs pork loin landjaeger porchetta meatball picanha. Jowl landjaeger burgdoggen, chicken sirloin pork chop beef ribs ham hock cupim venison bacon ribeye. Pork short loin biltong shankle. Salami tail tri-tip beef, frankfurter pancetta doner ball tip. Landjaeger andouille pork belly strip steak jowl chislic.";
var str = "";//"Bacon Ipsum dolor amet ";

// for (var i = 0; i < data.length; i++) {
//   while (
//     data[i][data[i].length-1]=='\n'||
//     data[i][data[i].length-1]=='\r'
//   ) {
//     data[i] = data[i].slice(0,-1)
//   }
// }
//
// data.splice(5,data.length-1);


//str = data.join(' ');

//console.log(data);
//var str = data.join(' ');

//app.changeValues(str);
//setTimeout(()=>{app.setCurrentLetter();},0);
//ts.setCurrentLetter();
//console.log(ts.$el);
//console.log(ts.spans);

loadData();


/*
НЕ ЗАБЫТЬ

В режиме тренажёра ошибки засчитываются при каждом неверном импуте
В режиме тестирования не засчитываются последующие неверные импуты, после каждого неверного импута

практика:

backend по словарю найти слова, которые содержа заданные символы

реализовать обработку завершения тестирования

*/
