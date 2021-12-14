var logo_script = new Vue({
  el:"#logo_span",
  data:{
    finalText: "BLINDTYPE",
    currentText: "",
    outText: "",
    wrongText: "NKOBSYUOW",

    currentLetterId: 0,
    wrongLetterId: 4,
    wrongEndId: 6,
    isWrongTyping: false,
    act0: false,
    act1: false,
    act2: false
  },
  created:function(){
    setTimeout(this.startApearAnimation.bind(this),100);
  },
  methods:{
    startApearAnimation(){
      this.wrongLetterId = 2 + getRandomInt(4);
      this.wrongEndId = this.wrongLetterId+ 1 +getRandomInt(2);
      this.animateApear();
    },
    animateApear(){


      if (!this.act1) {
        if (!this.isWrongTyping) {
          this.currentText+=this.finalText[this.currentLetterId];
          this.outText = this.currentText + "|";
        }else {
          this.currentText+=this.wrongText[this.currentLetterId];
          this.outText = this.currentText + "|";
        }

        this.currentLetterId++;
      }else{
        this.currentLetterId--;
        this.currentText = this.currentText.slice(0,-1);
        this.outText = this.currentText + "|";
        //alert(this.currentText);

        console.log(this.currentText,this.currentLetterId);
        if (this.currentLetterId == this.wrongLetterId) {
          this.act1 = false;
          this.act2 = true;
          //this.currentLetterId++;

        }
        setTimeout(this.animateApear.bind(this), 300);
        return;

      }
      if (!this.act2) {
        if (this.currentLetterId == this.wrongLetterId) {
          if (!this.isWrongTyping) {
            this.isWrongTyping = true;
            //this.act0 = true;
          }
        }
        if (this.currentLetterId == this.wrongEndId) {
          if (this.isWrongTyping) {
            this.isWrongTyping = false;
            this.act1 = true;
            setTimeout(this.animateApear.bind(this), 600 + getRandomInt(200));
            setTimeout(function(){
              this.outText = this.currentText
              setTimeout(function(){
                this.outText = this.currentText + "|"
                setTimeout(function(){
                  this.outText = this.currentText;
                }.bind(this), 300);
              }.bind(this), 300);
            }.bind(this), 300);
            return;
          }
        }
      }

      if (this.act0) {

      }


      if (this.currentLetterId==this.finalText.length) {
        return;
      }
      setTimeout(this.animateApear.bind(this),50+ getRandomInt(200));
    }
  }
});
