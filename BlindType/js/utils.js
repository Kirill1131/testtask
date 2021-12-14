function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function dce(tagName, className = "") {
    let elem = document.createElement(tagName);
    elem.removeAttribute("class");
    elem.setAttribute("class", className);
    return elem;
}
class Dir
{
  constructor(){
    this.name;
    this.path;
    this.data = [];
    this.files = [];
    this.dirs = [];
  }
}


function normalizeStringArr(str){
  for (var i = 0; i < str.length; i++) {
    while (
      str[i][str[i].length-1]=='\n'||
      str[i][str[i].length-1]=='\r'
    ) {
      str[i] = str[i].slice(0,-1)
    }
  }
}

function getCountWord(root,num,c1 = 'ка',c2 = 'ки',c3 = 'ок'){
  let result = root;
  if (num%100>10&&num%100<21) {
    return root+c3
  }

  let mod = num%10;
  if (mod==1) {
    result = root+c1;
  }else if (mod>1&&mod<5) {
    result = root+c2;
  }else if (mod>4||mod==0) {
    result = root+c3;
  }
  return result;
}


function getJsonData(path){

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', path ,true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
        //return this.response;
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Не удаётся загрузить"));
    };

    xhr.send();
  });
}
