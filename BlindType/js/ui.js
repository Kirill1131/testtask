



document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);



function kbdHandler(){
  this.shift = false;
  this.alt = false;

  this.setDown = function(e){
    if (e.key=="Shift") {
      this.shift = true;
    }
    if (e.key=="Alt") {
      this.alt = true;
    }

    this.ckeck();
    //console.log(this.shift, this.alt);
  }
  this.setUp = function(e){
    if (e.key=="Shift") {
      this.shift = false;
    }
    if (e.key=="Alt") {
      this.alt = false;
    }
  }
  this.ckeck = function(){
    if (this.alt&&this.shift) {

      //if(ts)ts.switchLang();
      if(app)app.switchLang();

    }
  }

}

var kbdh = new kbdHandler();

function keyDownHandler(e)
{
  //console.log(e);
  //if (ts!=null) ts.checkCurrent(e.key);
   if (app!=null) {
     app.checkCurrent(e.key);
     app.pressKey(e.key,e.code);
   }
  //lat_kb.pressKey(e.key,e.code);
  //cyr_kb.pressKey(e.key,e.code);
  kbdh.setDown(e);

  if (e.code=="Space") {
    e.stopPropagation();
    e.preventDefault();
  }
  if (e.code=="Enter") {
    e.stopPropagation();
    e.preventDefault();
    mBox.confirm();
  }
}
function keyUpHandler(e)
{
  if (app!=null) {
    app.unPressKey(e.key,e.code);
  }
  //lat_kb.unPressKey(e.key,e.code);
  //cyr_kb.unPressKey(e.key,e.code);
  kbdh.setUp(e);
}
