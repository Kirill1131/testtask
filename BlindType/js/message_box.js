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
      this.callback();
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
      console.log(h,args,btns);
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
