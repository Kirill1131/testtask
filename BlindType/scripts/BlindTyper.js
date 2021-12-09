
//console.log(kb.alphabet[2][kb.alphabet[2].length-4]);




// var a = new Vue({
//   el: '#app',
//   data:{
//     message: 'Hello',
//     status: true,
//     values: ["1", "2", "3"],
//     users:[
//       {id:5,name:"vasiliy"},
//       {id:44,name:"AAAAAAA"}
//     ]
//   }
// })
//a.message = "Bye";
//console.log(a);





function clickB(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1',true);
  xhr.send();

  xhr.onload = function () {
      console.log("status:" + xhr.status);
      if (xhr.status !== 200) {
          //result = xhr.response;
      } else {
          result = true;
          ts.changeValues(JSON.parse(xhr.response)[0]);
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
    typing_speed: 0,
    accuracy: 0
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
        this.accuracy = Math.round(((100/this.typed_amount)*(this.typed_amount-this.mistakes_amount)) * 100) / 100;
    }
  }
});


var ts = new Vue({
  el: '#type_space',
  data:{
    values: "",
    currentId: 0,
    spans:[]
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
      if (key.length==1) {
        let regexp = /^[а-яё]+$/i;
        if (key.match(regexp)) {
          //mainVue.message("Смените раскладку");
          alert("Смените раскладку");
          return;
        }
        ti.type();

        if (key==this.values[this.currentId]) {
          this.handleCurrentLetter(bool)
          this.currentId++;
          kb.setCurrent(this.values[this.currentId]);
        }else{
          this.handleCurrentLetter(bool)
          //console.log(ts.mistakes_amount);
          ti.addMistake();
        }
      }
    },
    handleCurrentLetter(bool){
      this.spans[this.currentId].removeAttribute("class");
      this.spans[this.currentId].setAttribute("class",(bool?"inactive-letter":"wrong-letter" ));
    }
    changeValues(str){
      this.values = str;
      this.spans = this.$el.getElementsByTagName("span");
    }
  }
});

var str = "Bacon ipsum dolor amet turducken pork chop spare ribs shoulder chuck meatloaf burgdoggen. Bacon ball tip sausage tongue beef ribs pork loin landjaeger porchetta meatball picanha. Jowl landjaeger burgdoggen, chicken sirloin pork chop beef ribs ham hock cupim venison bacon ribeye. Pork short loin biltong shankle. Salami tail tri-tip beef, frankfurter pancetta doner ball tip. Landjaeger andouille pork belly strip steak jowl chislic.";
ts.changeValues(str);
console.log(ts.$el);

document.addEventListener("keydown",keyDownHandler,false);

function keyDownHandler(e)
{
  //console.log(e);
  ts.checkCurrent(e.key);
}
